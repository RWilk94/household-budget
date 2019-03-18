package rwilk.hb.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rwilk.hb.model.Module;
import rwilk.hb.model.ModuleVO;
import rwilk.hb.service.ModuleService;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

  @Autowired
  private ModuleService moduleService;

  @RequestMapping(value = "/", method = RequestMethod.GET)
  public List<Module> getModules() {
    return moduleService.getModules();
  }

  @RequestMapping(value = "/{username}/{year}", method = RequestMethod.GET)
  public List<ModuleVO> getModuleVOsByYear(@PathVariable String username, @PathVariable Integer year) {
    return moduleService.getModuleVOsByYear(username, year);
  }

  @RequestMapping(value = "/{username}/{year}/{month}", method = RequestMethod.GET)
  public List<ModuleVO> getModuleVOsByMonth(@PathVariable String username, @PathVariable Integer year, @PathVariable Integer month) {
    return moduleService.getModuleVOsByMonth(username, year, month);
  }

}
