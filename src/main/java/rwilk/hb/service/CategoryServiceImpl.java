package rwilk.hb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rwilk.hb.model.Category;
import rwilk.hb.model.Module;
import rwilk.hb.model.User;
import rwilk.hb.repository.CategoryRepository;
import rwilk.hb.repository.ModuleRepository;
import rwilk.hb.repository.UserRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ModuleRepository moduleRepository;

  @Override
  public List<Category> getUserCategories(User user) {
    return categoryRepository.findAllByUserIsNullOrUser_Username(user.getUsername());
  }

  @Override
  public Category addCategory(Category category) {
    Optional<User> userOptional = userRepository.findByUsername(category.getUser().getUsername());
    Optional<Module> moduleOptional = moduleRepository.findByName(category.getModule().getName());
    if (userOptional.isPresent() && moduleOptional.isPresent()) {
      category.setUser(userOptional.get());
      category.setModule(moduleOptional.get());
      return categoryRepository.save(category);
    }
    return null;
  }

  @Override
  public void deleteCategory(Category category) {

  }
}
