package rwilk.hb.service;

import java.util.List;

import rwilk.hb.model.Module;
import rwilk.hb.model.ModuleVO;

public interface ModuleService {

  List<Module> getModules();

  List<ModuleVO> getModuleVOsByYear(String username, Integer year);

  List<ModuleVO> getModuleVOsByMonth(String username, Integer year, Integer month);

}
