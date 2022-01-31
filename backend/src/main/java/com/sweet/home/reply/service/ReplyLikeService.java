package com.sweet.home.reply.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.reply.domain.Reply;
import com.sweet.home.reply.domain.ReplyLike;
import com.sweet.home.reply.domain.ReplyLikeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReplyLikeService {

    private final ReplyLikeRepository replyLikeRepository;
    private final MemberService memberService;
    private final ReplyService replyService;

    public ReplyLikeService(ReplyLikeRepository replyLikeRepository, MemberService memberService,
        ReplyService replyService) {
        this.replyLikeRepository = replyLikeRepository;
        this.memberService = memberService;
        this.replyService = replyService;
    }

    @Transactional
    public void likeReply(String email, Long replyId) {
        Member member = memberService.findByEmail(email);
        Reply reply = replyService.findById(replyId);

        checkNotLiked(member, reply);
        ReplyLike replyLike = ReplyLike.builder()
            .member(member)
            .reply(reply)
            .build();
        replyLikeRepository.save(replyLike);
    }

    private void checkNotLiked(Member member, Reply reply) {
        if (replyLikeRepository.existsByMemberAndReply(member, reply)) {
            throw new BusinessException(ErrorCode.REPLY_LIKE_ALREADY_EXISTS);
        }
    }

    @Transactional
    public void deleteReplyLike(String email, Long replyId) {
        Member member = memberService.findByEmail(email);
        Reply reply = replyService.findById(replyId);

        ReplyLike replyLike = replyLikeRepository.findByMemberAndReply(member, reply)
            .orElseThrow(() -> new BusinessException(ErrorCode.REPLY_LIKE_NOT_FOUND));
        replyLikeRepository.delete(replyLike);
    }
}
