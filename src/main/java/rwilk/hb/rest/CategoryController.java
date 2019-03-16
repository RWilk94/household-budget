package rwilk.hb.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rwilk.hb.model.Category;
import rwilk.hb.model.ModuleVO;
import rwilk.hb.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/{username}", method = RequestMethod.GET)
  public List<Category> getCategories(@PathVariable String username) {
    return categoryService.getUserCategories(username);
  }

  @RequestMapping(value = "/", method = RequestMethod.PUT)
  public Category addCategory(@Valid @RequestBody Category category) {
    return categoryService.addCategory(category);
  }

  @RequestMapping(value = "/", method = RequestMethod.PATCH)
  public Category updateCategory(@Valid @RequestBody Category category) {
    return categoryService.updateCategory(category);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public void deleteCategory(@Valid @PathVariable Long id) {
    categoryService.deleteCategory(id);
  }

  @RequestMapping(value = "/{username}/{moduleId}/{year}", method = RequestMethod.GET)
  public List<ModuleVO> getCategoryVOsByYear(@PathVariable String username, @PathVariable Long moduleId, @PathVariable Integer year) {
    return categoryService.getCategoriesVOsByYear(username, moduleId, year);
  }

  @RequestMapping(value = "/{username}/{moduleId}/{year}/{month}", method = RequestMethod.GET)
  public List<ModuleVO> getCategoryVOsByMonth(@PathVariable String username, @PathVariable Long moduleId, @PathVariable Integer year, @PathVariable Integer month) {
    return categoryService.getCategoriesVOsByMonth(username, moduleId, year, month);
  }


}
