package com.sweet.home.auth.infrastructure;

import com.sweet.home.auth.controller.dto.response.TokenResponse;
import com.sweet.home.auth.domain.Authority;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.global.exception.JwtException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private static final String JWT_HEADER_PARAM_TYPE = "typ";
    private static final String JWT_PAYLOAD_AUTHORITY_TYPE = "auth";
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;  // 7일

    private final Key key;
    private final String headerType;
    private final String issuer;
    private final long accessTime;

    public JwtTokenProvider(@Value("${jwt.token.header-type}") String headerType,
        @Value("${jwt.token.issuer}") String issuer,
        @Value("${jwt.token.secret}") String secret,
        @Value("${jwt.token.access-time}") long accessTime) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
        this.headerType = headerType;
        this.issuer = issuer;
        this.accessTime = accessTime;
    }

    public TokenResponse createToken(String subject, Authority authority) {

        // Access Token 생성
        String accessToken = Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS512)
            .setHeaderParam(JWT_HEADER_PARAM_TYPE, headerType)
            .setSubject(subject)
            .claim(JWT_PAYLOAD_AUTHORITY_TYPE, authority.getAuthorityCode())
            .setIssuer(issuer)
            .setExpiration(new Date((new Date()).getTime() + accessTime))
            .setIssuedAt(new Date())
            .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
            .setExpiration(new Date((new Date()).getTime() + REFRESH_TOKEN_EXPIRE_TIME))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact();

        return TokenResponse.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    public Authentication resolveAccessToken(String accessToken) {
        try {
            return getAuthentication(accessToken);
        } catch (ExpiredJwtException e) {
            throw new JwtException(ErrorCode.INVALID_EXPIRED_JWT);
        } catch (SecurityException | MalformedJwtException e) {
            throw new JwtException(ErrorCode.INVALID_MALFORMED_JWT);
        } catch (UnsupportedJwtException e) {
            throw new JwtException(ErrorCode.INVALID_UNSUPPORTED_JWT);
        } catch (IllegalArgumentException e) {
            throw new JwtException(ErrorCode.INVALID_ILLEGAL_ARGUMENT_JWT);
        }
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(accessToken).getBody();

        Collection<? extends GrantedAuthority> authorities =
            Arrays.stream(claims.get(JWT_PAYLOAD_AUTHORITY_TYPE).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        return new UsernamePasswordAuthenticationToken(claims.getSubject(), accessToken, authorities);
    }

    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(refreshToken);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            throw new JwtException(ErrorCode.INVALID_MALFORMED_JWT);
        } catch (ExpiredJwtException e) {
            throw new JwtException(ErrorCode.INVALID_EXPIRED_JWT);
        } catch (UnsupportedJwtException e) {
            throw new JwtException(ErrorCode.INVALID_UNSUPPORTED_JWT);
        } catch (IllegalArgumentException e) {
            throw new JwtException(ErrorCode.INVALID_ILLEGAL_ARGUMENT_JWT);
        }
    }
}
