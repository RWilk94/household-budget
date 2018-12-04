package rwilk.hb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  Optional<Category> findById(Long id);

  List<Category> findAllByUserIsNullOrUser_Username(String username);

}
