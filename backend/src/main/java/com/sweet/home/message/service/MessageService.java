package com.sweet.home.message.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.domain.Message;
import com.sweet.home.message.domain.MessageContent;
import com.sweet.home.message.domain.MessageRepository;
import com.sweet.home.message.domain.SenderReceiverDelimiter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final MemberService memberService;

    public MessageService(MessageRepository messageRepository, MemberService memberService) {
        this.messageRepository = messageRepository;
        this.memberService = memberService;
    }

    // 메시지 보내기
    @Transactional
    public void sendMessage(String email, MessageSendRequest request) {
        Member sender = memberService.findByEmail(email);
        Member receiver = memberService.findByUsername(request.getReceiverName());

        // 메시지 콘텐트 만들기
        MessageContent messageContent = request.toCreateMessageContent();

        // 받는 사람의 받은 메시지함에 보관
        messageRepository.saveAll(Message.createMessage(sender, receiver, messageContent));
    }

    // 메시지 삭제
    @Transactional
    public void deleteMessage(String email, String messageId) {
        Member member = memberService.findByEmail(email);
        Message message = messageRepository.findById(Long.parseLong(messageId))
            .orElseThrow(() -> new BusinessException(ErrorCode.MESSAGE_NOT_FOUND_BY_ID));

        checkSenderOrReceiver(member, message);

        message.deleteMessage();
    }

    private void checkSenderOrReceiver(Member member, Message message) {
        if (message.getSenderReceiverDelimiter() == SenderReceiverDelimiter.SENDER) {
            checkMessagingByOwner(member, message.getSendMember());
        }
        else if ( message.getSenderReceiverDelimiter() == SenderReceiverDelimiter.RECEIVER) {
            checkMessagingByOwner(member, message.getReceiveMember());
        }
    }

    private void checkMessagingByOwner(Member member, Member messageMember){
        if(!member.getId().equals(messageMember.getId())){
            throw new BusinessException(ErrorCode.MESSAGE_NOT_MATCH_BY_MEMBER_ID);
        }
    }
}
