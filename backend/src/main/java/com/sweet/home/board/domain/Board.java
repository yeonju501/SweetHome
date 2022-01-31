package com.sweet.home.board.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

//    @ManyToOne(targetEntity = Building.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "apt_id")
//    private Building apt;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "description", length = 50, nullable = false)
    private String description;

    @Column(name = "board_status", nullable = true)
    private Boolean boardStatus;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = true)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    protected Board() {
    }

    @Builder
    public Board(String name, String description, Boolean boardStatus) {
        this.name = name;
        this.description = description;
        this.boardStatus = boardStatus;
    }
}
