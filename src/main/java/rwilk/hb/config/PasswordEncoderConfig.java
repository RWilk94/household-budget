package rwilk.hb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordEncoderConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new PasswordEncoder() {
      @Override
      public String encode(CharSequence password) {
        return BCrypt.hashpw(password.toString(), BCrypt.gensalt(11));
      }

      @Override
      public boolean matches(CharSequence password, String encodedPassword) {
        return BCrypt.checkpw(password.toString(), encodedPassword);
      }
    };
  }

}
