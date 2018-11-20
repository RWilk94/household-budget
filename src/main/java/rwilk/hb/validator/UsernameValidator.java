package rwilk.hb.validator;

import java.util.regex.Pattern;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UsernameValidator implements ConstraintValidator<Username, String> {

  @Override
  public boolean isValid(String username, ConstraintValidatorContext context) {
    return Pattern.matches("[a-zA-Z0-9_\\-]*", username);
  }
}
