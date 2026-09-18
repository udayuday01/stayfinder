package com.playpower.staybnb.model;

import java.util.List;

public record Listing(
        String id, String title, String location, String subtitle,
        int guests, int bedrooms, int beds, int baths,
        double rating, int reviews, boolean superhost,
        int pricePerNight, int cleaningFee, int serviceFee,
        Host host, String description, List<Amenity> amenities,
        List<Photo> photos, List<String> rules
) {
    public record Host(String name, int years, String avatar) {}
    public record Amenity(String icon, String name) {}
    public record Photo(String src, String alt, String category) {}
}
