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
  public List<Category> getUserCategories(String username) {
    return categoryRepository.findAllByUserIsNullOrUser_Username(username);
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
  public Category updateCategory(Category category) {
    Optional<Category> categoryOptional = categoryRepository.findById(category.getId());
    Optional<User> userOptional = userRepository.findByUsername(category.getUser().getUsername());
    Optional<Module> moduleOptional = moduleRepository.findByName(category.getModule().getName());
    if (categoryOptional.isPresent() && userOptional.isPresent() && moduleOptional.isPresent()) {
      categoryOptional.get().setModule(moduleOptional.get());
      categoryOptional.get().setUser(userOptional.get());
      categoryOptional.get().setName(category.getName());
      return categoryRepository.save(categoryOptional.get());
    }
    return null;
  }

  @Override
  public void deleteCategory(Long id) {
    Optional<Category> categoryOptional = categoryRepository.findById(id);
    categoryOptional.ifPresent(category -> categoryRepository.delete(category));
  }
}
