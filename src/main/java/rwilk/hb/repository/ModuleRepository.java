package rwilk.hb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import rwilk.hb.model.Module;

public interface ModuleRepository extends JpaRepository<Module, Long> {
}
