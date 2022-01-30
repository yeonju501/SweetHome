package com.sweet.home.agreement.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Agreement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agreement_id")
    private Long id;

    // 나중에 바꿔야 하는 것
//    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "building_id")
//    private Building building;
    @Column(name = "building_id")
    private String building;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "content", length = 400, nullable = false)
    private String content;

    // 동의서를 등록한 시간
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    //동의서를 삭제한 시간
    @Column(name = "deleted_at", nullable = true)
    private LocalDateTime deletedAt;

    // 동의 시작 시간
    @Column(name = "start_date")
    private LocalDateTime startDate;

    // 동의 마감 시간
    @Column(name = "end_date")
    private LocalDateTime endDate;

    protected Agreement() {
    }
}
