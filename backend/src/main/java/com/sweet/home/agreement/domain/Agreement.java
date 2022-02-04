package com.sweet.home.agreement.domain;

import com.sweet.home.agreement.controller.dto.request.AgreementRequest;
import com.sweet.home.apt.domain.Apt;
import com.sweet.home.global.domain.BaseEntity;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Agreement extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agreement_id")
    private Long id;

    @ManyToOne(targetEntity = Apt.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "apt_id")
    private Apt apt;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "content", length = 400, nullable = false)
    private String content;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    protected Agreement() {
    }

    @Builder
    public Agreement(Apt apt, String title, String content, LocalDateTime startDate, LocalDateTime endDate) {
        this.apt = apt;
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public static Agreement createAgreement(Apt apt, AgreementRequest request) {
        return Agreement.builder()
            .apt(apt)
            .title(request.getTitle())
            .content(request.getContent())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .build();
    }

    public void changeTitle(String title) {
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

    public void checkAptRelationship(Apt apt) {
        if (!this.apt.equals(apt)) {
            throw new BusinessException(ErrorCode.AGREEMENT_NOT_YOUR_APARTMENT);
        }
    }
}
