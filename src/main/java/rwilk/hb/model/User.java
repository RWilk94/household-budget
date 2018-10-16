package rwilk.hb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @Column
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
