package rwilk.hb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.Spend;

public interface SpendingRepository extends JpaRepository<Spend, Long> {

  Optional<Spend> findById(Long id);

  List<Spend> findAllByUserIsNullOrUser_Username(String username);

}
