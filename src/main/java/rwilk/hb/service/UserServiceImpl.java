package rwilk.hb.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import rwilk.hb.model.JWTUser;
import rwilk.hb.model.User;
import rwilk.hb.repository.UserRepository;

import java.util.Optional;

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

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    JWTUser jwtUser = loadApplicationUserByUsername(username);
    return new org.springframework.security.core.userdetails.User(jwtUser.getUsername(), jwtUser.getPassword(),
        AuthorityUtils.createAuthorityList("ROLE_USER"));
  }

  @Override
  public JWTUser loadApplicationUserByUsername(String username) {
    Optional<User> user = userRepository.findUserByUsername(username);
    if (user.isPresent()) {
      return new JWTUser(user.get().getUsername(), /*"{passwordEncoder}"*/ user.get().getPassword());
    }
    throw new UsernameNotFoundException("Username: " + username + " not found");
  }
}
