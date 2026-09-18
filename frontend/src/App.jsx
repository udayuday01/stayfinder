
import { useMemo, useState } from "react";
import "./styles.css";

const homes = [
  {
    id: 1,
    title: "Luxury villa with private pool",
    location: "Goa, India",
    category: "Amazing pools",
    price: 8500,
    rating: 4.96,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85",
    description:
      "Relax in this beautiful private villa with a pool, tropical garden and peaceful surroundings.",
    guests: 6,
    beds: 3,
    baths: 2,
  },
  {
    id: 2,
    title: "Cozy mountain cabin",
    location: "Manali, India",
    category: "Cabins",
    price: 5200,
    rating: 4.89,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=85",
    description:
      "A warm wooden cabin surrounded by beautiful mountain scenery.",
    guests: 4,
    beds: 2,
    baths: 1,
  },
  {
    id: 3,
    title: "Modern apartment with city views",
    location: "Bengaluru, India",
    category: "Amazing views",
    price: 3900,
    rating: 4.82,
    reviews: 74,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
    description:
      "Enjoy a stylish apartment with contemporary interiors and stunning city views.",
    guests: 3,
    beds: 2,
    baths: 1,
  },
  {
    id: 4,
    title: "Beachfront tropical escape",
    location: "Kochi, India",
    category: "Beachfront",
    price: 6900,
    rating: 4.93,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=85",
    description:
      "Wake up near the sea in this relaxing tropical holiday home.",
    guests: 5,
    beds: 3,
    baths: 2,
  },
  {
    id: 5,
    title: "Elegant countryside retreat",
    location: "Coorg, India",
    category: "Countryside",
    price: 4700,
    rating: 4.87,
    reviews: 61,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=85",
    description:
      "A peaceful getaway surrounded by greenery and fresh countryside air.",
    guests: 4,
    beds: 2,
    baths: 2,
  },
  {
    id: 6,
    title: "Designer home near the beach",
    location: "Pondicherry, India",
    category: "Beachfront",
    price: 6100,
    rating: 4.91,
    reviews: 88,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
    description:
      "A designer stay with bright interiors and easy access to the beach.",
    guests: 4,
    beds: 2,
    baths: 2,
  },
];

