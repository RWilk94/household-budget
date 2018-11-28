package rwilk.hb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  List<Category> findAllByUserIsNullOrUser_Username(String username);

}
