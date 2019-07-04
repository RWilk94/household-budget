package rwilk.hb.service.ai;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import rwilk.hb.model.Category;
import rwilk.hb.model.Spend;
import rwilk.hb.model.User;
import rwilk.hb.repository.CategoryRepository;
import rwilk.hb.repository.SpendingRepository;
import rwilk.hb.repository.UserRepository;
import weka.classifiers.Classifier;
import weka.classifiers.Evaluation;
import weka.classifiers.functions.LinearRegression;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.SelectedTag;
import weka.core.converters.ArffLoader;

@SuppressWarnings("Duplicates")
@Slf4j
@Service
public class PredictServiceImpl implements PredictService {

  private static final String HEATING_BILL = "Ogrzewanie";
  private static final String PHONE_BILL = "Telefon";

  private static final Integer HEATING_CLASS_INDEX = 2;
  private static final String HEATING_DATA_SET_TEMPLATE = "/ai/heating.arff";
  private static final String HEATING_PREDICT_DATA_SET_TEMPLATE = "/ai/heating-predict.arff";

  private static final Integer PHONE_BILL_CLASS_INDEX = 1;
  private static final String PHONE_BILL_DATA_SET_TEMPLATE = "/ai/phone-bill.arff";
  private static final String PHONE_BILL_PREDICT_DATA_SET_TEMPLATE = "/ai/phone-bill-predict.arff";

  private ArrayList<AvgTemperature> avgTemperatures = new ArrayList<>(Arrays.asList(AvgTemperature.values()));

  private final SpendingRepository spendingRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  @Autowired
  public PredictServiceImpl(SpendingRepository spendingRepository, UserRepository userRepository,
      CategoryRepository categoryRepository) {
    this.spendingRepository = spendingRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  @Override
  public Double predictValue(String username, Long categoryId) throws Exception {
    Optional<User> user = userRepository.findByUsername(username);
    Optional<Category> category = categoryRepository.findById(categoryId);
    if (user.isPresent() && category.isPresent()) {
      switch (category.get().getName()) {
        case HEATING_BILL:
          return predictHeatingValue(user.get(), category.get());
        case PHONE_BILL:
          return predictPhoneBillValue(user.get(), category.get());
      }
    }
    throw new IllegalArgumentException();
  }

  private Double predictHeatingValue(User user, Category category) throws Exception {
    List<Spend> spending = getSpending(user, category);
    return predictValue(getHeatingTestDataset(spending),
        getHeatingPredictDataset(spending));
  }

  private Double predictPhoneBillValue(User user, Category category) throws Exception {
    List<Spend> spending = getSpending(user, category);
    return predictValue(getPhoneTestDataset(spending),
        getPhonePredictDataset(spending));
  }

  private List<Spend> getSpending(User user, Category category) {
      List<Spend> spending = spendingRepository.findAllByUserAndCategoryOrderByDate(user, category);
      if (spending.size() >= 5) {
        return spending;
    }
    throw new IllegalArgumentException();
  }

  private Double predictValue(Instances trainingDataset, Instances predictDataset)
      throws Exception {
    LinearRegression classifier = new weka.classifiers.functions.LinearRegression();
    classifier.setAttributeSelectionMethod(
        new SelectedTag(LinearRegression.SELECTION_NONE, LinearRegression.TAGS_SELECTION));
    classifier.buildClassifier(trainingDataset);
    Evaluation evaluation = new Evaluation(trainingDataset);
    // evaluation.crossValidateModel(classifier, trainingDataset, 10, new Random());
    evaluation.evaluateModel(classifier, trainingDataset);
    return classifier.classifyInstance(predictDataset.get(0));
  }

  private Instances getHeatingTestDataset(List<Spend> spending) throws IOException {
    Instances dataset = loadArffTemplate(HEATING_DATA_SET_TEMPLATE, HEATING_CLASS_INDEX);
    Instance instance = dataset.get(0);
    dataset.remove(0);
//    int[] array = new int[]{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
//    int month = spending.get(spending.size() - 1).getDate().get(Calendar.MONTH) + 1;
//    if (month > 12) {
//      month -= 12;
//    }
//    final int month2 = month;
    spending.forEach(spend -> {
      // instance.setValue(0, spending.indexOf(spend) + 1);
      int[] array = new int[]{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
      int month = spend.getDate().get(Calendar.MONTH) + 1;
      if (month > 12) {
        month -= 12;
      }
      instance.setValue(0, array[month-1]);
      instance.setValue(1, avgTemperatures.get(spend.getDate().get(Calendar.MONTH)).getValue());
      instance.setValue(2, spend.getValue());
      dataset.add(instance);
    });
    return dataset;
  }

  private Instances getHeatingPredictDataset(List<Spend> spending) throws IOException {
    Instances dataset = loadArffTemplate(HEATING_PREDICT_DATA_SET_TEMPLATE, HEATING_CLASS_INDEX);
    Instance instance = dataset.get(0);
    dataset.remove(0);
    int[] array = new int[]{31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int month = spending.get(spending.size() - 1).getDate().get(Calendar.MONTH) + 1;
    if (month > 12) {
      month -= 12;
    }
    // instance.setValue(0, spending.size());
    instance.setValue(0, array[month]);
    instance.setValue(1, avgTemperatures.get(month).getValue());
    dataset.add(instance);
    return dataset;
  }

  private Instances getPhoneTestDataset(List<Spend> spending) throws IOException {
    Instances dataset = loadArffTemplate(PHONE_BILL_DATA_SET_TEMPLATE, PHONE_BILL_CLASS_INDEX);
    Instance instance = dataset.get(0);
    dataset.remove(0);

    spending.forEach(spend -> {
      instance.setValue(0, spending.indexOf(spend) + 1);
      instance.setValue(1, spend.getValue());
      dataset.add(instance);
    });
    return dataset;
  }

  private Instances getPhonePredictDataset(List<Spend> spending) throws IOException {
    Instances dataset = loadArffTemplate(PHONE_BILL_PREDICT_DATA_SET_TEMPLATE, PHONE_BILL_CLASS_INDEX);
    Instance instance = dataset.get(0);
    dataset.remove(0);
    instance.setValue(0, spending.size());
    dataset.add(instance);
    return dataset;
  }

  private Instances loadArffTemplate(String name, Integer classIndex) throws IOException {
    ArffLoader arffLoader = new ArffLoader();
    arffLoader.setSource(PredictServiceImpl.class.getResourceAsStream(name));
    Instances dataset = arffLoader.getDataSet();
    dataset.setClassIndex(classIndex);
    return dataset;
  }

}
