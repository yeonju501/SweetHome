package com.sweet.home.message.domain;

import com.sweet.home.member.domain.Member;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @EntityGraph(attributePaths = {"receiveMember", "messageContent"}, type = EntityGraphType.FETCH)
    Page<Message> findBySendMemberAndSenderReceiverDelimiter(Member sendMember,
        SenderReceiverDelimiter delimiter, Pageable pageable);

    @EntityGraph(attributePaths = {"sendMember", "messageContent"}, type = EntityGraphType.FETCH)
    Page<Message> findByReceiveMemberAndSenderReceiverDelimiter(Member receiveMember, SenderReceiverDelimiter delimiter,
        Pageable pageable);

    @Query(nativeQuery = true, value = "select count(m.message_id) from Message m "
        + "where m.message_id in (:ids) "
        + "and m.deleted_at is null "
        + "and ((:memberId) = m.receive_member_id and m.sender_receiver_delimiter = 'RECEIVER')")
    int countsReceiveMessagesByMemberIdAndIds(@Param("ids") List<Long> ids, @Param("memberId") Long memberId);

    @Query(nativeQuery = true, value = "select count(m.message_id) from Message m "
        + "where m.message_id in (:ids) "
        + "and m.deleted_at is null "
        + "and ((:memberId) = m.send_member_id and m.sender_receiver_delimiter = 'SENDER')")
    int countsSendMessagesByMemberIdAndIds(@Param("ids") List<Long> ids, @Param("memberId") Long memberId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update Message m set m.deleted_at = current_timestamp where m.message_id in (:ids)")
    int bulkDeleteMessages(@Param("ids") List<Long> ids);

    @Query(nativeQuery = true, value = "select count(*) from message m "
        + "join message_content mc on m.message_content_id = mc. message_content_id "
        + "where mc.read_at is null "
        + "and m.receive_member_id = (:receiveMemberId) "
        + "and m.sender_receiver_delimiter = 'RECEIVER'")
    Long countsUnreadMessagesByReceiveMemberId(@Param("receiveMemberId") Long receiveMemberId);

    Long countByReceiveMemberAndSenderReceiverDelimiter(Member receiveMember, SenderReceiverDelimiter delimiter);

    Long countBySendMemberAndSenderReceiverDelimiter(Member sendMember, SenderReceiverDelimiter delimiter);
}
