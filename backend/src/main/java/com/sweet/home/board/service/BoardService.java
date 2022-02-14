package com.sweet.home.board.service;

import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.service.AptService;
import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final AptService aptService;

    public BoardService(BoardRepository boardRepository, AptService aptService) {
        this.boardRepository = boardRepository;
        this.aptService = aptService;
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> findAllBoards(Long aptId) {
        Apt apt = aptService.findById(aptId);
        return boardRepository.findAllByBoardStatusIsNotNullAndApt(apt).stream()
            .map(BoardResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void saveBoard(BoardSaveRequest request, Long aptId) {
        Apt apt = aptService.findById(aptId);
        Board board = Board.builder()
            .apt(apt)
            .name(request.getName())
            .description(request.getDescription())
            .build();
        boardRepository.save(board);
    }

    @Transactional(readOnly = true)
    public Board findById(Long boardId) {
        return boardRepository.findById(boardId)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID));
    }
}
