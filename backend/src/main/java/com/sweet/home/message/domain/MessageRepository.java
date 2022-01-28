package com.sweet.home.message.domain;

import com.sweet.home.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @EntityGraph(attributePaths = {"receiveMember", "messageContent"}, type = EntityGraphType.FETCH)
    Page<Message> findBySendMemberAndSenderReceiverDelimiter(Member sendMember,
        SenderReceiverDelimiter delimiter, Pageable pageable);

    @EntityGraph(attributePaths = {"sendMember", "messageContent"}, type = EntityGraphType.FETCH)
    Page<Message> findByReceiveMemberAndSenderReceiverDelimiter(Member receiveMember, SenderReceiverDelimiter delimiter,
        Pageable pageable);
}
