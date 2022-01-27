package com.sweet.home.message.domain;

import com.sweet.home.member.domain.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findBySendMemberAndSenderReceiverDelimiter(Member sendMember, SenderReceiverDelimiter senderReceiverDelimiter);
}
