package com.sweet.home.message.service;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.domain.MemberRepository;
import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.domain.Message;
import com.sweet.home.message.domain.MessageContent;
import com.sweet.home.message.domain.MessageContentRepository;
import com.sweet.home.message.domain.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
    private final MessageContentRepository messageContentRepository;

    public MessageService(MessageRepository messageRepository, MemberRepository memberRepository, MessageContentRepository messageContentRepository) {
        this.messageRepository = messageRepository;
        this.memberRepository = memberRepository;
        this.messageContentRepository = messageContentRepository;
    }

    // 메세지 보내기
    @Transactional
    public Long sendMessage(MessageSendRequest request) {
        Member sender = memberRepository.findByUsername(request.getSender())
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_USERNAME));;
        Member receiver = memberRepository.findByUsername(request.getReceiver())
                .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_USERNAME));;

        // 메세지 콘텐트 만들기
        MessageContent messageContent = request.toCreateMessageContent();
        messageContentRepository.save(messageContent);

        // 보낸 메시지함에 보관
        Message message = Message.createSendMessage(sender, receiver, messageContent);

        // 받는 사람의 받은 메시지함에 보관
        messageRepository.save(Message.createReceiveMessage(sender, receiver, messageContent));

        return messageRepository.save(message).getId();
    }
}
