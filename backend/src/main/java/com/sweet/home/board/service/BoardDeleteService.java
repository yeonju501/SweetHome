package com.sweet.home.board.service;

import com.sweet.home.article.service.ArticleDeleteService;
import com.sweet.home.article.service.ArticleLikeService;
import com.sweet.home.article.service.ArticleReportService;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardRepository;
import com.sweet.home.comment.service.CommentDeleteService;
import com.sweet.home.comment.service.CommentLikeService;
import com.sweet.home.comment.service.CommentReportService;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardDeleteService {

    private final BoardRepository boardRepository;
    private final BoardFavoriteService boardFavoriteService;
    private final ArticleDeleteService articleDeleteService;
    private final ArticleLikeService articleLikeService;
    private final ArticleReportService articleReportService;
    private final CommentDeleteService commentDeleteService;
    private final CommentLikeService commentLikeService;
    private final CommentReportService commentReportService;

    public BoardDeleteService(BoardRepository boardRepository, BoardFavoriteService boardFavoriteService,
        ArticleDeleteService articleDeleteService, ArticleLikeService articleLikeService,
        ArticleReportService articleReportService, CommentDeleteService commentDeleteService,
        CommentLikeService commentLikeService, CommentReportService commentReportService) {
        this.boardRepository = boardRepository;
        this.boardFavoriteService = boardFavoriteService;
        this.articleDeleteService = articleDeleteService;
        this.articleLikeService = articleLikeService;
        this.articleReportService = articleReportService;
        this.commentDeleteService = commentDeleteService;
        this.commentLikeService = commentLikeService;
        this.commentReportService = commentReportService;
    }

    @Transactional
    public void cascadeDeleteBoard(Long boardId) {
        boardFavoriteService.deleteAllByBoard(boardId);
        articleDeleteService.deleteAllByBoard(boardId);
        articleLikeService.deleteAllByBoard(boardId);
        articleReportService.deleteAllByBoard(boardId);
        commentDeleteService.deleteAllByBoard(boardId);
        commentLikeService.deleteAllByBoard(boardId);
        commentReportService.deleteAllByBoard(boardId);
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID));
        board.saveDeletedTime();
    }
}
