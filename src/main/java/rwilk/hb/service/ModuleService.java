package rwilk.hb.service;

import java.util.Calendar;
import java.util.List;

import rwilk.hb.model.Module;
import rwilk.hb.model.ModuleVO;

public interface ModuleService {

  List<Module> getModules();

  List<ModuleVO> getModules(String username, Calendar date);

}
