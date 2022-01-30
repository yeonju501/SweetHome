package com.sweet.home.report.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sweet.home.report.domain.ReportType;

public class ReportTypeResponse {

    @JsonProperty("content")
    private String content;

    protected ReportTypeResponse() {
    }

    public ReportTypeResponse(String content){
        this.content = content;
    }

    public static ReportTypeResponse from(ReportType reportType){
        return new ReportTypeResponse(
            reportType.getContent()
        );
    }

}
