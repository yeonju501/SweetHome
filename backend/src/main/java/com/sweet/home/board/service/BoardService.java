package com.sweet.home.board.service;

//import com.sweet.home.board.controller.dto.request.BoardFavoriteRequest;

import com.sweet.home.board.controller.dto.request.BoardFavoriteRequest;
import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardFavorite;
import com.sweet.home.board.domain.BoardFavoriteRepository;
import com.sweet.home.board.domain.BoardRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final MemberService memberService;
    private final BoardFavoriteRepository boardFavoriteRepository;

    public BoardService(BoardRepository boardRepository, MemberService memberService,
        BoardFavoriteRepository boardFavoriteRepository) {
        this.boardRepository = boardRepository;
        this.memberService = memberService;
        this.boardFavoriteRepository = boardFavoriteRepository;
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> findAllBoards() {
        return boardRepository.findAll().stream()
            .map(BoardResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void saveBoard(BoardSaveRequest request) {
        Board board = Board.builder()
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

    @Transactional
    public void addFavorite(String email, BoardFavoriteRequest request) {
        Board board = boardRepository.findById(request.getId())
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID));
        Member member = memberService.findByEmail(email);
        BoardFavorite boardFavorite = BoardFavorite.builder()
            .board(board)
            .member(member)
            .build();
        boardFavoriteRepository.save(boardFavorite);
    }
}
