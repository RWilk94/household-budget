package rwilk.hb.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rwilk.hb.model.Category;
import rwilk.hb.model.User;
import rwilk.hb.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/", method = RequestMethod.POST)
  public List<Category> getModules(@RequestBody User user) {
    return categoryService.getUserCategories(user);
  }

  @RequestMapping(value = "/", method = RequestMethod.PUT)
  public Category addCategory(@Valid @RequestBody Category category) {
    return categoryService.addCategory(category);
  }

  @RequestMapping(value = "/", method = RequestMethod.DELETE)
  public void deleteCategory(@Valid @RequestBody Category category) {
    categoryService.deleteCategory(category);
  }

}
