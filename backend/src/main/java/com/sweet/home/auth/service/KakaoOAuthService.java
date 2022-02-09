package com.sweet.home.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sweet.home.auth.controller.dto.AuthorizationKakao;
import com.sweet.home.auth.controller.dto.response.KakaoUserInfoResponse;
import com.sweet.home.auth.controller.dto.response.TokenResponse;
import com.sweet.home.auth.domain.RefreshToken;
import com.sweet.home.auth.domain.RefreshTokenRepository;
import com.sweet.home.auth.infrastructure.JwtTokenProvider;
import com.sweet.home.global.exception.CustomException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoOAuthService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    public KakaoOAuthService(RestTemplate restTemplate, ObjectMapper objectMapper,
        MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider,
        RefreshTokenRepository refreshTokenRepository) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    private static final String CLIENT_ID = "fee61610134bc27e46ca75ce36e1557c";
    private static final String REDIRECT_URL = "http://localhost:3000/oauth2/code/kakao";
    private static final String TOKEN_URL = "https://kauth.kakao.com/oauth/token";
    private static final String USERINFO_URL = "https://kapi.kakao.com/v2/user/me";

    @Transactional
    public TokenResponse oauth2AuthorizationKakao(String code) {
        AuthorizationKakao authorization = callTokenApi(code);
        KakaoUserInfoResponse userInfoResponse = callUserInfoByAccessToken(authorization.getAccess_token());

        Member member = loadUser(userInfoResponse);
        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getEmail(), member.getAuthority());
        saveRefreshToken(member, tokenResponse);
        return tokenResponse;
    }

    private AuthorizationKakao callTokenApi(String code) {
        String grantType = "authorization_code";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", CLIENT_ID);
        params.add("redirect_uri", REDIRECT_URL);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(TOKEN_URL, request, String.class);
            AuthorizationKakao authorization = objectMapper.readValue(response.getBody(), AuthorizationKakao.class);
            return authorization;
        } catch (RestClientException | JsonProcessingException e) {
            e.printStackTrace();
            throw new CustomException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID);
        }
    }

    private KakaoUserInfoResponse callUserInfoByAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<KakaoUserInfoResponse> response = restTemplate.postForEntity(USERINFO_URL, request,
                KakaoUserInfoResponse.class);
            return response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
            throw new CustomException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID);
        }
    }

    @Transactional
    public Member loadUser(KakaoUserInfoResponse response) {
        String email = (String) response.getKakaoAccount().get("email");
        Member member = memberRepository.findByEmail(email)
            .orElse(response.toEntity());

        return memberRepository.save(member);
    }

    @Transactional
    public void saveRefreshToken(Member member, TokenResponse tokenResponse) {
        RefreshToken refreshToken = RefreshToken.builder()
            .key(member.getEmail())
            .value(tokenResponse.getRefreshToken())
            .build();
        refreshTokenRepository.save(refreshToken);
    }
}