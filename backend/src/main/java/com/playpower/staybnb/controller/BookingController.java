package com.playpower.staybnb.controller;

import com.playpower.staybnb.model.QuoteRequest;
import com.playpower.staybnb.model.QuoteResponse;
import com.playpower.staybnb.service.QuoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final QuoteService quoteService;
    public BookingController(QuoteService quoteService) { this.quoteService = quoteService; }

    @PostMapping("/quote")
    public QuoteResponse quote(@Valid @RequestBody QuoteRequest request) {
        try {
            return quoteService.quote(request);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage());
        }
    }
}
