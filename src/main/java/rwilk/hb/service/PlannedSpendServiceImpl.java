package rwilk.hb.service;

import java.util.Optional;

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
  public PlannedSpend insertPlannedSpend(PlannedSpend plannedSpend) {
    Optional<User> userOptional = userRepository.findByUsername(plannedSpend.getUser().getUsername());
    Optional<Category> categoryOptional = categoryRepository.findById(plannedSpend.getCategory().getId());
    if (userOptional.isPresent() && categoryOptional.isPresent()) {
      plannedSpend.setUser(userOptional.get());
      plannedSpend.setCategory(categoryOptional.get());
      return plannedSpendRepository.save(plannedSpend);
    }
    return null;
  }

}
