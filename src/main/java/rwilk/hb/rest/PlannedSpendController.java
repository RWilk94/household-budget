package rwilk.hb.rest;

import org.springframework.beans.factory.annotation.Autowired;
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
  public PlannedSpend insertPlannedSpend(@RequestBody PlannedSpend plannedSpend) {
    return plannedSpendService.insertPlannedSpend(plannedSpend);
  }

}
