package rwilk.hb.service;

import java.util.List;

import rwilk.hb.model.Category;
import rwilk.hb.model.User;

public interface CategoryService {

  List<Category> getUserCategories(User user);

}
