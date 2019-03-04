package rwilk.hb.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rwilk.hb.model.PlannedSpend;
import rwilk.hb.service.PlannedSpendService;

@RestController
@RequestMapping("/api/planned-spending")
public class PlannedSpendController {

  @Autowired
  private PlannedSpendService plannedSpendService;

  @RequestMapping(value = "/", method = RequestMethod.PUT)
  public List<PlannedSpend> insertPlannedSpend(@RequestBody List<PlannedSpend> plannedSpending) {
    return plannedSpendService.insertPlannedSpending(plannedSpending);
  }

  @RequestMapping(value = "/{username}/{category}/{year}", method = RequestMethod.GET)
  public List<PlannedSpend> getPlannedSpending(
      @PathVariable(name = "username") String username,
      @PathVariable(name = "category") Long categoryId,
      @PathVariable(name = "year") Long year) {
    return plannedSpendService.getPlannedSpending(username, categoryId, year);
  }

}
