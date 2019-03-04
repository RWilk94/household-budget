package rwilk.hb.service;

import java.util.List;

import rwilk.hb.model.PlannedSpend;

public interface PlannedSpendService {
  List<PlannedSpend> insertPlannedSpending(List<PlannedSpend> plannedSpend);

  List<PlannedSpend> getPlannedSpending(String username, Long categoryId, Long year);
}
