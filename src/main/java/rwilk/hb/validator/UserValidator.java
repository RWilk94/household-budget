package rwilk.hb.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.util.StringUtils;

public class UserValidator implements ConstraintValidator<User, rwilk.hb.model.User> {

  @Override
  public boolean isValid(rwilk.hb.model.User user, ConstraintValidatorContext context) {
    return user != null && !StringUtils.isEmpty(user.getUsername());
  }
}
