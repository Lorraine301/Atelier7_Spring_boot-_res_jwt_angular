package ma.fstt.employee_api.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest req) {
        UserEntity u = new UserEntity();
        u.setUsername(req.getUsername());
        u.setPassword(encoder.encode(req.getPassword()));
        userRepo.save(u);
        return "User created!";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest req) {

        UserEntity u = userRepo.findByUsername(req.getUsername());
        if (u == null || !encoder.matches(req.getPassword(), u.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwt.generateToken(u.getUsername());
        return new AuthResponse(token);
    }
}
