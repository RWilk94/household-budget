package rwilk.hb.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.util.StringUtils;

public class ModuleValidator implements ConstraintValidator<Module, rwilk.hb.model.Module> {

  @Override
  public boolean isValid(rwilk.hb.model.Module module, ConstraintValidatorContext context) {
    return module != null && !StringUtils.isEmpty(module.getName());
  }

}
