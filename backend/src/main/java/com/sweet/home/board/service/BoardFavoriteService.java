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
        Member member = memberService.findByEmail(email);
        Board board = boardService.findById(boardId);

        checkNotAdded(member, board);
        BoardFavorite boardFavorite = BoardFavorite.builder()
            .board(board)
            .member(member)
            .build();
        boardFavoriteRepository.save(boardFavorite);
    }

    private void checkNotAdded(Member member, Board board) {
        if (boardFavoriteRepository.existsByMemberAndBoard(member, board)) {
            throw new BusinessException(ErrorCode.BOARD_FAVORITE_ALREADY_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    public boolean showFavoriteStatus(String email, Long boardId) {
        Member member = memberService.findByEmail(email);
        Board board = boardService.findById(boardId);
        return boardFavoriteRepository.existsByMemberAndBoard(member, board);
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> findAllFavorites(String email) {
        Member member = memberService.findByEmail(email);
        return boardFavoriteRepository.findAllByMember(member).stream()
            .map(boardFavorite -> BoardResponse.from(boardFavorite.getBoard()))
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteFavorite(String email, Long boardId) {
        Member member = memberService.findByEmail(email);
        Board board = boardService.findById(boardId);
        BoardFavorite boardFavorite = boardFavoriteRepository.findByMemberAndBoard(member, board)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_FAVORITE_NOT_FOUND));
        boardFavorite.saveDeletedTime();
    }

    @Transactional
    public void deleteAllByBoard(Long boardId){
        boardFavoriteRepository.deleteBoardFavoritesByBoard(boardId);
    }
}
