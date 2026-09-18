package com.playpower.staybnb.service;

import com.playpower.staybnb.model.Listing;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ListingService {
    private final Listing listing = new Listing(
        "candolim-coastal-retreat",
        "Bright coastal apartment near the heart of Candolim",
        "Candolim, Goa, India",
        "Entire rental unit · Hosted by Ananya",
        4, 2, 2, 2, 4.92, 128, true, 5500, 500, 600,
        new Listing.Host("Ananya", 5, "A"),
        "Unwind in a thoughtfully designed coastal apartment with warm natural textures, comfortable spaces, and an easygoing Goan feel. Spend slow mornings over coffee, explore nearby beaches, and return to a calm place to recharge.",
        List.of(
            new Listing.Amenity("bi-wifi", "Wifi"),
            new Listing.Amenity("bi-snow", "Air conditioning"),
            new Listing.Amenity("bi-cup-hot", "Kitchen"),
            new Listing.Amenity("bi-car-front", "Free parking"),
            new Listing.Amenity("bi-tv", "TV"),
            new Listing.Amenity("bi-water", "Pool access"),
            new Listing.Amenity("bi-camera-video", "Security cameras"),
            new Listing.Amenity("bi-washing-machine", "Washer")
        ),
        List.of(
            new Listing.Photo("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90", "Sunlit contemporary living room", "Living room"),
            new Listing.Photo("https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85", "Calm bedroom with soft neutral bedding", "Bedroom"),
            new Listing.Photo("https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85", "Warm modern interior", "Living room"),
            new Listing.Photo("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85", "Bright open-plan living space", "Living room"),
            new Listing.Photo("https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85", "Elegant vacation home interior", "Dining area"),
            new Listing.Photo("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85", "Minimal, comfortable interior", "Bedroom")
        ),
        List.of("Check-in after 2:00 PM", "Checkout before 11:00 AM", "4 guests maximum", "No smoking")
    );

    public Listing getListing() { return listing; }
}
