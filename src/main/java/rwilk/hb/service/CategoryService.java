package rwilk.hb.service;

import java.util.List;

import rwilk.hb.model.Category;

public interface CategoryService {

  List<Category> getUserCategories(String username);

  Category addCategory(Category category);

  Category updateCategory(Category category);

  void deleteCategory(Long id);

}
