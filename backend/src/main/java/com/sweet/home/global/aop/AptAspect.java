package com.sweet.home.global.aop;

import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.service.AptService;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AptAspect {

    private final MemberService memberService;
    private final AptService aptService;

    public AptAspect(MemberService memberService, AptService aptService) {
        this.memberService = memberService;
        this.aptService = aptService;
    }

    @Before(value = "@annotation(aptChecker)")
    public void checkLoginUserIsAptUser(AptChecker aptChecker) {
        // request 객체 읽기
        ServletRequestAttributes requestAttributes =
            (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();

        Long aptId = getAptCode(request.getRequestURI());
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Apt apt = aptService.findById(aptId);
        Member member = memberService.findByEmail(email);
        member.checkAptMember(apt);
    }

    private Long getAptCode(String uri) {
        String[] uris = uri.split("/");
        if (uris.length < 4 || !uris[1].equals("api") || !uris[2].equals("test")) {
            throw new RuntimeException("uri 요청이 올바르지 않음");
        }
        return Long.parseLong(uris[3]);
    }
}