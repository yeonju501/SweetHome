package com.sweet.home.board.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.board.domain.Board;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class BoardsResponse {

    @JsonProperty("boards")
    private List<BoardResponse> boards;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    private int currentPageCount;

    protected BoardsResponse() {

    }

    public BoardsResponse(List<BoardResponse> boards, int totalPageCount, int currentPageCount) {
        this.boards = boards;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static BoardsResponse from(Page<Board> boards){
        return new BoardsResponse(
            boards.stream()
                .map(BoardResponse::from)
                .collect(Collectors.toList()),
            boards.getTotalPages(),
            boards.getNumber()
        );
    }
}
