package rwilk.hb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rwilk.hb.model.Category;
import rwilk.hb.model.Module;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  Optional<Category> findById(Long id);

  List<Category> findAllByUserIsNullOrUser_Username(String username);

  @Query(nativeQuery = true,
      value = "SELECT c.* "
          + "FROM categories c left join users u on (u.id = c.id_user) "
          + "WHERE ((u.username = :username) or c.id_user is null) and c.id_module = :id")
  List<Category> findAllByUserIsNullOrUser_UsernameAndModule(
      @Param("username") String username, @Param("id") long id);

}
