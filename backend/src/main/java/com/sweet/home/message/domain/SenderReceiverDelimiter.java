package com.sweet.home.message.domain;

public enum SenderReceiverDelimiter {
    sender("sender"),
    receiver("receiver");

    private final String delimiter;

    SenderReceiverDelimiter(String delimiter) {
        this.delimiter = delimiter;
    }

    public String getDelimiter() {
        return delimiter;
    }
}