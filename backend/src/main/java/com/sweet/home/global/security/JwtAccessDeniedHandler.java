package com.sweet.home.global.security;

import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.global.exception.ErrorResponse;
import com.sweet.home.global.exception.JwtException;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
        throws IOException, ServletException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        // TODO : ErrorResponse 필드값을 정의한 후 Json 반환
        response.getWriter().write(ErrorResponse.toJson(ErrorCode.AUTHORITY_ACCESS_DENIED));
    }
}
