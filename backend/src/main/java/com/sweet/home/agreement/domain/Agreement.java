package com.sweet.home.agreement.domain;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
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

    @Builder
//    public Agreement(Building building, String title, String content, LocalDateTime startDate, LocalDateTime endDate) {
    public Agreement(String building, String title, String content, LocalDateTime startDate, LocalDateTime endDate) {
        this.building = building;
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static Agreement createAgreement(String building, AgreementRequest request) {
        return Agreement.builder()
            .building(building)
            .title(request.getTitle())
            .content(request.getContent())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .build();
    }

    public void deleteAgreement() {
        this.deletedAt = LocalDateTime.now();
    }

    public void changeTitle(String title){
        this.title = title;
    }

    public void changeContent(String content) {
        this.content = content;
    }

    public void changeStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public void changeEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

//    public void checkBuildingManager(Building building){
//        if (!building.equals(building)){
    public void checkBuildingManager(String building){
        if (!building.equals(building)){
            throw new BusinessException(ErrorCode.AGREEMENT_NOT_YOUR_APARTMENT);
        }
    }
}
