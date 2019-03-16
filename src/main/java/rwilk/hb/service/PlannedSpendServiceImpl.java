package rwilk.hb.service;

import java.util.ArrayList;
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
      List<PlannedSpend> existingRecords = this.plannedSpendRepository.findAllByCategoryAndUserAndYear(
          userOptional.get().getUsername(),
          categoryOptional.get().getId(),
          plannedSpending.get(0).getYear());

      //update existing records
      List<PlannedSpend> recordsToSave = plannedSpending.stream().filter(spend -> spend.getValue() != null).collect(Collectors.toList());
      //insert new records
      recordsToSave.forEach(spend -> {
        PlannedSpend plannedSpend = existingRecords.stream().filter(item -> item.getMonth().intValue() == spend.getMonth().intValue())
            .findFirst()
            .orElse(spend);
        plannedSpend.setValue(spend.getValue());
        results.add(plannedSpendRepository.save(plannedSpend));
      });

      //delete records
      List<PlannedSpend> recordsToDelete = plannedSpending.stream().filter(spend -> spend.getValue() == null).collect(Collectors.toList());
      recordsToDelete.forEach(spend -> {
        Optional<PlannedSpend> optionalPlannedSpend =
            existingRecords.stream().filter(item -> item.getMonth().intValue() == spend.getMonth().intValue())
                .findFirst();
        optionalPlannedSpend.ifPresent(plannedSpendRepository::delete);
      });
      return prepareResults(results, categoryOptional.get(), userOptional.get(), plannedSpending.get(0).getYear());
    }
    return null;
  }

  private List<PlannedSpend> prepareResults(List<PlannedSpend> plannedSpends, Category category, User user, Integer year) {
    List<PlannedSpend> results = new ArrayList<>();
    for (int i = 0; i < 12; i++) {
      final int index = i;
      Optional<PlannedSpend> spendOptional = plannedSpends.stream().filter(spend -> spend.getMonth()-1 == index)
          .findFirst();
      if (spendOptional.isPresent()) {
        results.add(spendOptional.get());
      } else {
        results.add(PlannedSpend.builder().category(category).user(user).month(i).year(year).build());
      }
    }
    return results;
  }

  @Override
  public List<PlannedSpend> getPlannedSpending(String username, Long categoryId, Integer year) {
    Optional<User> userOptional = userRepository.findByUsername(username);
    Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
    if (userOptional.isPresent() && categoryOptional.isPresent()) {
      return prepareResults(
          plannedSpendRepository.findAllByCategoryAndUserAndYear(userOptional.get().getUsername(), categoryOptional.get().getId(), year),
          categoryOptional.get(),
          userOptional.get(),
          year);
    }
    return null;
  }
}
