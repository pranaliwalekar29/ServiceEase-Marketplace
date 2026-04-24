package com.serviceease.controller;

import com.serviceease.dto.LoginRequestDTO;
import com.serviceease.dto.LoginResponseDTO;
import com.serviceease.dto.RegisterRequestDTO;
import com.serviceease.dto.RegisterResponseDTO;
import com.serviceease.repository.AuthService;
import com.serviceease.repository.UserRepository;
import com.serviceease.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AuthService authService;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, UserRepository userRepository, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.jwtService=jwtService;
        this.userRepository = userRepository;
        this.authService = authService;
    }

    //postman checked
    @PostMapping(value="register",produces = "application/json")
    public ResponseEntity<RegisterResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request){
        return ResponseEntity.ok(authService.register(request));
    }

    //postman checked
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request
            ){

        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        UserDetails userDetails=(UserDetails) authentication.getPrincipal();
        com.serviceease.entity.User user = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user);
        return  ResponseEntity.ok(
                new LoginResponseDTO(
                        user.getName(),user.getEmail(),user.getRole().name(),token
                )
        );
    }
}
