package com.sweet.home.board.service;

import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardsResponse;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardAdminService {

    private final BoardRepository boardRepository;
    private final BoardDeleteService boardDeleteService;

    public BoardAdminService(BoardRepository boardRepository, BoardDeleteService boardDeleteService) {
        this.boardRepository = boardRepository;
        this.boardDeleteService = boardDeleteService;
    }

    @Transactional(readOnly = true)
    public BoardsResponse showUnapprovedBoards(Pageable pageable) {
        Page<Board> boards = boardRepository.findAllByBoardStatusIsNull(pageable);
        return BoardsResponse.from(boards);
    }

    @Transactional
    public void createBoard(BoardSaveRequest request) {
        Board board = Board.builder()
            .name(request.getName())
            .description(request.getDescription())
            .boardStatus(true)
            .build();
        boardRepository.save(board);
    }

    @Transactional
    public void approveBoard(Long boardId) {
        Board board = boardRepository.findByIdAndBoardStatusIsNull(boardId)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID_AND_BOARD_STATUS));

        board.changeBoardStatus();
    }

    @Transactional
    public void disapproveBoard(Long boardId){
        Board board = boardRepository.findByIdAndBoardStatusIsNull(boardId)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID_AND_BOARD_STATUS));

        board.saveDeletedTime();
    }

    @Transactional
    public void updateBoard(Long boardId, BoardSaveRequest request) {
        Board board = boardRepository.findById(boardId)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID));

        board.changeName(request.getName());
        board.changeDescription(request.getDescription());
    }

    @Transactional
    public void deleteBoard(Long boardId){
        boardDeleteService.cascadeDeleteBoard(boardId);
    }
}
