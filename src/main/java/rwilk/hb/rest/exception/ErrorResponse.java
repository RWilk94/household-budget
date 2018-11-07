package rwilk.hb.rest.exception;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
class ErrorResponse {

  private int status;
  private String message;
  private String details;
  private long timeStamp;

}
