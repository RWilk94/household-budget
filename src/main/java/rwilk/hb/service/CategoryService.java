package rwilk.hb.service;

import java.util.List;

import rwilk.hb.model.Category;
import rwilk.hb.model.ModuleVO;

public interface CategoryService {

  List<Category> getUserCategories(String username);

  Category addCategory(Category category);

  Category updateCategory(Category category);

  void deleteCategory(Long id);

  List<ModuleVO> getCategoriesVOsByYear(String username, Long moduleId, Integer year);

  List<ModuleVO> getCategoriesVOsByMonth(String username, Long moduleId, Integer year, Integer month);


}
