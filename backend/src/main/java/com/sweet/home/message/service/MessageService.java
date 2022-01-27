package com.sweet.home.message.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.controller.dto.response.MessageDetailResponse;
import com.sweet.home.message.controller.dto.response.MessageResponse;
import com.sweet.home.message.domain.Message;
import com.sweet.home.message.domain.MessageContent;
import com.sweet.home.message.domain.MessageRepository;
import com.sweet.home.message.domain.SenderReceiverDelimiter;
import java.util.List;
import java.util.stream.Collectors;
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

        MessageContent messageContent = request.toCreateMessageContent();

        messageRepository.saveAll(Message.createMessage(sender, receiver, messageContent));
    }

    // 메시지 삭제
    @Transactional
    public void deleteMessage(String email, Long messageId) {
        Member member = memberService.findByEmail(email);
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new BusinessException(ErrorCode.MESSAGE_NOT_FOUND_BY_ID));

        message.checkSenderOrReceiver(member);

        message.deleteMessage();
    }

    // 메시지 상세 조회
    @Transactional
    public MessageDetailResponse viewMessageDetail(String email, Long messageId) {
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new BusinessException(ErrorCode.MESSAGE_NOT_FOUND_BY_ID));

        message.checkMessageOwnerByEmail(email);

        message.readMessage(email);

        return MessageDetailResponse.from(message);
    }

    // 받은 메시지 조회
    @Transactional(readOnly = true)
    public List<MessageResponse> viewSendMessages(String email) {
        Member member = memberService.findByEmail(email);
        return messageRepository.findBySendMemberAndSenderReceiverDelimiter(member, SenderReceiverDelimiter.SENDER).stream()
            .map(MessageResponse::from)
            .collect(Collectors.toList());
    }

    // 보낸 메시지 조회
    @Transactional(readOnly = true)
    public List<MessageResponse> viewReceiveMessages(String email) {
        Member member = memberService.findByEmail(email);
        return messageRepository.findByReceiveMemberAndSenderReceiverDelimiter(member, SenderReceiverDelimiter.RECEIVER).stream()
            .map(MessageResponse::from)
            .collect(Collectors.toList());
    }
}