const categories = [
  { name: "All stays", icon: "⌂" },
  { name: "Amazing pools", icon: "▤" },
  { name: "Beachfront", icon: "☼" },
  { name: "Cabins", icon: "⌂" },
  { name: "Amazing views", icon: "♧" },
  { name: "Countryside", icon: "♧" },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All stays");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredHomes = useMemo(() => {
    return homes.filter((home) => {
      const matchesSearch =
        `${home.title} ${home.location}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All stays" || home.category === category;

      const matchesFavorite =
        !showFavorites || favorites.includes(home.id);

      const matchesGuests = home.guests >= guests;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavorite &&
        matchesGuests
      );
    });
  }, [search, category, showFavorites, favorites, guests]);

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1;

  const bookingTotal = selectedHome
    ? selectedHome.price * Math.max(1, nights) + 800
    : 0;

  const handleSearch = () => {
    setShowFavorites(false);
    document
      .getElementById("listings")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBooking = () => {
    setShowBooking(false);
    setNotice(
      "Demo only: booking is not confirmed. Connect this action to your backend to complete a real reservation."
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#" aria-label="StayFinder home">
          <span className="brand-icon">⌂</span>
          <span>stayfinder</span>
        </a>

        <div className="nav-center">
          <button
            className={!showFavorites ? "nav-tab active" : "nav-tab"}
            onClick={() => setShowFavorites(false)}
          >
            Stays
          </button>
          <button
            className={showFavorites ? "nav-tab active" : "nav-tab"}
            onClick={() => setShowFavorites(true)}
          >
            Wishlist ♥
          </button>
        </div>

        <button
          className="host-button"
          onClick={() =>
            setNotice("Host registration can be connected to your backend.")
          }
        >
          Become a host
        </button>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</span>
          <h1>
            Find a place
            <br />
            <span>to call your own.</span>
          </h1>
          <p>
            Discover unique homes, beautiful destinations, and
            unforgettable stays.
          </p>
        </div>
      </section>

      <section className="search-section">
        <div className="search-box">
          <label className="search-field">
            <span>Where</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations"
            />
          </label>

          <label className="search-field">
            <span>Check in</span>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </label>

          <label className="search-field">
            <span>Check out</span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </label>

          <label className="search-field guests-field">
            <span>Guests</span>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </label>

          <button className="search-button" onClick={handleSearch}>
            <span>⌕</span> Search
          </button>
        </div>
      </section>

      <main className="main-content" id="listings">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>
              {showFavorites ? "Your wishlist" : "Explore stays"}
            </h2>
            <p>Find your perfect home away from home.</p>
          </div>

          <span className="listing-count">
            {filteredHomes.length} stays
          </span>
        </div>

        <div className="category-bar">
          {categories.map((item) => (
            <button
              key={item.name}
              className={
                category === item.name
                  ? "category-item selected"
                  : "category-item"
              }
              onClick={() => {
                setCategory(item.name);
                setShowFavorites(false);
              }}
            >
              <span className="category-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {filteredHomes.length === 0 ? (
          <div className="empty-state">
            <div>⌕</div>
            <h3>No stays found</h3>
            <p>Try another destination or change your filters.</p>
            <button
              className="primary-button"
              onClick={() => {
                setSearch("");
                setCategory("All stays");
                setShowFavorites(false);
                setGuests(2);
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="listing-grid">
            {filteredHomes.map((home) => (
              <article className="listing-card" key={home.id}>
                <div
                  className="listing-image-wrap"
                  onClick={() => setSelectedHome(home)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedHome(home);
                  }}
                >
                  <img
                    className="listing-image"
                    src={home.image}
                    alt={home.title}
                    loading="lazy"
                  />
                  <span className="guest-favorite">
                    Guest favorite
                  </span>
                  <button
                    className={
                      favorites.includes(home.id)
                        ? "heart-button favorited"
                        : "heart-button"
                    }
                    aria-label="Toggle wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(home.id);
                    }}
                  >
                    {favorites.includes(home.id) ? "♥" : "♡"}
                  </button>
                </div>

                <div
                  className="listing-info"
                  onClick={() => setSelectedHome(home)}
                >
                  <div className="listing-title-row">
                    <h3>{home.location}</h3>
                    <span className="rating">★ {home.rating}</span>
                  </div>
                  <p className="muted">{home.title}</p>
                  <p className="muted">
                    {home.guests} guests · {home.beds} beds ·{" "}
                    {home.baths} baths
                  </p>
                  <p className="price">
                    ₹{home.price.toLocaleString("en-IN")}{" "}
                    <span>/ night</span>
                  </p>
                </div>

                <button
                  className="details-link"
                  onClick={() => setSelectedHome(home)}
                >
                  View details →
                </button>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <span>© 2026 StayFinder</span>
        <span>Made for memorable stays.</span>
      </footer>

      {selectedHome && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedHome(null)}
        >
          <section
            className="details-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Listing details"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedHome(null)}
              aria-label="Close"
            >
              ×
            </button>

            <img
              className="modal-image"
              src={selectedHome.image}
              alt={selectedHome.title}
            />

            <div className="modal-body">
              <span className="eyebrow">STAYFINDER COLLECTION</span>
              <h2>{selectedHome.title}</h2>
              <p className="muted">
                {selectedHome.location} · ★ {selectedHome.rating} (
                {selectedHome.reviews} reviews)
              </p>

              <div className="property-facts">
                <span>♙ {selectedHome.guests} guests</span>
                <span>▤ {selectedHome.beds} beds</span>
                <span>♧ {selectedHome.baths} baths</span>
              </div>

              <p>{selectedHome.description}</p>

              <div className="booking-card">
                <h3>
                  ₹{selectedHome.price.toLocaleString("en-IN")}{" "}
                  <span>/ night</span>
                </h3>

                <div className="booking-dates">
                  <label>
                    Check in
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </label>
                  <label>
                    Check out
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </label>
                </div>

                <p className="total-line">
                  {nights > 0 ? nights : 1} night(s) + ₹800 service fee
                  <strong>
                    ₹{bookingTotal.toLocaleString("en-IN")}
                  </strong>
                </p>

                <button
                  className="primary-button full-button"
                  disabled={checkIn && checkOut && nights <= 0}
                  onClick={() => setShowBooking(true)}
                >
                  Reserve
                </button>

                <p className="small-note">
                  This is a demo. No payment will be taken.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {showBooking && selectedHome && (
        <div className="modal-backdrop">
          <section className="confirmation-modal" role="dialog" aria-modal="true">
            <button
              className="modal-close"
              onClick={() => setShowBooking(false)}
            >
              ×
            </button>
            <h2>Review your stay</h2>
            <p>{selectedHome.title}</p>
            <p>{selectedHome.location}</p>
            <p>
              {checkIn || "Choose check-in"} →{" "}
              {checkOut || "Choose check-out"}
            </p>
            <h3>
              Total: ₹{bookingTotal.toLocaleString("en-IN")}
            </h3>
            <p className="small-note">
              Demo confirmation only. This does not create a real booking.
            </p>
            <button
              className="primary-button full-button"
              onClick={handleBooking}
            >
              Confirm demo
            </button>
          </section>
        </div>
      )}

      {notice && (
        <div className="toast-message" role="status">
          <span>{notice}</span>
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}
    </div>
  );
}

export default App;