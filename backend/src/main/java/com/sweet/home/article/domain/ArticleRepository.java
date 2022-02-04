package com.sweet.home.article.domain;

import com.sweet.home.board.domain.Board;
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

public interface ArticleRepository extends JpaRepository<Article, Long> {

    @EntityGraph(attributePaths = {"board"}, type = EntityGraphType.FETCH)
    Page<Article> findAllByBoard(Board board, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Article> findAllByMember(Member member, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Article> findAllByBlockedAtIsNotNull(Pageable pageable);

    @Query(nativeQuery = true, value = "select count(a.article_id) from Article a "
        + "where a.article_id in (:ids) "
        + "and a.deleted_at is null "
        + "and a.member_id = (:memberId)")
    int countsArticlesByMemberIdAndIds(@Param("ids") List<Long> ids, @Param("memberId") Long memberId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update Article a set a.deleted_at = current_timestamp where a.article_id in (:ids)")
    int bulkDeleteArticles(@Param("ids") List<Long> ids);
}
