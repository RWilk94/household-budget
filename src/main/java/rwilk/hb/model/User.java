package rwilk.hb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

  @JsonIgnore
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSG")
  @SequenceGenerator(name = "userSG", sequenceName = "userSEQ", allocationSize = 1)
  private Long id;

  @Size(min = 3, max = 40)
  @Column(unique = true, nullable = false)
  private String username;

  @Column(unique = true, nullable = false)
  private String email;

  @JsonIgnore
  @Size(min = 6, max = 256)
  @Column(nullable = false)
  private String password;

  @Transient
  private String confirmPassword;

  @Transient
  private String oldPassword;

  @CreationTimestamp
  private Timestamp created;

}
