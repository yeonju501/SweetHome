package com.sweet.home.board.service;

import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardFavorite;
import com.sweet.home.board.domain.BoardFavoriteRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import com.sweet.home.member.domain.Member;
import com.sweet.home.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardFavoriteService {

    private final BoardFavoriteRepository boardFavoriteRepository;
    private final MemberService memberService;
    private final BoardService boardService;

    public BoardFavoriteService(BoardFavoriteRepository boardFavoriteRepository,
        MemberService memberService, BoardService boardService) {
        this.boardFavoriteRepository = boardFavoriteRepository;
        this.memberService = memberService;
        this.boardService = boardService;
    }

    @Transactional
    public void saveFavorite(String email, Long boardId) {
        Board board = boardService.findById(boardId);
        Member member = memberService.findByEmail(email);
        BoardFavorite boardFavorite = BoardFavorite.builder()
            .board(board)
            .member(member)
            .build();
        boardFavoriteRepository.save(boardFavorite);
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> findAllFavorites(String email) {
        Member member = memberService.findByEmail(email);
        return boardFavoriteRepository.findAllByMember(member)
            .stream().map(boardFavorite -> BoardResponse.from(boardFavorite.getBoard()))
            .collect(Collectors.toList());
    }
}
