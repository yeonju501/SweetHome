package com.sweet.home.apt.service;

import com.sweet.home.apt.controller.dto.request.AptHouseMemberRequest;
import com.sweet.home.apt.controller.dto.request.AptManagerRequest;
import com.sweet.home.apt.controller.dto.request.RegisterAptHouseRequest;
import com.sweet.home.apt.controller.dto.request.RegisterAptManagerRequest;
import com.sweet.home.apt.controller.dto.response.AptMembersResponse;
import com.sweet.home.apt.controller.dto.response.AptResponse;
import com.sweet.home.apt.controller.dto.response.RegisterAptManagersResponse;
import com.sweet.home.apt.controller.dto.response.RegisterAptMembersResponse;
import com.sweet.home.apt.controller.dto.response.MyRegisterAptHouseResponse;
import com.sweet.home.apt.controller.dto.response.MyRegisterAptManagerResponse;
import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.domain.AptHouse;
import com.sweet.home.apt.domain.AptHouseRepository;
import com.sweet.home.apt.domain.AptRepository;
import com.sweet.home.apt.domain.RegisterAptHouse;
import com.sweet.home.apt.domain.RegisterAptHouseRepository;
import com.sweet.home.apt.domain.RegisterAptManager;
import com.sweet.home.apt.domain.RegisterAptManagerRepository;
import com.sweet.home.auth.domain.Authority;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardRepository;
import com.sweet.home.board.service.BoardService;
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
    private final RegisterAptManagerRepository registerAptManagerRepository;
    private final MemberService memberService;
    private final BoardRepository boardRepository;

    public AptService(AptRepository aptRepository, AptHouseRepository aptHouseRepository,
        RegisterAptHouseRepository registerAptHouseRepository,
        RegisterAptManagerRepository registerAptManagerRepository, MemberService memberService,
        BoardRepository boardRepository) {
        this.aptRepository = aptRepository;
        this.aptHouseRepository = aptHouseRepository;
        this.registerAptHouseRepository = registerAptHouseRepository;
        this.registerAptManagerRepository = registerAptManagerRepository;
        this.memberService = memberService;
        this.boardRepository = boardRepository;
    }

    public Apt findById(Long aptId) {
        return aptRepository.findById(aptId)
            .orElseThrow(() -> new BusinessException(ErrorCode.APT_NOT_FOUND_BY_ID));
    }

    public Apt findByAptNumber(String aptNumber) {
        return aptRepository.findByAptNumber(aptNumber)
            .orElseThrow(() -> new BusinessException(ErrorCode.APT_NOT_FOUND_BY_ID));
    }

    @Transactional(readOnly = true)
    public AptResponse viewApt(Long aptId) {
        Apt apt = findById(aptId);

        return AptResponse.from(apt);
    }

    @Transactional
    public void createRegisterApt(String email, RegisterAptHouseRequest request) {
        Member member = memberService.findByEmail(email);
        Apt apt = findByAptNumber(request.getAptNumber());
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
    public RegisterAptMembersResponse viewAptRegisterMembers(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        Page<RegisterAptHouse> registerAptHouses = registerAptHouseRepository.findByApt(member.getAptHouse().getApt(), pageable);

        return RegisterAptMembersResponse.from(registerAptHouses);
    }

    @Transactional
    public void allowAptHouseMember(String email, AptHouseMemberRequest request) {
        Member adminMember = memberService.findByEmail(email);
        Member aptHouseMember = memberService.findById(request.getId());
        RegisterAptHouse registerAptHouse = getRegisterAptHouse(aptHouseMember);

        isYourAptMember(adminMember.getAptHouse().getApt(), registerAptHouse.getApt());

        AptHouse aptHouse = aptHouseRepository.findByAptAndDongAndHo(registerAptHouse.getApt(), registerAptHouse.getDong(),
                registerAptHouse.getHo())
            .orElseGet(() -> aptHouseRepository.save(
                AptHouse.createAptHouse(registerAptHouse.getApt(), registerAptHouse.getDong(), registerAptHouse.getHo())));

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

        isYourAptMember(adminMember.getAptHouse().getApt(), registerAptHouse.getApt());

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
        Member adminMember = memberService.findByEmail(email);
        Member deleteMember = memberService.findById(memberId);

        isYourAptMember(adminMember.getAptHouse().getApt(), deleteMember.getAptHouse().getApt());

        deleteMember.changeAuthority(Authority.ROLE_ASSOCIATE_MEMBER);
        deleteMember.changeAptHouse(null);
    }

    private void isYourAptMember(Apt adminApt, Apt memberApt) {
        if (!adminApt.equals(memberApt)) {
            throw new BusinessException(ErrorCode.REGISTER_NOT_YOUR_APT);
        }
    }

    @Transactional
    public void createRegisterAptManager(String email, RegisterAptManagerRequest request) {
        Member member = memberService.findByEmail(email);
        checkDuplicateRegisterManager(member);
        Apt apt = aptRepository.findByAptNumber(request.getAptNumber()).orElseGet(() -> null);

        registerAptManagerRepository.save(RegisterAptManager.createRegisterAptManager(member, request, apt));
    }

    private void checkDuplicateRegisterManager(Member member) {
        if (registerAptManagerRepository.existsByMember(member)) {
            throw new BusinessException(ErrorCode.MEMBER_ALREADY_REQUEST_APT_MANAGER);
        }
    }

    @Transactional(readOnly = true)
    public MyRegisterAptManagerResponse viewMyRegisterManager(String email) {
        Member member = memberService.findByEmail(email);
        RegisterAptManager registerAptManager = getRegisterAptManager(member);

        return MyRegisterAptManagerResponse.from(registerAptManager);
    }

    private RegisterAptManager getRegisterAptManager(Member Member) {
        return registerAptManagerRepository.findByMember(Member)
            .orElseThrow(() -> new BusinessException(ErrorCode.REGISTER_APT_MANAGER_NOT_FOUND_BY_MEMBER));
    }

    @Transactional(readOnly = true)
    public RegisterAptManagersResponse viewAptRegisterManagers(Pageable pageable) {
        return RegisterAptManagersResponse.from(registerAptManagerRepository.findAll(pageable));
    }

    @Transactional
    public void allowAptManager(AptManagerRequest request) {
        Member member = memberService.findById(request.getMemberId());
        RegisterAptManager registerAptManager = getRegisterAptManager(member);

        Apt apt = aptRepository.findByAptNumber(registerAptManager.getAptNumber())
            .orElseGet(() -> aptRepository.save(Apt.createApt(registerAptManager)));

        AptHouse aptHouse = aptHouseRepository.findByAptAndDongAndHo(apt, null, null)
            .orElseGet(() -> {
                saveDefaultBoards(apt);
                return aptHouseRepository.save(AptHouse.createAptHouse(apt, null, null));
            });

        registerAptManager.saveDeletedTime();
        member.changeAuthority(Authority.ROLE_MANAGER);
        member.changeAptHouse(aptHouse);
    }

    @Transactional
    public void saveDefaultBoards(Apt apt) {
        Board noticeBoard = Board.builder()
            .apt(apt)
            .name("공지사항")
            .description(apt.getAptName() + "의 공지사항 게시판입니다")
            .boardStatus(true)
            .build();
        boardRepository.save(noticeBoard);

        Board freeBoard = Board.builder()
            .apt(apt)
            .name("자유게시판")
            .description(apt.getAptName() + "의 자유 게시판입니다")
            .boardStatus(true)
            .build();
        boardRepository.save(freeBoard);
    }

    @Transactional
    public void rejectAptManager(AptManagerRequest request) {
        Member member = memberService.findById(request.getMemberId());
        RegisterAptManager registerAptManager = getRegisterAptManager(member);

        registerAptManager.saveDeletedTime();
    }
}
