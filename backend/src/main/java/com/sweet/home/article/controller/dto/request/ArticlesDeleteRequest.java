package com.sweet.home.article.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Getter;

@Getter
public class ArticlesDeleteRequest {

    @JsonProperty("ids")
    private List<Long> ids;

}
