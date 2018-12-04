package rwilk.hb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.io.Serializable;
import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import rwilk.hb.validator.Username;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class User implements Serializable {

  @JsonIgnore
  @Id
  @Column
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userSG")
  @SequenceGenerator(name = "userSG", sequenceName = "userSEQ", allocationSize = 1)
  private Long id;

  @NotBlank
  @Username
  @Size(min = 3, max = 63)
  @Column(unique = true, nullable = false)
  private String username;

  @Email(message = "Email has invalid format.")
  @Column(unique = true, nullable = false)
  private String email;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Size(min = 6, max = 256)
  @Column(nullable = false)
  private String password;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Transient
  private String confirmPassword;

  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  @Transient
  private String oldPassword;

  @CreationTimestamp
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Timestamp created;

}
