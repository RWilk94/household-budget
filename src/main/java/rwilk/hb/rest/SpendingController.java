package rwilk.hb.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rwilk.hb.model.CategorySpending;
import rwilk.hb.model.MonthSpending;
import rwilk.hb.model.Spend;
import rwilk.hb.service.SpendingService;

@RestController
@RequestMapping("/api/spending")
public class SpendingController {

  @Autowired
  private SpendingService spendingService;

  @RequestMapping(value = "/{username}", method = RequestMethod.GET)
  public List<Spend> getSpending(@PathVariable String username) {
    return spendingService.getUserSpending(username);
  }

  @RequestMapping(value = "/", method = RequestMethod.PUT)
  public Spend addSpend(@Valid @RequestBody Spend spend) {
    return spendingService.addSpend(spend);
  }

  @RequestMapping(value = "/", method = RequestMethod.PATCH)
  public Spend updateSpend(@Valid @RequestBody Spend spend) {
    return spendingService.updateSpend(spend);
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public void deleteSpend(@Valid @PathVariable Long id) {
    spendingService.deleteSpend(id);
  }

  @RequestMapping(value = "/{username}/currentMonth", method = RequestMethod.GET)
  public List<CategorySpending> getSpendingFromCurrentMonth(@PathVariable String username) {
    return spendingService.getUserSpendingFromCurrentMonth(username);
  }

  @RequestMapping(value = "/{username}/lastMonth", method = RequestMethod.GET)
  public List<CategorySpending> getSpendingFromLastMonth(@PathVariable String username) {
    return spendingService.getUserSpendingFromLastMonth(username);
  }

  @RequestMapping(value = "/{username}/lastYear", method = RequestMethod.GET)
  public List<MonthSpending> getLastYearSpending(@PathVariable String username) {
    return spendingService.getLastYearSpending(username);
  }

}
