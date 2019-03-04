package rwilk.hb.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rwilk.hb.model.Category;
import rwilk.hb.model.PlannedSpend;
import rwilk.hb.model.User;
import rwilk.hb.repository.CategoryRepository;
import rwilk.hb.repository.PlannedSpendRepository;
import rwilk.hb.repository.UserRepository;

@Service
public class PlannedSpendServiceImpl implements PlannedSpendService {

  private final PlannedSpendRepository plannedSpendRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  @Autowired
  public PlannedSpendServiceImpl(PlannedSpendRepository plannedSpendRepository, UserRepository userRepository,
      CategoryRepository categoryRepository) {
    this.plannedSpendRepository = plannedSpendRepository;
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  @Override
  public List<PlannedSpend> insertPlannedSpending(List<PlannedSpend> plannedSpending) {
    Optional<User> userOptional = userRepository.findByUsername(plannedSpending.get(0).getUser().getUsername());
    Optional<Category> categoryOptional = categoryRepository.findById(plannedSpending.get(0).getCategory().getId());
    if (userOptional.isPresent() && categoryOptional.isPresent()) {
      List<PlannedSpend> results = new ArrayList<>();
      plannedSpending.forEach(spend -> {
        spend.setUser(userOptional.get());
        spend.setCategory(categoryOptional.get());
      });
      //get from database
      List<PlannedSpend> existingRecords = this.plannedSpendRepository.findAllByCategoryAndUserAndDate(
          userOptional.get().getUsername(),
          categoryOptional.get().getId(),
          ((long)plannedSpending.get(0).getDate().get(Calendar.YEAR)));

      //update existing records
      List<PlannedSpend> recordsToSave = plannedSpending.stream().filter(spend -> spend.getValue() != null).collect(Collectors.toList());
      //insert new records
      recordsToSave.forEach(spend -> {
        PlannedSpend plannedSpend = existingRecords.stream().filter(item -> item.getDate().get(Calendar.MONTH) == spend.getDate().get(Calendar.MONTH))
            .findFirst()
            .orElse(spend);
        plannedSpend.setValue(spend.getValue());
        results.add(plannedSpendRepository.save(plannedSpend));
      });

      //delete records
      List<PlannedSpend> recordsToDelete = plannedSpending.stream().filter(spend -> spend.getValue() == null).collect(Collectors.toList());
      recordsToDelete.forEach(spend -> {
        Optional<PlannedSpend> optionalPlannedSpend =
            existingRecords.stream().filter(item -> item.getDate().get(Calendar.MONTH) == spend.getDate().get(Calendar.MONTH))
                .findFirst();
        optionalPlannedSpend.ifPresent(plannedSpendRepository::delete);
      });
      return prepareResults(results, categoryOptional.get(), userOptional.get(), plannedSpending.get(0).getDate());
    }
    return null;
  }

  private List<PlannedSpend> prepareResults(List<PlannedSpend> plannedSpends, Category category, User user, Calendar calendar) {
    List<PlannedSpend> results = new ArrayList<>();
    for (int i = 0; i < 12; i++) {
      final int index = i;
      Optional<PlannedSpend> spendOptional = plannedSpends.stream().filter(spend -> spend.getDate().get(Calendar.MONTH) == index)
          .findFirst();
      if (spendOptional.isPresent()) {
        results.add(spendOptional.get());
      } else {
        calendar.set(Calendar.MONTH, i);
        results.add(PlannedSpend.builder().category(category).user(user).date(calendar).build());
      }
    }
    return results;
  }

  @Override
  public List<PlannedSpend> getPlannedSpending(String username, Long categoryId, Long year) {
    Optional<User> userOptional = userRepository.findByUsername(username);
    Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
    if (userOptional.isPresent() && categoryOptional.isPresent()) {
      Calendar calendar = Calendar.getInstance();
      calendar.set(Calendar.YEAR, year.intValue());
      return prepareResults(
          plannedSpendRepository.findAllByCategoryAndUserAndDate(userOptional.get().getUsername(), categoryOptional.get().getId(), year),
          categoryOptional.get(),
          userOptional.get(),
          calendar);
    }
    return null;
  }
}
