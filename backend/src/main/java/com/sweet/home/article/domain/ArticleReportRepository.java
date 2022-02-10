package com.sweet.home.article.domain;

import com.sweet.home.article.controller.dto.response.ArticleReportDetailResponse;
import com.sweet.home.member.domain.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ArticleReportRepository extends JpaRepository<ArticleReport, Long> {

    boolean existsByMemberAndArticle(Member member, Article article);

    List<ArticleReport> findAllByArticleOrderByIdDesc(Article article);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update article_report ar set ar.deleted_at = current_timestamp where ar.article_id = (:id) and ar.deleted_at is null")
    int deleteAllByArticle(@Param("id") Long id);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = "update article_report ar set ar.deleted_at = current_timestamp where ar.article_id in (select article_id from article a where a.board_id = (:id)) and ar.deleted_at is null")
    int deleteAllByBoard(@Param("id") Long id);
}
