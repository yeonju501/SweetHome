package com.sweet.home.article.service;

import com.sweet.home.article.controller.dto.response.ArticleReportDetailResponse;
import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleReport;
import com.sweet.home.article.domain.ArticleReportRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import com.sweet.home.report.controller.dto.request.ReportSaveRequest;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleReportService {

    private final ArticleReportRepository articleReportRepository;
    private final MemberService memberService;
    private final ArticleService articleService;

    public ArticleReportService(ArticleReportRepository articleReportRepository,
        MemberService memberService, ArticleService articleService) {
        this.articleReportRepository = articleReportRepository;
        this.memberService = memberService;
        this.articleService = articleService;
    }

    @Transactional
    public void reportArticle(String email, Long articleId, ReportSaveRequest request) {
        Member member = memberService.findByEmail(email);
        Article article = articleService.findById(articleId);

        checkNotReported(member, article);
        ArticleReport articleReport = ArticleReport.builder()
            .member(member)
            .article(article)
            .content(request.getType() + " " + request.getContent())
            .build();
        articleReportRepository.save(articleReport);
    }

    private void checkNotReported(Member member, Article article) {
        if (articleReportRepository.existsByMemberAndArticle(member, article)) {
            throw new BusinessException(ErrorCode.ARTICLE_REPORT_ALREADY_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    public List<ArticleReportDetailResponse> showReports(Long articleId) {
        Article article = articleService.findById(articleId);
        return articleReportRepository.findAllByArticleOrderByIdDesc(article).stream()
            .map(ArticleReportDetailResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteAllByArticle(Long articleId) {
        articleReportRepository.deleteAllByArticle(articleId);
    }

    @Transactional
    public void deleteAllByBoard(Long boardId) {
        articleReportRepository.deleteAllByBoard(boardId);
    }
}
