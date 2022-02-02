package com.sweet.home.reply.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.reply.domain.Reply;
import com.sweet.home.reply.domain.ReplyReport;
import com.sweet.home.reply.domain.ReplyReportRepository;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReplyReportService {

    private final ReplyReportRepository replyReportRepository;
    private final MemberService memberService;
    private final ReplyService replyService;

    public ReplyReportService(ReplyReportRepository replyReportRepository, MemberService memberService,
        ReplyService replyService) {
        this.replyReportRepository = replyReportRepository;
        this.memberService = memberService;
        this.replyService = replyService;
    }

    @Transactional
    public void reportReply(String email, Long replyId, ReportSaveRequest request) {
        Member member = memberService.findByEmail(email);
        Reply reply = replyService.findById(replyId);

        checkNotReported(member, reply);
        ReplyReport replyReport = ReplyReport.builder()
            .member(member)
            .reply(reply)
            .content(request.getType() + " " + request.getContent())
            .build();
        replyReportRepository.save(replyReport);

        reply.checkTotalReports();
    }

    private void checkNotReported(Member member, Reply reply) {
        if(replyReportRepository.existsByMemberAndReply(member, reply)) {
            throw new BusinessException(ErrorCode.REPLY_REPORT_ALREADY_EXISTS);
        }
    }
}
