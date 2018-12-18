package rwilk.hb.config.security;

import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import rwilk.hb.model.JWTUser;
import rwilk.hb.service.UserService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static rwilk.hb.config.security.SecurityConstants.HEADER_STRING;
import static rwilk.hb.config.security.SecurityConstants.SECRET;
import static rwilk.hb.config.security.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

  private final UserService userService;

  JWTAuthorizationFilter(AuthenticationManager authenticationManager, UserService userService) {
    super(authenticationManager);
    this.userService = userService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws IOException, ServletException {

    String header = request.getHeader(HEADER_STRING);
    if ((header == null) || !header.startsWith(TOKEN_PREFIX)) {
      chain.doFilter(request, response);
      return;
    }
    UsernamePasswordAuthenticationToken usernamePasswordAuth = getAuthenticationToken(request);
    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuth);
    chain.doFilter(request, response);
  }

  private UsernamePasswordAuthenticationToken getAuthenticationToken(HttpServletRequest request) {
    String token = request.getHeader(HEADER_STRING);
    //System.out.println("Token: " + token);
    String username = Jwts.parser().setSigningKey(SECRET)
        .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))//remove Bearer
        .getBody()
        .getSubject();

    UserDetails userDetails = userService.loadUserByUsername(username);
    JWTUser jwtUser = userService.loadApplicationUserByUsername(username);
    return username != null ? new UsernamePasswordAuthenticationToken(jwtUser, null, userDetails.getAuthorities()) : null;
  }

}
