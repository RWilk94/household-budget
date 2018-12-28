package rwilk.hb.service;

import java.util.List;
import java.util.Optional;

import rwilk.hb.model.CategorySpending;
import rwilk.hb.model.MonthSpending;
import rwilk.hb.model.Spend;

public interface SpendingService {

  List<Spend> getUserSpending(String username);

  Spend getSpendingById(Long id);

  Spend addSpend(Spend spend);

  Spend updateSpend(Spend spend);

  void deleteSpend(Long id);

  List<CategorySpending> getUserSpendingFromCurrentMonth(String username);

  List<CategorySpending> getUserSpendingFromLastMonth(String username);

  List<MonthSpending> getLastYearSpending(String username);

}
