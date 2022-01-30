package com.sweet.home.comment.domain;

import com.sweet.home.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    boolean existsByMemberAndComment(Member member, Comment comment);
}
