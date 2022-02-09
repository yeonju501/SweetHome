package com.sweet.home.comment.domain;

import com.sweet.home.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {

    boolean existsByMemberAndComment(Member member, Comment comment);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment_report cr set cr.deleted_at = current_timestamp where cr.comment_id = (:id) "
        + "and cr.deleted_at is null")
    int deleteAllByComment(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment_report cr set cr.deleted_at = current_timestamp where cr.comment_id in "
        + "(select comment_id from comment c where c.article_id = (:id)) and cr.deleted_at is null")
    int deleteAllByArticle(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment_report cr set cr.deleted_at = current_timestamp where cr.comment_id in "
        + "(select comment_id from comment c where c.article_id in (select article_id from article a where a.board_id = (:id))) and cr.deleted_at is null")
    int deleteAllByBoard(@Param("id") Long id);
}
