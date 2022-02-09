package com.sweet.home.article.service;

import com.sweet.home.article.domain.Article;
import com.sweet.home.article.domain.ArticleRepository;
import com.sweet.home.comment.service.CommentDeleteService;
import com.sweet.home.comment.service.CommentLikeService;
import com.sweet.home.comment.service.CommentReportService;
import com.sweet.home.comment.service.CommentService;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ArticleDeleteService {

    private final ArticleRepository articleRepository;
    private final ArticleLikeService articleLikeService;
    private final ArticleReportService articleReportService;
    private final CommentDeleteService commentDeleteService;
    private final CommentLikeService commentLikeService;
    private final CommentReportService commentReportService;

    public ArticleDeleteService(ArticleRepository articleRepository,
        ArticleLikeService articleLikeService, ArticleReportService articleReportService,
        CommentDeleteService commentDeleteService, CommentLikeService commentLikeService,
        CommentReportService commentReportService) {
        this.articleRepository = articleRepository;
        this.articleLikeService = articleLikeService;
        this.articleReportService = articleReportService;
        this.commentDeleteService = commentDeleteService;
        this.commentLikeService = commentLikeService;
        this.commentReportService = commentReportService;
    }

    @Transactional
    public void cascadeDeleteArticle(Long articleId) {
        articleLikeService.deleteAllByArticle(articleId);
        articleReportService.deleteAllByArticle(articleId);
        commentDeleteService.deleteAllByArticle(articleId);
        commentLikeService.deleteAllByArticle(articleId);
        commentReportService.deleteAllByArticle(articleId);
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID));
        article.saveDeletedTime();
    }

    @Transactional
    public void deleteArticle(String email, Long articleId) {
        Article article = articleRepository.findById(articleId)
            .orElseThrow(() -> new BusinessException(ErrorCode.ARTICLE_NOT_FOUND_BY_ID));
        article.checkArticleByEmail(email);
        cascadeDeleteArticle(articleId);
    }

    @Transactional
    public void deleteAllByBoard(Long boardId) {
        articleRepository.deleteArticlesByBoard(boardId);
    }
}
