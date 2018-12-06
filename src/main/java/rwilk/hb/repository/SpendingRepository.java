package rwilk.hb.repository;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import rwilk.hb.model.Spend;

public interface SpendingRepository extends JpaRepository<Spend, Long> {

  Optional<Spend> findById(Long id);

  List<Spend> findAllByUserIsNullOrUser_Username(String username);

  List<Spend> findAllByDateIsBetweenAndUser_Username(Calendar firstDay, Calendar lastDay, String username);

  @Query(nativeQuery = true,
      value = "SELECT to_char(s.date, 'MM') as month, extract(year from s.date) as year, sum(s.value) as sum "
          + "FROM spending s, users u "
          + "WHERE s.date > (current_date - interval '11 months') AND s.id_user = u.id AND u.username = :username "
          + "GROUP BY 1, 2")
  List<Object> findAllSpending(@Param("username") String username);

}
