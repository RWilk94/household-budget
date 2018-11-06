package rwilk.hb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
