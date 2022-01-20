package com.sweet.home.member.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.controller.dto.response.ProfileResponse;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final MemberRepository memberRepository;

    public ProfileService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional(readOnly = true)
    public ProfileResponse viewProfile(String email) {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_EMAIL));
        return ProfileResponse.from(member);
    }
}
