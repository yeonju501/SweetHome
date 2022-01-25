package com.sweet.home.message.domain;

public enum SenderReceiverDelimiter {
    SENDER("sender"),
    RECEIVER("receiver");

    private final String delimiter;

    SenderReceiverDelimiter(String delimiter) {
        this.delimiter = delimiter;
    }

    public String getDelimiter() {
        return delimiter;
    }
}