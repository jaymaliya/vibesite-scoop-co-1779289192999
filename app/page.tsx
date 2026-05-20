"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [email, setEmail] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);
  const [subscribeHover, setSubscribeHover] = useState(false);
  const [storyLinkHover, setStoryLinkHover] = useState(false);
  const [viewAllHover, setViewAllHover] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("is-hidden"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("is-hidden");
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const primary = "#C9A96E";
  const onPrimary = "#0A0A0A";
  const background = "#0A0A0A";
  const onBackground = "#e5e2e1";
  const onSurfaceVariant = "#a09e9d";
  const surface = "#111111";
  const surfaceContainerHigh = "#1a1a1a";

  const navLinks = [
    { label: "Shop", action: () => router.push("/shop") },
    { label: "Artisans", action: () => router.push("/shop") },
    { label: "Story", action: () => router.push("/shop") },
    { label: "Journal", action: () => router.push("/shop") },
  ];

  const products = [
    {
      id: "saffron-rosewater",
      name: "Saffron & Rosewater",
      description: "Infused with Kashmiri Saffron.",
      price: 850,
      badge: "Limited",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDG2AAd3HAfvvErpVXcmr2QGWwshtlP1zofUB6p8X8QRVfAr7G3U49X57sBnyJfLLl5mx7XTVYBHN3jQYeZEen-rgMJHtgEfCh_cS4Xk735EImWiAiu33sSMdoEDxFf8FlGT8cnJThOTwyQ_VbkFE-UwS9S-JxeN04if-QRPQ-2NpaIuG4xks9crbQczjQ1xzf1lwhHzEDQEkMUxuA1kTi2U6yVn8fqdy-TAU-MK66xY4R0lKyeI4YJAAc2nfHSlUMoskS-Cu5_HPZ",
      offset: false,
    },
    {
      id: "roasted-pistachio",
      name: "Roasted Pistachio",
      description: "Sourced from Iranian orchards.",
      price: 750,
      badge: null,
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDThqhjnDarKSJJJHkA_c8NulbIHU0_ik4pE4Um7fFREooTPjY5pm6SyK-Ap5U6_K1ccmgZer_XC5VnLaGVapOVmLqEhb8lRFAlokslnXjTpJq9kgvHKDZ_756OsRiCV7qYTrxP49TvU5H9Yka86IrKK0oTAr9X74j_-cXpPTBjo0Md6YG_pTZ46Xhgtdcc8MsB3SBu8Y4KZx0BVDrUGfdP0_uDiCd0AeULyeGBwv52-SwPf_EcC7Svb7d6vmrxSkqqPQbXd9MQuA5g",
      offset: true,
    },
  ];

  return (
    <div
      className="page-enter"
      style={{
        background: background,
        color: onBackground,
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined');
            .is-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
            .visible { opacity: 1; transform: translateY(0); }
            .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
            .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
            .btn-lift { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
            .btn-lift:hover { transform: scale(1.05); box-shadow: 0 8px 24px rgba(201,169,110,0.35); }
            .btn-lift:active { transform: scale(0.98); }
            * { box-sizing: border-box; }
          `,
        }}
      />

      {/* TOP NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(10,10,10,0.90)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          transition: "all 0.3s ease",
        }}
      >
        <nav
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
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: primary,
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: 0,
              }}
            >
              Scoop &amp; Co.
            </button>
            <div
              style={{
                display: "flex",
                gap: "24px",
              }}
              className="hidden md:flex"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  onMouseEnter={() => setHoveredNav(link.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color:
                      hoveredNav === link.label ? primary : "rgba(229,226,225,0.70)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    padding: 0,
                    position: "relative",
                    transition: "color 0.3s ease",
                  }}
                >
                  {link.label}
                  <span
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      height: "2px",
                      background: primary,
                      width: hoveredNav === link.label ? "100%" : "0",
                      transition: "width 0.3s ease",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {["search", "person", "shopping_bag"].map((icon) => (
              <button
                key={icon}
                aria-label={icon}
                onClick={() => router.push(icon === "shopping_bag" ? "/checkout" : "/shop")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: onBackground,
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = primary)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = onBackground)
                }
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "22px" }}
                >
                  {icon}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(10,10,10,0.4), rgba(10,10,10,0.9)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuAs8Zb2sabgLqytbm4RENAB99s1gOygK9PPW-SQ0dxTahdnNiBfB6MUnl2Xmr-WnhWONT9OhW3VAIGo5M5qTlZxjQI03Kh56nJ0CpWSMhvN9JIItqBTJic57kecyn5lFVkQFEsYGgulaklatvk0RozJ48L3erT7HoRIH3EBc9tLf-3B4RfGUVPNoFyRxGr4RA9wKzcR85NWZ-VGp3rJLD0PZwQZD8TVKxrF9Hb0rwBrHfd2NP4f8UvRo1MsWmiD4OMKqhyN9rckmT2E)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.20)",
              color: primary,
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "14px" }}
            >
              verified
            </span>
            Proudly Made in India
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 900,
              color: onBackground,
              textTransform: "uppercase",
              lineHeight: 1.05,
              letterSpacing: "0.02em",
              margin: 0,
              textShadow: "0 4px 32px rgba(0,0,0,0.7)",
            }}
          >
            The Pinnacle of <br />
            <span style={{ color: primary }}>Artisanal Gelato</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              fontWeight: 300,
              color: onSurfaceVariant,
              maxWidth: "600px",
              lineHeight: 1.7,
              margin: "0 0 8px 0",
            }}
          >
            Crafted in small batches using heritage techniques and the finest
            Indian ingredients. Experience dessert redefined.
          </p>

          {/* CTA */}
          <button
            className="btn-lift"
            onClick={() => router.push("/shop")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 32px",
              background: primary,
              color: onPrimary,
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* THE CRAFT STORY / OUR HERITAGE */}
      <section
        className="reveal"
        style={{
          padding: "80px 24px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
          {/* Image — order 2 on mobile, 1 on desktop */}
          <div
            className="card-hover"
            style={{
              position: "relative",
              height: "600px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              order: 2,
            }}
          >
            <img
              alt="Artisan making ice cream"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPdVnCAGTGODvskNkJKMcbKdZBOpH7satBnrCTMrIqSulHx1N6igfOmhAZgXgSLXregyRFEgBs7sPevsrqlKtcCdUkYfLD0MphgBS2krk8z3ymAItuI4x007ACo4VxtIjKg2eOvU0hwoAGfj8-qodXegGcehOG6z814dBcUwjxSz34bn2Q-n1feeuIc7iCOS2JuhxYbVO4QsIsuIiL3_hVmfw92rXTB2_TZaieOsnXycgCZAc3wiag3GjaHYLhw-fNbDRIjFBnE853"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%)",
                opacity: 0.8,
                transition: "filter 0.7s ease, opacity 0.7s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter =
                  "grayscale(0%)";
                (e.currentTarget as HTMLImageElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).style.filter =
                  "grayscale(100%)";
                (e.currentTarget as HTMLImageElement).style.opacity = "0.8";
              }}
            />
          </div>

          {/* Text content — order 1 on mobile, 2 on desktop */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              paddingLeft: "0",
              order: 1,
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                color: primary,
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Our Heritage
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px",
                fontWeight: 300,
                color: onSurfaceVariant,
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              We believe true luxury lies in the details. Every scoop is a
              testament to generations of culinary tradition, blending ancient
              Indian flavor profiles with modern gelato mastery.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "rgba(229,226,225,0.70)",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Sourced directly from local farmers, our saffron, pistachios, and
              mangoes are selected for their uncompromising quality, ensuring a
              taste experience that is both authentic and elevated.
            </p>
            <button
              onClick={() => router.push("/shop")}
              onMouseEnter={() => setStoryLinkHover(true)}
              onMouseLeave={() => setStoryLinkHover(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: primary,
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: storyLinkHover ? "underline" : "none",
                padding: 0,
                marginTop: "8px",
                transition: "text-decoration 0.2s ease",
              }}
            >
              Read Our Story{" "}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
              >
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* EDITORIAL PRODUCT SHOWCASE */}
      <section
        id="shop"
        className="reveal"
        style={{
          padding: "80px 24px",
          background: "#0A0A0A",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 7vw, 80px)",
                fontWeight: 900,
                color: onBackground,
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              Curated Collections
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "17px",
                color: onSurfaceVariant,
                marginTop: "8px",
                fontWeight: 300,
              }}
            >
              Explore our signature seasonal flavors.
            </p>
          </div>
          <button
            onClick={() => router.push("/shop")}
            onMouseEnter={() => setViewAllHover(true)}
            onMouseLeave={() => setViewAllHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: primary,
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: viewAllHover ? "underline" : "none",
              padding: 0,
              transition: "text-decoration 0.2s ease",
            }}
          >
            View All{" "}
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "14px" }}
            >
              arrow_forward
            </span>
          </button>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="card-hover"
              onClick={() =>
                router.push(
                  "/product?name=" +
                    encodeURIComponent(product.name) +
                    "&price=" +
                    product.price +
                    "&img=" +
                    encodeURIComponent(product.img)
                )
              }
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0px",
                border: "1px solid rgba(255,255,255,0.05)",
                padding: "24px",
                borderRadius: "8px",
                background:
                  hoveredCard === product.id ? surfaceContainerHigh : surface,
                transition: "background 0.3s ease",
                cursor: "pointer",
                marginTop: product.offset ? "96px" : "0",
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  height: "400px",
                  width: "100%",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <img
                  alt={product.name}
                  src={product.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s ease",
                    transform:
                      hoveredCard === product.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {product.badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: background,
                      color: onBackground,
                      padding: "4px 12px",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: "9999px",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  paddingTop: "16px",
                  marginTop: "16px",
                  borderTop: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "20px",
                      fontWeight: 700,
                      color: primary,
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      color: onSurfaceVariant,
                      marginTop: "4px",
                      fontWeight: 300,
                    }}
                  >
                    {product.description}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: onBackground,
                    whiteSpace: "nowrap",
                    marginLeft: "16px",
                  }}
                >
                  ₹{product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER CTA */}
      <section
        className="reveal"
        style={{
          padding: "100px 24px",
          background: primary,
          color: onPrimary,
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 900,
              color: onPrimary,
              textTransform: "uppercase",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Experience <br /> The Extraordinary
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "17px",
              color: onPrimary,
              maxWidth: "480px",
              lineHeight: 1.7,
              fontWeight: 300,
              margin: 0,
            }}
          >
            Join our exclusive tasting club for early access to seasonal
            releases and limited-edition collaborations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            style={{
              width: "100%",
              maxWidth: "480px",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(10,10,10,0.5)",
                padding: "8px 16px",
                color: onPrimary,
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
                  onPrimary)
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
                  "rgba(10,10,10,0.5)")
              }
            />
            <button
              type="submit"
              className="btn-lift"
              onMouseEnter={() => setSubscribeHover(true)}
              onMouseLeave={() => setSubscribeHover(false)}
              style={{
                padding: "8px 24px",
                background: subscribeHover ? background : onPrimary,
                color: primary,
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s ease, color 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid rgba(255,255,255,0.10)",
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
            padding: "48px 24px",
            gap: "24px",
          }}
        >
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: primary,
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: 0,
            }}
          >
            Scoop &amp; Co.
          </button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {[
              { label: "Privacy Policy", path: "/" },
              { label: "Terms of Service", path: "/" },
              { label: "Shipping", path: "/" },
              { label: "Contact", path: "/" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => router.push(link.path)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: onSurfaceVariant,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 300,
                  padding: 0,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = primary)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color =
                    onSurfaceVariant)
                }
              >
                {link.label}
              </button>
            ))}
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: onSurfaceVariant,
              fontWeight: 300,
              textAlign: "right",
              margin: 0,
            }}
          >
            © 2024 Scoop &amp; Co. Proudly Made in India.
          </p>
        </div>
      </footer>
    </div>
  );
}