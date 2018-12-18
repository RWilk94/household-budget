package rwilk.hb.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Constraint(validatedBy = CategoryValidator.class)
public @interface Category {

  String message() default "{Invalid category.}";

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

}