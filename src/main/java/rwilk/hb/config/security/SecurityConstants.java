package rwilk.hb.config.security;

import java.util.concurrent.TimeUnit;

class SecurityConstants {

  static final String SECRET = "secretKey";
  static final String TOKEN_PREFIX = "Bearer ";
  static final String HEADER_STRING = "Authorization";
  static final long EXPIRATION_TIME = TimeUnit.DAYS.toSeconds(1); //864_000_000L;

}
