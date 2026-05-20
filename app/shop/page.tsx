"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

const products = [
  { id: 1, img: "/product-1.jpg", name: "chunky, round, grey-brown", description: "A chunky, round, grey-brown ceramic bowl filled with yellow ice cream scoops containing", price: 0, badge: "NEW" },
  { id: 2, img: "/product-2.jpg", name: "scoop textured pale", description: "A scoop of textured pale green pistachio ice cream, topped with chopped pistachios, in a", price: 30, badge: "" },
  { id: 3, img: "/product-3.jpg", name: "premium product", description: "a premium product", price: 40, badge: "" },
  { id: 4, img: "/product-4.jpg", name: "chunky white ceramic", description: "A chunky white ceramic footed bowl with a blue ornate pattern holds scoops of light", price: 50, badge: "" }
];

export default function ShopPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState("All Flavours");
  const [addedStates, setAddedStates] = useState<{ [key: number]: boolean }>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filters = ["All Flavours", "Classic", "Seasonal", "Vegan"];

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => el.classList.add('is-hidden'));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('is-hidden');
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleAddToCart = (p: typeof products[0]) => {
    addItem({
      id: crypto.randomUUID(),
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.img,
    });
    setAddedStates(prev => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedStates(prev => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const handleCardClick = (p: typeof products[0]) => {
    router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`);
  };

  return (
    <div
      style={{
        background: "#0a0a0a",
        color: "#e8e0d5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');

        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          vertical-align: middle;
        }

        .reveal {
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.is-hidden {
          opacity: 0;
          transform: translateY(28px);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-hover {
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
        }

        .btn-lift {
          transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1);
        }
        .btn-lift:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .btn-lift:active {
          transform: scale(0.98);
        }

        .product-img-wrap {
          overflow: hidden;
          border-radius: inherit;
        }
        .product-img {
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .group:hover .product-img {
          transform: scale(1.06);
        }

        .nav-link {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .nav-link:hover {
          transform: scale(1.05);
          color: #c9a96e;
        }

        .icon-btn {
          transition: transform 0.2s ease;
          cursor: pointer;
          background: none;
          border: none;
          color: #c9a96e;
          padding: 0;
        }
        .icon-btn:hover {
          transform: scale(1.05);
        }
        .icon-btn:active {
          transform: scale(0.95);
        }

        .filter-pill {
          padding: 8px 24px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        .filter-pill-active {
          border: 1.5px solid #c9a96e;
          background: rgba(201,169,110,0.1);
          color: #c9a96e;
        }
        .filter-pill-inactive {
          border: 1.5px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #e8e0d5;
        }
        .filter-pill-inactive:hover {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Trust Strip */}
      <div
        style={{
          background: "#1a1410",
          borderBottom: "1px solid rgba(201,169,110,0.2)",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: "12px",
          color: "#c9a96e",
          letterSpacing: "0.05em",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        ★★★★★ 4.8 &nbsp;|&nbsp; 10,000+ customers &nbsp;|&nbsp; Free Shipping &nbsp;|&nbsp; Made in India
      </div>

      {/* TopNavBar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          width: "100%",
          background: "rgba(10,10,10,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
          }}
        >
          {/* Brand Logo */}
          <button
            onClick={() => router.push('/')}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontWeight: 700,
              color: "#c9a96e",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              transition: "transform 0.2s ease",
              padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            Scoop &amp; Co.
          </button>

          {/* Desktop Nav Links */}
          <ul
            style={{
              display: "flex",
              gap: "32px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="hidden-mobile"
          >
            {[
              { label: "Shop", path: "/shop", active: true },
              { label: "Artisans", path: "/artisans", active: false },
              { label: "Story", path: "/story", active: false },
              { label: "Journal", path: "/journal", active: false },
            ].map(link => (
              <li key={link.label}>
                <button
                  onClick={() => router.push(link.path)}
                  className="nav-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: link.active ? 700 : 400,
                    color: link.active ? "#c9a96e" : "rgba(232,224,213,0.7)",
                    letterSpacing: "0.05em",
                    borderBottom: link.active ? "2px solid #c9a96e" : "none",
                    paddingBottom: link.active ? "4px" : "0",
                    padding: link.active ? "0 0 4px 0" : "0",
                    display: "block",
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Trailing Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#c9a96e" }}>
            <button
              aria-label="shopping_bag"
              className="icon-btn"
              onClick={() => router.push('/checkout')}
            >
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
            <button
              aria-label="person"
              className="icon-btn"
              onClick={() => router.push('/account')}
            >
              <span className="material-symbols-outlined">person</span>
            </button>
            <button
              aria-label="menu"
              className="icon-btn"
              style={{ display: "none" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#0f0f0f",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 24px",
            }}
          >
            {[
              { label: "Shop", path: "/shop" },
              { label: "Artisans", path: "/artisans" },
              { label: "Story", path: "/story" },
              { label: "Journal", path: "/journal" },
            ].map(link => (
              <button
                key={link.label}
                onClick={() => { router.push(link.path); setMobileMenuOpen(false); }}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "rgba(232,224,213,0.8)",
                  textAlign: "left",
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main style={{ flexGrow: 1 }}>

        {/* Editorial Header */}
        <header
          className="reveal"
          style={{
            paddingTop: "100px",
            paddingBottom: "48px",
            paddingLeft: "clamp(16px, 5vw, 64px)",
            paddingRight: "clamp(16px, 5vw, 64px)",
            maxWidth: "1280px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 700,
              color: "#e8e0d5",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}
          >
            Artisanal Batch
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              color: "rgba(232,224,213,0.65)",
              maxWidth: "672px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Discover our curated collection of handcrafted ice creams. Made in small batches with heritage recipes and unapologetically premium ingredients.
          </p>
        </header>

        {/* Filters Section */}
        <section
          className="reveal"
          style={{
            paddingBottom: "48px",
            paddingLeft: "clamp(16px, 5vw, 64px)",
            paddingRight: "clamp(16px, 5vw, 64px)",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            {filters.map(f => (
              <button
                key={f}
                className={`filter-pill ${activeFilter === f ? "filter-pill-active" : "filter-pill-inactive"} btn-lift`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section
          style={{
            paddingLeft: "clamp(16px, 5vw, 64px)",
            paddingRight: "clamp(16px, 5vw, 64px)",
            paddingBottom: "100px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "48px",
            }}
          >
            {products.map((p, idx) => (
              <div
                key={p.id}
                className="group card-hover reveal"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleCardClick(p)}
              >
                {/* Image Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "3/4",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "#141414",
                    marginBottom: "24px",
                    overflow: "hidden",
                  }}
                >
                  <div className="product-img-wrap" style={{ width: "100%", height: "100%", borderRadius: "8px" }}>
                    <img
                      src={p.img}
                      alt={p.name}
                      className="product-img"
                      style={{
                        display: "block",
                      }}
                      onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.style.background = "#1a1a1a";
                      }}
                    />
                  </div>

                  {/* Badge */}
                  {p.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                      }}
                    >
                      {p.badge === "NEW" ? (
                        <span
                          style={{
                            background: "#c9a96e",
                            color: "#0a0a0a",
                            padding: "4px 12px",
                            borderRadius: "9999px",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          Bestseller
                        </span>
                      ) : (
                        <span
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            color: "#e8e0d5",
                            padding: "4px 12px",
                            borderRadius: "9999px",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            fontFamily: "'Inter', sans-serif",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(16px, 1.5vw, 20px)",
                        fontWeight: 700,
                        color: "#e8e0d5",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "rgba(232,224,213,0.6)",
                        lineHeight: 1.6,
                        marginBottom: "16px",
                      }}
                    >
                      {p.description}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(16px, 1.5vw, 20px)",
                        fontWeight: 700,
                        color: "#6BCB77",
                        display: "block",
                      }}
                    >
                      {p.price === 0 ? "Free" : `₹ ${p.price}`}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  className="btn-lift"
                  onClick={e => {
                    e.stopPropagation();
                    handleAddToCart(p);
                  }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: addedStates[p.id]
                      ? "1.5px solid #6BCB77"
                      : "1.5px solid rgba(255,255,255,0.2)",
                    borderRadius: "9999px",
                    background: addedStates[p.id]
                      ? "rgba(107,203,119,0.1)"
                      : "transparent",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: addedStates[p.id] ? "#6BCB77" : "#e8e0d5",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginTop: "16px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={e => {
                    if (!addedStates[p.id]) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!addedStates[p.id]) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }
                  }}
                >
                  {addedStates[p.id] ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          background: "#080808",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px clamp(16px, 5vw, 64px)",
            gap: "32px",
          }}
        >
          {/* Brand Info */}
          <div style={{ textAlign: "left" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 700,
                color: "#e8e0d5",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "8px",
              }}
            >
              Scoop &amp; Co.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "rgba(232,224,213,0.5)",
                lineHeight: 1.6,
              }}
            >
              © 2024 Scoop &amp; Co. Proudly Made in India.
            </p>
          </div>

          {/* Footer Links */}
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: "16px 32px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {[
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Service", path: "/terms" },
              { label: "Shipping", path: "/shipping" },
              { label: "Contact", path: "/contact" },
            ].map(link => (
              <li key={link.label}>
                <button
                  onClick={() => router.push(link.path)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "rgba(232,224,213,0.5)",
                    transition: "color 0.2s ease",
                    padding: 0,
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#c9a96e")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(232,224,213,0.5)")}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}