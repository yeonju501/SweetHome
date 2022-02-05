package com.sweet.home.apt.service;

import com.sweet.home.apt.domain.Apt;
import com.sweet.home.apt.domain.AptRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import org.springframework.stereotype.Service;

@Service
public class AptService {
    private final AptRepository aptRepository;

    public AptService(AptRepository aptRepository) {
        this.aptRepository = aptRepository;
    }

    public Apt findById(Long aptId){
        return aptRepository.findById(aptId)
            .orElseThrow(() -> new BusinessException(ErrorCode.APT_NOT_FOUND_BY_ID));
    }
}
