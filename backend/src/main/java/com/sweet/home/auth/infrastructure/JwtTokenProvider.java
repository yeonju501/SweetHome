package com.sweet.home.auth.infrastructure;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

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
}
