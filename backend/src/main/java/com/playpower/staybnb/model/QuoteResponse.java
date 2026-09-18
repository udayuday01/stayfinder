package com.playpower.staybnb.model;

public record QuoteResponse(
        String listingId, long nights, int guests,
        long nightlySubtotal, int cleaningFee, int serviceFee, long total,
        String message
) {}
