package rwilk.hb.service;

import java.util.List;

import rwilk.hb.model.Spend;

public interface SpendingService {

  List<Spend> getUserSpending(String username);

  Spend addSpend(Spend spend);

  Spend updateSpend(Spend spend);

  void deleteSpend(Long id);

  List<Spend> getUserSpendingFromCurrentMonth(String username);

  List<Spend> getUserSpendingFromLastMonth(String username);

}
