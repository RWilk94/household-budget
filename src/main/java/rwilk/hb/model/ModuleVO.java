package rwilk.hb.model;

import java.io.Serializable;
import java.util.Calendar;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleVO implements Serializable {

  private Long id;
  private String name;
  private Double plannedSpending;
  private Double actualSpending;
  private Calendar date;
  private String type;

}
