package com.playpower.staybnb.service;

import com.playpower.staybnb.model.QuoteRequest;
import com.playpower.staybnb.model.QuoteResponse;
import org.springframework.stereotype.Service;
import java.time.temporal.ChronoUnit;

@Service
public class QuoteService {
    private static final String LISTING_ID = "candolim-coastal-retreat";
    private static final int MAX_GUESTS = 4;
    private static final int NIGHTLY_RATE = 5500;
    private static final int CLEANING_FEE = 500;
    private static final int SERVICE_FEE = 600;

    public QuoteResponse quote(QuoteRequest request) {
        if (!LISTING_ID.equals(request.listingId())) {
            throw new IllegalArgumentException("Unknown listing.");
        }
        if (request.checkIn() == null || request.checkOut() == null ||
                !request.checkOut().isAfter(request.checkIn())) {
            throw new IllegalArgumentException("Checkout must be after check-in.");
        }
        if (request.guests() < 1 || request.guests() > MAX_GUESTS) {
            throw new IllegalArgumentException("Guest count must be between 1 and " + MAX_GUESTS + ".");
        }
        long nights = ChronoUnit.DAYS.between(request.checkIn(), request.checkOut());
        long subtotal = nights * NIGHTLY_RATE;
        long total = subtotal + CLEANING_FEE + SERVICE_FEE;
        return new QuoteResponse(request.listingId(), nights, request.guests(),
                subtotal, CLEANING_FEE, SERVICE_FEE, total,
                "Estimate only. No reservation or payment was created.");
    }
}
