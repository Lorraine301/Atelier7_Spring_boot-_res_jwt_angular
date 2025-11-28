package ma.fstt.employee_api.security;


import jakarta.servlet.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwt;
    private final UserRepository repo;

    public JwtAuthFilter(JwtUtil jwt, UserRepository repo) {
        this.jwt = jwt;
        this.repo = repo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String path = req.getServletPath();
        // Ignore filter pour les endpoints d'authentification (register, login)
        if (path.startsWith("/auth/")) {
            chain.doFilter(req, res);
            return;
        }
        String header = req.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String username = jwt.getUsername(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserEntity user = repo.findByUsername(username);

                if (user != null) {
                    var authorities = List.of(new SimpleGrantedAuthority("ROLE_USER")); // assure qu'il y a au moins 1 authority

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(user.getUsername(), null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }


        chain.doFilter(req, res);
    }
}

