package rwilk.hb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rwilk.hb.model.Category;
import rwilk.hb.model.Spend;
import rwilk.hb.model.User;
import rwilk.hb.repository.CategoryRepository;
import rwilk.hb.repository.SpendingRepository;
import rwilk.hb.repository.UserRepository;

@Service
public class SpendingServiceImpl implements SpendingService {

  @Autowired
  private SpendingRepository spendingRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public List<Spend> getUserSpending(String username) {
    return spendingRepository.findAllByUserIsNullOrUser_Username(username);
  }

  @Override
  public Spend addSpend(Spend spend) {
    Optional<User> userOptional = userRepository.findByUsername(spend.getUser().getUsername());
    Optional<Category> categoryOptional = categoryRepository.findById(spend.getCategory().getId());
    if (userOptional.isPresent() && categoryOptional.isPresent()) {
      spend.setUser(userOptional.get());
      spend.setCategory(categoryOptional.get());
      return spendingRepository.save(spend);
    }
    return null;
  }

  @Override
  public Spend updateSpend(Spend spend) {
    Optional<User> userOptional = userRepository.findByUsername(spend.getUser().getUsername());
    Optional<Category> categoryOptional = categoryRepository.findById(spend.getCategory().getId());
    Optional<Spend> spendOptional = spendingRepository.findById(spend.getId());
    if (userOptional.isPresent() && categoryOptional.isPresent() && spendOptional.isPresent()) {
      spendOptional.get().setCategory(categoryOptional.get());
      spendOptional.get().setName(spend.getName());
      spendOptional.get().setDate(spend.getDate());
      spendOptional.get().setValue(spend.getValue());
      return spendingRepository.save(spendOptional.get());
    }
    return null;
  }

  @Override
  public void deleteSpend(Long id) {
    Optional<Spend> spendOptional = spendingRepository.findById(id);
    spendOptional.ifPresent(spend -> spendingRepository.delete(spend));
  }
}
