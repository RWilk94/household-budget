package rwilk.hb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rwilk.hb.model.Module;
import rwilk.hb.repository.ModuleRepository;

@Service
public class ModuleServiceImpl implements ModuleService {

  @Autowired
  private ModuleRepository moduleRepository;

  @Override
  public List<Module> getModules() {
    return moduleRepository.findAll();
  }
}
