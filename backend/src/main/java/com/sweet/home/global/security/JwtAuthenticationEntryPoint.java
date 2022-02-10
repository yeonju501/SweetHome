package com.sweet.home.global.security;

import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.global.exception.ErrorResponse;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
        throws IOException, ServletException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // TODO : ErrorResponse 필드값을 정의한 후 Json 반환
        response.getWriter().write(ErrorResponse.toJson(ErrorCode.AUTHORITY_ENTRY_POINT));
    }
}
