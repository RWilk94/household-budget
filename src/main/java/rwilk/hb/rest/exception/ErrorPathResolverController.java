package rwilk.hb.rest.exception;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

//@RestController
//public class ErrorPathResolverController implements ErrorController {
//
//  private static final String PATH = "/error";
//
//  @RequestMapping(value = PATH)
//  public ResponseEntity error() {
//    HttpHeaders headers = new HttpHeaders();
//    headers.setLocation(URI.create("/"));
//    return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
//  }
//
//  @Override
//  public String getErrorPath() {
//    return PATH;
//  }
//}