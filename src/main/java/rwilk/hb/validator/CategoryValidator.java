package rwilk.hb.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.util.StringUtils;

public class CategoryValidator implements ConstraintValidator<Category, rwilk.hb.model.Category> {

  @Override
  public boolean isValid(rwilk.hb.model.Category category, ConstraintValidatorContext context) {
    return category != null && !StringUtils.isEmpty(category.getName());
  }

}
