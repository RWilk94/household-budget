package rwilk.hb.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import rwilk.hb.exception.UserAlreadyExistsException;
import rwilk.hb.model.Category;
import rwilk.hb.model.JWTUser;
import rwilk.hb.model.User;
import rwilk.hb.repository.CategoryRepository;
import rwilk.hb.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public User register(User user) {
    if (!StringUtils.equals(user.getPassword(), user.getConfirmPassword())) {
      throw new IllegalArgumentException("Password and confirm password must be the same!");
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    Optional<User> userOptional = userRepository.findByEmailOrUsername(user.getEmail(), user.getUsername());
    if (userOptional.isPresent()) {
      if (userOptional.get().getUsername().equalsIgnoreCase(user.getUsername())) {
        throw new UserAlreadyExistsException("The username is already taken.");
      }
      if (userOptional.get().getEmail().equalsIgnoreCase(user.getEmail())) {
        throw new UserAlreadyExistsException("The email is already taken.");
      }
    }
    user = userRepository.save(user);
    createCategoriesForUser(user);
    return user;
  }

  private void createCategoriesForUser(User user) {
    List<Category> categories = categoryRepository.findAllByUserIsNull();
    List<Category> userCategories = categories.stream().map(category -> Category.builder()
        .isSpend(category.isSpend())
        .module(category.getModule())
        .name(category.getName())
        .user(user)
        .build()
    ).collect(Collectors.toList());
    categoryRepository.saveAll(userCategories);
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    JWTUser jwtUser = loadApplicationUserByUsername(username);
    return new org.springframework.security.core.userdetails.User(jwtUser.getUsername(), jwtUser.getPassword(),
        AuthorityUtils.createAuthorityList("ROLE_USER"));
  }

  @Override
  public JWTUser loadApplicationUserByUsername(String username) {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isPresent()) {
      return new JWTUser(user.get().getUsername(), /*"{passwordEncoder}"*/ user.get().getPassword());
    }
    throw new UsernameNotFoundException("Username: " + username + " not found");
  }
}
