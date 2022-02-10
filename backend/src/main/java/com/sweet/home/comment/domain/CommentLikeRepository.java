package com.sweet.home.comment.domain;

import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    boolean existsByMemberAndComment(Member member, Comment comment);

    Optional<CommentLike> findByMemberAndComment(Member member, Comment comment);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment_like cl set cl.deleted_at = current_timestamp where cl.comment_id = (:id) "
        + "and cl.deleted_at is null")
    int deleteAllByComment(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment_like cl set cl.deleted_at = current_timestamp where cl.comment_id in"
        + " (select comment_id from comment c where c.article_id = (:id)) and cl.deleted_at is null")
    int deleteAllByArticle(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment_like cl set cl.deleted_at = current_timestamp where cl.comment_id in"
        + " (select comment_id from comment c where c.article_id in (select article_id from article a where a.board_id = (:id))) and cl.deleted_at is null")
    int deleteAllByBoard(@Param("id") Long id);
}
