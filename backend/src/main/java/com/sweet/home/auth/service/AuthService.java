package com.sweet.home.auth.service;

import com.sweet.home.auth.controller.dto.request.LoginRequest;
import com.sweet.home.auth.controller.dto.response.LoginMemberResponse;
import com.sweet.home.auth.domain.Tokens;
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
    public LoginMemberResponse login(LoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        member.login(passwordEncoder, request.getPassword());

        Tokens tokens = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());

        RefreshToken refreshToken = RefreshToken.builder()
            .key(member.getEmail())
            .value(tokens.getRefreshToken())
            .build();

        refreshTokenRepository.save(refreshToken);

        return new LoginMemberResponse(tokens);
    }
}
