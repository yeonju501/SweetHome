package com.sweet.home.apt.service;

import com.sweet.home.apt.controller.dto.request.AptHouseMemberRequest;
import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
import com.sweet.home.apt.controller.dto.response.AptMembersResponse;
import com.sweet.home.apt.controller.dto.response.AptRegisterMembersResponse;
import com.sweet.home.apt.controller.dto.response.MyRegisterAptHouseResponse;
import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.domain.AptHouse;
import com.sweet.home.apt.domain.AptHouseRepository;
import com.sweet.home.apt.domain.AptRepository;
import com.sweet.home.apt.domain.RegisterAptHouse;
import com.sweet.home.apt.domain.RegisterAptHouseRepository;
import com.sweet.home.auth.domain.Authority;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AptService {

    private final AptRepository aptRepository;
    private final AptHouseRepository aptHouseRepository;
    private final RegisterAptHouseRepository registerAptHouseRepository;
    private final MemberService memberService;

    public AptService(AptRepository aptRepository, AptHouseRepository aptHouseRepository,
        RegisterAptHouseRepository registerAptHouseRepository, MemberService memberService) {
        this.aptRepository = aptRepository;
        this.aptHouseRepository = aptHouseRepository;
        this.registerAptHouseRepository = registerAptHouseRepository;
        this.memberService = memberService;
    }

    public Apt findById(Long aptId) {
        return aptRepository.findById(aptId)
            .orElseThrow(() -> new BusinessException(ErrorCode.APT_NOT_FOUND_BY_ID));
    }

    @Transactional
    public void createRegisterApt(String email, RegisterAptHouseRequest request) {
        Member member = memberService.findByEmail(email);
        Apt apt = findById(request.getAptId());
        checkDuplicateRegisterMember(member);

        // TODO: 이미 본인이 살고 있는 아파트면 에러 출력

        registerAptHouseRepository.save(RegisterAptHouse.createRegisterAptHouse(member, apt, request));
    }

    private void checkDuplicateRegisterMember(Member member) {
        if (registerAptHouseRepository.existsByMember(member)) {
            throw new BusinessException(ErrorCode.MEMBER_ALREADY_REQUEST_APT_HOUSE);
        }
    }

    @Transactional
    public void deleteRegisterApt(String email) {
        Member member = memberService.findByEmail(email);
        RegisterAptHouse registerAptHouse = getRegisterAptHouse(member);

        registerAptHouse.saveDeletedTime();
    }

    @Transactional(readOnly = true)
    public MyRegisterAptHouseResponse viewMyRegisterApt(String email) {
        Member member = memberService.findByEmail(email);
        RegisterAptHouse registerAptHouse = getRegisterAptHouse(member);

        return MyRegisterAptHouseResponse.from(registerAptHouse);
    }


    @Transactional(readOnly = true)
    public AptRegisterMembersResponse viewAptRegisterMembers(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        Page<RegisterAptHouse> registerAptHouses = registerAptHouseRepository.findByApt(member.getAptHouse().getApt(), pageable);

        return AptRegisterMembersResponse.from(registerAptHouses);
    }

    @Transactional
    public void allowAptHouseMember(String email, AptHouseMemberRequest request) {
        Member adminMember = memberService.findByEmail(email);
        Member aptHouseMember = memberService.findById(request.getId());
        RegisterAptHouse registerAptHouse = getRegisterAptHouse(aptHouseMember);

        if (!adminMember.getAptHouse().getApt().equals(registerAptHouse.getApt())) {
            throw new BusinessException(ErrorCode.REGISTER_NOT_YOUR_APT);
        }

        AptHouse aptHouse = aptHouseRepository.findByAptAndDongAndHo(registerAptHouse.getApt(), registerAptHouse.getDong(),
                registerAptHouse.getHo())
            .orElseGet(() -> aptHouseRepository.save(AptHouse.createAptHouse(registerAptHouse)));

        registerAptHouse.saveDeletedTime();
        if (aptHouseMember.getAuthority().equals(Authority.ROLE_ASSOCIATE_MEMBER)) {
            aptHouseMember.changeAuthority(Authority.ROLE_REGULAR_MEMBER);
        }
        aptHouseMember.changeAptHouse(aptHouse);
    }

    @Transactional
    public void rejectAptHouseMember(String email, AptHouseMemberRequest request) {
        Member adminMember = memberService.findByEmail(email);
        Member aptHouseMember = memberService.findById(request.getId());
        RegisterAptHouse registerAptHouse = getRegisterAptHouse(aptHouseMember);

        if (!adminMember.getAptHouse().getApt().equals(registerAptHouse.getApt())) {
            throw new BusinessException(ErrorCode.REGISTER_NOT_YOUR_APT);
        }

        registerAptHouse.saveDeletedTime();
    }

    private RegisterAptHouse getRegisterAptHouse(Member Member) {
        return registerAptHouseRepository.findByMember(Member)
            .orElseThrow(() -> new BusinessException(ErrorCode.REGISTER_APT_HOUSE_NOT_FOUND_BY_MEMBER));
    }

    @Transactional(readOnly = true)
    public AptMembersResponse viewAptMembers(String email, Pageable pageable) {
        Member adminMember = memberService.findByEmail(email);

        Page<Member> aptMembers = memberService.findByAptId(adminMember.getAptHouse().getApt().getId(), pageable);

        return AptMembersResponse.from(aptMembers);
    }

    @Transactional
    public void deleteAptMember(String email, Long memberId) {

    }
}
