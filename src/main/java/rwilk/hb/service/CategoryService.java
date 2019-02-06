package rwilk.hb.service;

import java.util.Calendar;
import java.util.List;

import rwilk.hb.model.Category;
import rwilk.hb.model.ModuleVO;

public interface CategoryService {

  List<Category> getUserCategories(String username);

  Category addCategory(Category category);

  Category updateCategory(Category category);

  void deleteCategory(Long id);

  public List<ModuleVO> getCategories(String username, Calendar period, String type, long moduleId);

}
