package com.sweet.home.agreement.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgreementRepository extends JpaRepository<Agreement, Long> {
    Page<Agreement> findByBuilding(String building, Pageable pageable);
}
