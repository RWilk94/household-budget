package rwilk.hb.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import rwilk.hb.model.User;
import rwilk.hb.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public User register(User user) {
    if (!StringUtils.equals(user.getPassword(), user.getConfirmPassword())) {
      throw new IllegalArgumentException("Password and confirm password must be the same!");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }

}
