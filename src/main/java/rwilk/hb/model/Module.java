package rwilk.hb.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "modules")
public class Module implements Serializable {

    @Id
    @SequenceGenerator(name = "moduleSG", sequenceName = "moduleSEQ")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "moduleSG")
    private Long id;

    @NotNull
    @Size(min = 3, max = 255)
    private String name;

}
