package rwilk.hb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.Module;

public interface ModuleRepository extends JpaRepository<Module, Long> {

  Optional<Module> findByName(String moduleName);

}
