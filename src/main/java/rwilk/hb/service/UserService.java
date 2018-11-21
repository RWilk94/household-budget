package rwilk.hb.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import rwilk.hb.model.JWTUser;
import rwilk.hb.model.User;

public interface UserService extends UserDetailsService {

  User register(User user);

  JWTUser loadApplicationUserByUsername(String username);

  @Override
  UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;


}
