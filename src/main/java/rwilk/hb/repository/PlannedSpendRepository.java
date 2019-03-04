package rwilk.hb.repository;

import java.util.Calendar;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rwilk.hb.model.PlannedSpend;

public interface PlannedSpendRepository extends JpaRepository<PlannedSpend, Long> {

  @Query(nativeQuery = true,
      value = "SELECT m.name, SUM(p.planned_spend)"
          + "FROM planned_spending p, categories c, users u, modules m "
          + "WHERE p.id_category = c.id and c.id_module = m.id and p.id_user = u.id and p.date >= :firstDay and p.date <= :lastDay and u.username = :username "
          + "GROUP BY 1")
  List<Object> findAllByDateIsBetweenAndUser_UsernameAndGroupByModule(
      @Param("firstDay") Calendar firstDay, @Param("lastDay") Calendar lastDay, @Param("username") String username);

  @Query(nativeQuery = true,
      value = "SELECT c.name, SUM(p.planned_spend)"
          + "FROM planned_spending p, categories c, users u "
          + "WHERE p.id_category = c.id and p.id_user = u.id and p.date >= :firstDay and p.date <= :lastDay and u.username = :username "
          + "GROUP BY 1")
  List<Object> findAllByDateIsBetweenAndUser_UsernameAndGroupByCategory(
      @Param("firstDay") Calendar firstDay, @Param("lastDay") Calendar lastDay, @Param("username") String username);


  @Query(nativeQuery = true,
  value = "SELECT * "
      + "FROM planned_spending p, categories c, users u "
      + "WHERE p.id_category = c.id and p.id_user = u.id "
      + "and c.id = :categoryId and u.username = :username and extract(year from p.\"date\") = :yearP "
      + "order by p.\"date\"")
  List<PlannedSpend> findAllByCategoryAndUserAndDate(@Param("username") String username, @Param("categoryId") Long categoryId, @Param("yearP") Long year);

}
