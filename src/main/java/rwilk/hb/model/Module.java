package rwilk.hb.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "modules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Module implements Serializable {

  @Id
  @SequenceGenerator(name = "moduleSG", sequenceName = "moduleSEQ")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "moduleSG")
  private Long id;

  @Size(min = 3, max = 255)
  @Column(unique = true, nullable = false)
  private String name;
}
