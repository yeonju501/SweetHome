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

    @Query(nativeQuery = true, value = "select count(m.id) > 0 from Message m where m.id in (:ids)")
    boolean existsByIds(@Param("ids") List<Long> ids);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update Message m set m.deletedAt = current_timestamp where m.id in (:ids)")
    int bulkDeleteMessages(@Param("ids") List<Long> ids);
}
