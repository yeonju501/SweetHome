package com.sweet.home.auth.controller;

import com.sweet.home.auth.controller.dto.request.LoginRequest;
import com.sweet.home.auth.controller.dto.request.TokenRequest;
import com.sweet.home.auth.controller.dto.response.TokenResponse;
import com.sweet.home.auth.service.AuthService;
import com.sweet.home.auth.service.KakaoOAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    private final AuthService authService;
    private final KakaoOAuthService kakaoOAuthService;

    public AuthRestController(AuthService authService, KakaoOAuthService kakaoOAuthService) {
        this.authService = authService;
        this.kakaoOAuthService = kakaoOAuthService;
    }

    @PostMapping("/members/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok().body(authService.login(request));
    }

    @PostMapping("/members/reissue")
    public ResponseEntity<TokenResponse> reissue(@RequestBody TokenRequest request) {
        return ResponseEntity.ok().body(authService.reissue(request));
    }

    @GetMapping("/oauth2/authorization/kakao")
    public ResponseEntity<TokenResponse> getKakaoCode(@RequestParam String code){
        return ResponseEntity.ok().body(kakaoOAuthService.oauth2AuthorizationKakao(code));
    }
}
