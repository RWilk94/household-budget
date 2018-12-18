package rwilk.hb.model;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "spending")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Spend implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "spendSG")
  @SequenceGenerator(name = "spendSG", sequenceName = "spendSEQ", allocationSize = 1)
  private Long id;

  @NotNull
  @Size(min = 3, max = 512)
  private String name;

  @rwilk.hb.validator.Category
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "id_category", referencedColumnName = "id")
  private Category category;

  @rwilk.hb.validator.User
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "id_user", nullable = false, referencedColumnName = "id")
  private User user;

  @NotNull
  private Calendar date;

  private boolean reminder;

  @NotNull
  private boolean isSpend;

  @NotNull
  private Double value;
}
