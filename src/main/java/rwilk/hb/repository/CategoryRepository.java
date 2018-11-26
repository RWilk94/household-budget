package rwilk.hb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rwilk.hb.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  @Modifying(clearAutomatically = true)
  @Query(value = "SELECT c FROM Category c WHERE c.user.username =:username OR c.user = null")
  List<Category> findAllUserCategories(@Param("user") String username);

}
