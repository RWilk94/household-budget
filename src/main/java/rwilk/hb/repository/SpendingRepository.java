package rwilk.hb.repository;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rwilk.hb.model.Category;
import rwilk.hb.model.Spend;
import rwilk.hb.model.User;

public interface SpendingRepository extends JpaRepository<Spend, Long> {

  Optional<Spend> findById(Long id);

  List<Spend> findAllByUserIsNullOrUser_Username(String username);

  //TODO add group by module and category
  //List<Spend> findAllByDateIsBetweenAndUser_Username(Calendar firstDay, Calendar lastDay, String username);

  @Query(nativeQuery = true,
      value = "SELECT c.name, SUM(s.value)"
          + "FROM spending s, categories c, users u "
          + "WHERE s.id_category = c.id and s.id_user = u.id and s.date >= :firstDay and s.date <= :lastDay and u.username = :username "
          + "GROUP BY 1")
  List<Object> findAllByDateIsBetweenAndUser_UsernameAndGroupByCategory(
      @Param("firstDay") Calendar firstDay, @Param("lastDay") Calendar lastDay, @Param("username") String username);

  @Query(nativeQuery = true,
      value = "SELECT c.name, SUM(s.value)"
          + "FROM spending s, categories c, users u, modules m "
          + "WHERE s.id_category = c.id and c.id_module = m.id and m.id = :moduleId and s.id_user = u.id and s.date >= :firstDay and s.date <= :lastDay and u.username = :username "
          + "GROUP BY 1")
  List<Object> findAllByDateIsBetweenAndUser_UsernameAndGroupByCategory(
      @Param("firstDay") Calendar firstDay, @Param("lastDay") Calendar lastDay, @Param("username") String username, @Param("moduleId") Long moduleId);


  @Query(nativeQuery = true,
      value = "SELECT m.name, SUM(s.value)"
          + "FROM spending s, categories c, users u, modules m "
          + "WHERE s.id_category = c.id and c.id_module = m.id and s.id_user = u.id and s.date >= :firstDay and s.date <= :lastDay and u.username = :username "
          + "GROUP BY 1")
  List<Object> findAllByDateIsBetweenAndUser_UsernameAndGroupByModule(
      @Param("firstDay") Calendar firstDay, @Param("lastDay") Calendar lastDay, @Param("username") String username);

  @Query(nativeQuery = true,
      value = "SELECT to_char(s.date, 'MM') as month, extract(year from s.date) as year, sum(s.value) as sum "
          + "FROM spending s, users u "
          + "WHERE s.date >= (current_date - interval '11 months') "
          + "AND s.date < date_trunc('month', now() + interval '1 month') "
          + "AND s.id_user = u.id AND u.username = :username "
          + "GROUP BY 1, 2 "
          + "ORDER BY 2, 1"
  )
  List<Object> findAllSpending(@Param("username") String username);

  List<Spend> findAllByUserAndCategoryOrderByDate(User user, Category category);

}
