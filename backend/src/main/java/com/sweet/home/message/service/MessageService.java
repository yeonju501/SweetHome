package com.sweet.home.message.service;

import static com.sweet.home.message.domain.SenderReceiverDelimiter.RECEIVER;
import static com.sweet.home.message.domain.SenderReceiverDelimiter.SENDER;

import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.controller.dto.response.AllCountResponse;
import com.sweet.home.member.controller.dto.response.CountsResponse;
import com.sweet.home.member.controller.dto.response.UnreadCountResponse;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.message.controller.dto.request.MessageDeleteRequest;
import com.sweet.home.message.controller.dto.request.MessageSendRequest;
import com.sweet.home.message.controller.dto.response.MessageDetailResponse;
import com.sweet.home.message.controller.dto.response.MessagesResponse;
import com.sweet.home.message.domain.Message;
import com.sweet.home.message.domain.MessageContent;
import com.sweet.home.message.domain.MessageRepository;
import com.sweet.home.message.domain.SenderReceiverDelimiter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        message.saveDeletedTime();
    }

    // 보낸 메시지 다중 삭제
    @Transactional
    public void deleteSendMessages(String email, MessageDeleteRequest request) {
        Member member = memberService.findByEmail(email);

        if (messageRepository.countsSendMessagesByMemberIdAndIds(request.getIds(), member.getId()) != request.getIds().size()) {
            throw new BusinessException(ErrorCode.MESSAGE_NOT_FOUND_BY_ID);
        }

        messageRepository.bulkDeleteMessages(request.getIds());
    }

    // 받은 메시지 다중 삭제
    @Transactional
    public void deleteReceiveMessages(String email, MessageDeleteRequest request) {
        Member member = memberService.findByEmail(email);

        if (messageRepository.countsReceiveMessagesByMemberIdAndIds(request.getIds(), member.getId()) != request.getIds()
            .size()) {
            throw new BusinessException(ErrorCode.MESSAGE_NOT_FOUND_BY_ID);
        }

        messageRepository.bulkDeleteMessages(request.getIds());
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
    public MessagesResponse viewSendMessages(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        Page<Message> messages = messageRepository.findBySendMemberAndSenderReceiverDelimiter(member, SENDER, pageable);

        return MessagesResponse.from(messages);
    }

    // 보낸 메시지 조회
    @Transactional(readOnly = true)
    public MessagesResponse viewReceiveMessages(Pageable pageable, String email) {
        Member member = memberService.findByEmail(email);

        Page<Message> messages = messageRepository.findByReceiveMemberAndSenderReceiverDelimiter(member, RECEIVER, pageable);

        return MessagesResponse.from(messages);
    }

    @Transactional(readOnly = true)
    public UnreadCountResponse getUnreadReceiveMessagesCount(String email) {
        Member member = memberService.findByEmail(email);

        return UnreadCountResponse.from(unreadReceiveMessagesCount(member));
    }

    @Transactional(readOnly = true)
    public AllCountResponse getAllReceiveMessagesCount(String email) {
        Member member = memberService.findByEmail(email);

        return AllCountResponse.from(allReceiveMessagesCount(member, RECEIVER));
    }

    @Transactional(readOnly = true)
    public CountsResponse getReceiveMessagesCounts(String email) {
        Member member = memberService.findByEmail(email);

        return CountsResponse.from(unreadReceiveMessagesCount(member), allReceiveMessagesCount(member, RECEIVER));
    }

    @Transactional(readOnly = true)
    public AllCountResponse getAllSendMessagesCount(String email) {
        Member member = memberService.findByEmail(email);

        return AllCountResponse.from(allSendMessagesCount(member, SENDER));
    }

    private Long unreadReceiveMessagesCount(Member member) {
        return messageRepository.countsUnreadMessagesByReceiveMemberId(member.getId());
    }

    private Long allReceiveMessagesCount(Member member, SenderReceiverDelimiter delimiter) {
        return messageRepository.countByReceiveMemberAndSenderReceiverDelimiter(member, delimiter);
    }

    private Long allSendMessagesCount(Member member, SenderReceiverDelimiter delimiter) {
        return messageRepository.countBySendMemberAndSenderReceiverDelimiter(member, delimiter);
    }
}
