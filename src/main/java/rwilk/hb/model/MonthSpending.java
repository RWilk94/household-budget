package rwilk.hb.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthSpending implements Serializable {

  private int month;
  private int year;
  private Double sum;

}
