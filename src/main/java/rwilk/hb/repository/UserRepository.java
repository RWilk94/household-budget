package rwilk.hb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

  Optional<User> findUserByUsername(String username);

}
