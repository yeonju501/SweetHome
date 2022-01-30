package com.sweet.home.report.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ReportSaveRequest {

    @JsonProperty("type")
    private String type;

    @JsonProperty("content")
    private String content;
}
