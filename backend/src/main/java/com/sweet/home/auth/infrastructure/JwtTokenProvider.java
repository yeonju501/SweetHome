package com.sweet.home.auth.infrastructure;

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
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    private static final String JWT_HEADER_PARAM_TYPE = "typ";
    private static final String JWT_PAYLOAD_AUTHORITY_TYPE = "auth";

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

    public String createToken(String subject, Authority authority) {
        return Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS512)
            .setHeaderParam(JWT_HEADER_PARAM_TYPE, headerType)
            .setSubject(subject)
            .claim(JWT_PAYLOAD_AUTHORITY_TYPE, authority.getAuthorityCode())
            .setIssuer(issuer)
            .setExpiration(new Date((new Date()).getTime() + accessTime))
            .setIssuedAt(new Date())
            .compact();
    }

    public String resolveToken(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(accessToken).getBody().getSubject();
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

    private Authentication getAuthentication(String accessToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(accessToken).getBody();
        return null;
    }
}
