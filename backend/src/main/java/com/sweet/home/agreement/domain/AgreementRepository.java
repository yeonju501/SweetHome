package com.sweet.home.agreement.domain;

import com.sweet.home.apt.domain.Apt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgreementRepository extends JpaRepository<Agreement, Long> {

    Page<Agreement> findByApt(Apt apt, Pageable pageable);
}
