package rwilk.hb.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "categories", uniqueConstraints = @UniqueConstraint(columnNames = {"name", "id_user", "id_module"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Category implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categorySG")
  @SequenceGenerator(name = "categorySG", sequenceName = "categorySEQ", allocationSize = 1, initialValue = 100)
  private Long id;

  @Size(min = 1, max = 255)
  @Column(nullable = false)
  @NotBlank
  private String name;

  @rwilk.hb.validator.User
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "id_user", referencedColumnName = "id")
  private User user;

  @rwilk.hb.validator.Module
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "id_module", referencedColumnName = "id")
  private Module module;

  @NotNull
  private boolean isSpend;

}
