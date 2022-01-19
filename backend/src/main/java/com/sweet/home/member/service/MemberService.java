package com.sweet.home.member.service;

import com.sweet.home.member.controller.dto.request.MemberSaveRequest;
import com.sweet.home.member.domain.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Long saveMember(MemberSaveRequest request) {
        checkDuplicateEmail(request.getEmail());
        return null;
    }

    private void checkDuplicateEmail(String email) {
        if (memberRepository.existsByEmail(email)) {
            throw new RuntimeException("이미 존재하는 이메일 입니다.");
        }
    }
}
