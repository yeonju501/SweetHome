package com.sweet.home.board.domain;

import com.sweet.home.global.domain.BaseEntity;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

//    @ManyToOne(targetEntity = Apt.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "apt_id")
//    private Apt apt;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "description", length = 50, nullable = false)
    private String description;

    @Column(name = "board_status", nullable = true)
    private Boolean boardStatus;

    protected Board() {
    }

    @Builder
    public Board(String name, String description, Boolean boardStatus) {
        this.name = name;
        this.description = description;
        this.boardStatus = boardStatus;
    }

    public void changeName(String name) {
        if (Objects.nonNull(name)) {
            this.name = name;
        }
    }

    public void changeDescription(String description) {
        if (Objects.nonNull(description)) {
            this.description = description;
        }
    }

    public void changeBoardStatus() {
        boardStatus = true;
    }
}
