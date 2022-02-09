package com.sweet.home.article.domain;

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

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long> {

    boolean existsByMemberAndArticle(Member member, Article article);

    Optional<ArticleLike> findByMemberAndArticle(Member member, Article article);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<ArticleLike> findAllByMember(Member member, Pageable pageable);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update article_like al set al.deleted_at = current_timestamp where al.article_id = (:id) and al.deleted_at is null")
    int deleteAllByArticle(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update article_like al set al.deleted_at = current_timestamp where al.article_id in (select article_id from article a where a.board_id = (:id)) and al.deleted_at is null")
    int deleteAllByBoard(@Param("id") Long id);
}
