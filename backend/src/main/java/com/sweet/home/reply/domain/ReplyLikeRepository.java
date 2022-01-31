package com.sweet.home.reply.domain;

import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyLikeRepository extends JpaRepository<ReplyLike, Long> {

    boolean existsByMemberAndReply(Member member, Reply reply);

    Optional<ReplyLike> findByMemberAndReply(Member member, Reply reply);
}
