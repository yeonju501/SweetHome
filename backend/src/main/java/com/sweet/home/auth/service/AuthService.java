package com.sweet.home.auth.service;

import com.sweet.home.auth.controller.dto.request.LoginRequest;
import com.sweet.home.auth.controller.dto.request.TokenRequest;
import com.sweet.home.auth.controller.dto.response.TokenResponse;
import com.sweet.home.auth.domain.Authority;
import com.sweet.home.auth.domain.RefreshToken;
import com.sweet.home.auth.domain.RefreshTokenRepository;
import com.sweet.home.auth.infrastructure.JwtTokenProvider;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public TokenResponse login(LoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        member.login(passwordEncoder, request.getPassword());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());

        saveRefreshToken(member, tokenResponse);
        return tokenResponse;
    }

    private void saveRefreshToken(Member member, TokenResponse tokenResponse) {
        RefreshToken refreshToken = RefreshToken.builder()
            .key(member.getEmail())
            .value(tokenResponse.getRefreshToken())
            .build();
        refreshTokenRepository.save(refreshToken);
    }

    @Transactional
    public TokenResponse reissue(TokenRequest request) {
        // Refresh Token 검증
        jwtTokenProvider.validateRefreshToken(request.getRefreshToken());

        Authentication authentication = jwtTokenProvider.getAuthentication(request.getAccessToken());

        // 저장소에서 Email 로 refresh token 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findById(authentication.getName())
            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_LOGOUT_USER_JWT));

        // refresh token 일치하는지 검사
        refreshToken.validateValue(request.getRefreshToken());

        // 새로운 토큰 생성
        TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication.getName(),
            jwtTokenProvider.getAuthority(authentication));

        // 새로운 refresh token
        refreshToken.updateValue(tokenResponse.getRefreshToken());
        return tokenResponse;
    }
}
