package com.sweet.home.comment.domain;

import com.sweet.home.article.domain.Article;
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

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @EntityGraph(attributePaths = {"article"}, type = EntityGraphType.FETCH)
    Page<Comment> findAllByParentIsNullAndArticle(Article article, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Comment> findAllByMember(Member member, Pageable pageable);

    @Query(nativeQuery = true, value = "select count(c.comment_id) from Comment c "
        + "where c.comment_id in (:ids) "
        + "and deleted_at is null "
        + "and c.member_id = (:member_id)")
    int countsCommentsByMemberIdAndIds(@Param("ids") List<Long> ids, @Param("member_id") Long memberId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update Comment c set c.deleted_at = current_timestamp where c.comment_id in (:ids)")
    int bulkDeleteComments(@Param("ids") List<Long> ids);
}
