package com.sweet.home.auth.controller;

import com.sweet.home.auth.controller.dto.request.LoginRequest;
import com.sweet.home.auth.controller.dto.request.TokenRequest;
import com.sweet.home.auth.controller.dto.response.TokenResponse;
import com.sweet.home.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    private final AuthService authService;

    public AuthRestController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/members/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok().body(authService.login(request));
    }

    @PostMapping("/members/reissue")
    public ResponseEntity<TokenResponse> reissue(@RequestBody TokenRequest request) {
        return ResponseEntity.ok().body(authService.reissue(request));
    }
}
