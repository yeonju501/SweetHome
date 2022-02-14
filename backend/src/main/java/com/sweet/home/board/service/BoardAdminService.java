package com.sweet.home.board.service;

import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.service.AptService;
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
    private final AptService aptService;

    public BoardAdminService(BoardRepository boardRepository, BoardDeleteService boardDeleteService,
        AptService aptService) {
        this.boardRepository = boardRepository;
        this.boardDeleteService = boardDeleteService;
        this.aptService = aptService;
    }

    @Transactional(readOnly = true)
    public BoardsResponse showUnapprovedBoards(Long aptId, Pageable pageable) {
        Apt apt = aptService.findById(aptId);
        Page<Board> boards = boardRepository.findAllByBoardStatusIsNullAndApt(pageable, apt);
        return BoardsResponse.from(boards);
    }

    @Transactional
    public void createBoard(Long aptId, BoardSaveRequest request) {
        Apt apt = aptService.findById(aptId);
        Board board = Board.builder()
            .apt(apt)
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
