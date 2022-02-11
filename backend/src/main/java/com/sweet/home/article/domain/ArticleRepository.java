package com.sweet.home.article.domain;

import com.sweet.home.board.domain.Board;
import com.sweet.home.member.domain.Member;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
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
    Page<Article> findAllByBoardAndBlockedAtIsNull(Board board, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Article> findAllByMemberAndBlockedAtIsNull(Member member, Pageable pageable);

    @EntityGraph(attributePaths = {"member"}, type = EntityGraphType.FETCH)
    Page<Article> findAllByBlockedAtIsNotNull(Pageable pageable);

    @EntityGraph(attributePaths = {"board"}, type = EntityGraphType.FETCH)
    List<Article> findByCreatedAtBetweenOrderByTotalLikesDesc(LocalDateTime start, LocalDateTime end, Pageable pageable);

    Optional<Article> findByIdAndBlockedAtIsNotNull(Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update article a set a.deleted_at = current_timestamp where a.board_id = (:id) and a.deleted_at is null")
    int deleteArticlesByBoard(@Param("id") Long id);


}
