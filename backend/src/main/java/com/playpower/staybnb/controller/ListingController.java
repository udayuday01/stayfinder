package com.playpower.staybnb.controller;

import com.playpower.staybnb.model.Listing;
import com.playpower.staybnb.service.ListingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/listing")
public class ListingController {
    private final ListingService listingService;
    public ListingController(ListingService listingService) { this.listingService = listingService; }

    @GetMapping
    public Listing getListing() { return listingService.getListing(); }
}
