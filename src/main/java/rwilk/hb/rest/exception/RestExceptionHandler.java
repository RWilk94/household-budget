package rwilk.hb.rest.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception,
      HttpHeaders headers, HttpStatus status, WebRequest request) {

    ErrorResponse response = ErrorResponse.builder()
        .status(HttpStatus.BAD_REQUEST.value())
        .message("Validation Failed")
        .timeStamp(System.currentTimeMillis())
        .details(exception.getBindingResult().toString())
        .build();

    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

}
