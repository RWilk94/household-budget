package rwilk.hb.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import rwilk.hb.service.ai.PredictService;

@RestController
@RequestMapping("/api/predict")
public class PredictController {

  @Autowired
  private PredictService predictService;

  @RequestMapping(params = {"username", "categoryId"})
  public Double predictHeatingCost(@RequestParam(value = "username") String username,
      @RequestParam(value = "categoryId") Long categoryId) throws Exception {
    return predictService.predictValue(username, categoryId);
  }

}
