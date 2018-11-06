package rwilk.hb.rest.exception;

import lombok.Data;

@Data
class ErrorResponse {

  private int status;
  private String message;
  private String details;
  private long timeStamp;

}
