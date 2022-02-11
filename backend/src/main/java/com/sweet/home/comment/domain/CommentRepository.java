package com.sweet.home.comment.domain;

import com.sweet.home.article.domain.Article;
import com.sweet.home.member.domain.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @EntityGraph(attributePaths = {"article"}, type = EntityGraphType.FETCH)
    Page<Comment> findAllByParentIsNullAndBlockedAtIsNullAndArticle(Article article, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Comment> findAllByMemberAndBlockedAtIsNull(Member member, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Comment> findAllByBlockedAtIsNotNull(Pageable pageable);

    Optional<Comment> findByIdAndBlockedAtIsNotNull(Long commentId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment c set c.deleted_at = current_timestamp where c.article_id = (:id) and c.deleted_at is null")
    int deleteAllByArticle(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update comment c set c.deleted_at = current_timestamp where c.article_id in "
        + "(select article_id from article a where a.board_id = (:id)) and c.deleted_at is null")
    int deleteAllByBoard(@Param("id") Long id);
}
