package rwilk.hb.model;

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

import java.io.Serializable;
import java.sql.Timestamp;

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
  @SequenceGenerator(name = "spendSG", sequenceName = "spendSEQ")
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "spendSG")
  private Long id;

  @NotNull
  @Size(min = 3, max = 512)
  private String name;

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "id_category", referencedColumnName = "id")
  private Category category;

  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  @JoinColumn(name = "id_user", nullable = false, referencedColumnName = "id")
  private User user;

  @NotNull
  private Timestamp date;

  private boolean reminder;

  @NotNull
  private boolean isSpend;

  @NotNull
  private Long value;
}
