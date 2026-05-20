"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProductContent() {
  const router = useRouter();
  const { addItem } = useCart();
  const searchParams = useSearchParams();
  const paramImg = searchParams.get("img") ? decodeURIComponent(searchParams.get("img")!) : null;
  const paramName = searchParams.get("name") ? decodeURIComponent(searchParams.get("name")!) : null;
  const paramPrice = searchParams.get("price") ? Number(searchParams.get("price")) : null;

  const displayImg = paramImg ?? "https://lh3.googleusercontent.com/aida-public/AB6AXuCDG2AAd3HAfvvErpVXcmr2QGWwshtlP1zofUB6p8X8QRVfAr7G3U49X57sBnyJfLLl5mx7XTVYBHN3jQYeZEen-rgMJHtgEfCh_cS4Xk735EImWiAiu33sSMdoEDxFf8FlGT8cnJThOTwyQ_VbkFE-UwS9S-JxeN04if-QRPQ-2NpaIuG4xks9crbQczjQ1xzf1lwhHzEDQEkMUxuA1kTi2U6yVn8fqdy-TAU-MK66xY4R0lKyeI4YJAAc2nfHSlUMoskS-Cu5_HPZ";
  const productName = paramName ?? "Alphonso Mango";
  const productPrice = paramPrice ?? 850;

  const img1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCDG2AAd3HAfvvErpVXcmr2QGWwshtlP1zofUB6p8X8QRVfAr7G3U49X57sBnyJfLLl5mx7XTVYBHN3jQYeZEen-rgMJHtgEfCh_cS4Xk735EImWiAiu33sSMdoEDxFf8FlGT8cnJThOTwyQ_VbkFE-UwS9S-JxeN04if-QRPQ-2NpaIuG4xks9crbQczjQ1xzf1lwhHzEDQEkMUxuA1kTi2U6yVn8fqdy-TAU-MK66xY4R0lKyeI4YJAAc2nfHSlUMoskS-Cu5_HPZ";
  const img2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuC8cvB1CPzqcB4O8cJoKWCVCd5t3qNCZyF8VE0QKIHyZtOmbwki8vhJsASTQD6LcGs_bv9SV3nDYPBrh5ey-8KJQYxO4tZm4mG2YBkgKcP_3i_xcfiQRaOfeIhlR3g08ItIQfqHtoRxJ2asWFZDJJT0OKWUmNgkdJ77PMGatn25b1J-VK8chN0rNpLGjtJshMqBHUCjCIlL7bGW3c205H7Yw2hEMsiEp6-m6vEWIjALQcIq3ZZrWtFBvBGEX9qHriMbg0A9GhUAmlgJ";
  const img3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAZQC5g37mrAfqDBysmRJ_OZwuWGyYaUoKl2_ziWyvOJb9dR8PP0nOnS8SjeLrHldxMWwagM62etUcyduchhVqRxuYFJigFEs__9LWZs8whwvNfPqGDgX6ixA3x4Aj6EXYnqESSvRkV6HDnjT0bVa1fN7v9D66Ije8k7dKbAYxXZ6jmAogQDdNR3uBXbu-FLaeNm1iI6TctBBz39C-bDrJi8UZAozQ6zIaV5x79OA_Qlxx4xDrreUEs-FyEicDT8FTgcMerNkYABvqW";

  const thumbnails = paramImg ? [{ src: paramImg, alt: "Product View 1" }] : [
    { src: img1, alt: "Thumbnail 1" },
    { src: img2, alt: "Thumbnail 2" },
    { src: img3, alt: "Thumbnail 3" },
  ];

  const [activeThumb, setActiveThumb] = useState(0);
  const [mainImage, setMainImage] = useState(displayImg);
  const [selectedSize, setSelectedSize] = useState("500ml");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch {} };
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  function handleThumbClick(idx: number) {
    setActiveThumb(idx);
    setMainImage(thumbnails[idx].src);
  }

  function handleAddToCart() {
    addItem({
      id: "product-alphonso-mango",
      name: productName,
      price: productPrice,
      quantity,
      size: selectedSize,
      image: mainImage,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  }

  function handleBuyNow() {
    addItem({
      id: "product-alphonso-mango",
      name: productName,
      price: productPrice,
      quantity,
      size: selectedSize,
      image: mainImage,
    });
    router.push("/checkout");
  }

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#FFFFFF",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Google Fonts + Material Symbols */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
          font-style: normal;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          user-select: none;
        }
        .star-filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .reveal { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.is-hidden { opacity: 0; transform: translateY(28px); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .btn-lift { transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: scale(1.02); }
        .btn-lift:active { transform: scale(0.98); }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        @media (max-width: 767px) {
          .product-grid { flex-direction: column !important; }
          .review-grid { grid-template-columns: 1fr !important; }
          .thumb-strip { flex-direction: row !important; width: 100% !important; overflow-x: auto !important; }
          .thumb-strip-wrap { flex-direction: column-reverse !important; }
        }
      `}</style>

      {/* Top Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: navScrolled ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          width: "100%",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FFB59D",
                fontSize: "20px",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Scoop &amp; Co.
            </button>
            <div
              style={{ display: "flex", gap: "24px", alignItems: "center" }}
              className="hidden-mobile"
            >
              {[
                { label: "Shop", path: "/shop", active: true },
                { label: "Artisans", path: "/shop" },
                { label: "Story", path: "/" },
                { label: "Journal", path: "/" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: item.active ? "#FFB59D" : "rgba(255,255,255,0.7)",
                    fontWeight: item.active ? 700 : 400,
                    fontSize: "14px",
                    letterSpacing: "0.02em",
                    borderBottom: item.active ? "2px solid #FFB59D" : "none",
                    paddingBottom: item.active ? "4px" : "0",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active) {
                      (e.currentTarget as HTMLButtonElement).style.color = "#FFB59D";
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              aria-label="Search"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FFFFFF",
                padding: "4px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFB59D";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>search</span>
            </button>
            <button
              aria-label="Shopping bag"
              onClick={() => router.push("/checkout")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FFFFFF",
                padding: "4px",
                position: "relative",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFB59D";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>shopping_bag</span>
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  backgroundColor: "#FFB59D",
                  color: "#0A0A0A",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 5px",
                  borderRadius: "9999px",
                  lineHeight: 1,
                }}
              >
                2
              </span>
            </button>
            <button
              aria-label="Account"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#FFFFFF",
                padding: "4px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFB59D";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>person</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Product Section */}
      <main
        style={{
          flexGrow: 1,
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "100px 24px",
        }}
      >
        <div
          className="product-grid"
          style={{ display: "flex", gap: "64px", alignItems: "flex-start" }}
        >
          {/* Image Gallery (Left) */}
          <section
            style={{ width: "60%", flexShrink: 0 }}
            className="thumb-strip-wrap"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
              }}
            >
              {/* Thumbnail Strip */}
              {!paramImg && (
                <div
                  className="thumb-strip hide-scrollbar"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    width: "96px",
                    flexShrink: 0,
                  }}
                >
                  {thumbnails.map((thumb, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbClick(idx)}
                      style={{
                        width: "96px",
                        height: "128px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: activeThumb === idx ? "2px solid #FFB59D" : "1px solid rgba(255,255,255,0.1)",
                        opacity: activeThumb === idx ? 1 : 0.7,
                        cursor: "pointer",
                        background: "none",
                        padding: 0,
                        position: "relative",
                        flexShrink: 0,
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (activeThumb !== idx) (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        if (activeThumb !== idx) (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
                      }}
                    >
                      <img
                        src={thumb.src}
                        alt={thumb.alt}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: activeThumb === idx ? "transparent" : "rgba(0,0,0,0.2)",
                          transition: "background-color 0.2s ease",
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div
                style={{
                  flex: 1,
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  backgroundColor: "#141414",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minHeight: "500px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={mainImage}
                  alt={productName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </section>

          {/* Product Info (Right) */}
          <section style={{ flex: 1, display: "flex", flexDirection: "column", paddingTop: "0" }}>
            {/* Badge + Title */}
            <div style={{ marginBottom: "24px" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  backgroundColor: "#1A1A1A",
                  border: "1px solid rgba(255,181,157,0.3)",
                  color: "#FFB59D",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  boxShadow: "0 0 15px rgba(255,181,157,0.1)",
                }}
              >
                Limited Reserve
              </span>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "56px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  lineHeight: 1,
                  marginBottom: "8px",
                  margin: "0 0 8px 0",
                }}
              >
                {productName}
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                  marginTop: "8px",
                }}
              >
                Hand-churned with organic Alphonso mangoes sourced directly from Ratnagiri farms. A rich, creamy testament to traditional Indian artisanship.
              </p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "32px",
                    fontWeight: 700,
                    color: "#6BCB77",
                    lineHeight: 1,
                  }}
                >
                  ₹{productPrice}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "16px",
                    textDecoration: "line-through",
                    marginBottom: "4px",
                  }}
                >
                  ₹1100
                </span>
              </div>
            </div>

            <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "24px 0" }} />

            {/* Size Selector */}
            <div style={{ marginBottom: "32px" }}>
              <h3
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#FFFFFF",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "12px",
                }}
              >
                Size
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                {["500ml", "1 Liter"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="btn-lift"
                    style={{
                      padding: "12px 24px",
                      borderRadius: "9999px",
                      border: selectedSize === size ? "2px solid #FFB59D" : "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: selectedSize === size ? "rgba(255,181,157,0.08)" : "transparent",
                      color: selectedSize === size ? "#FFB59D" : "rgba(255,255,255,0.6)",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedSize !== size) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.3)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedSize !== size) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                      }
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <h3
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    width: "64px",
                    flexShrink: 0,
                  }}
                >
                  Qty
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "9999px",
                    padding: "4px 8px",
                    backgroundColor: "#1A1A1A",
                    gap: "4px",
                  }}
                >
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#FFFFFF",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FFB59D")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>remove</span>
                  </button>
                  <span
                    style={{
                      width: "32px",
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#FFFFFF",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#FFFFFF",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FFB59D")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF")}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>add</span>
                  </button>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "16px", marginTop: "16px", flexWrap: "wrap" }}
              >
                <button
                  onClick={handleAddToCart}
                  className="btn-lift"
                  style={{
                    flex: 1,
                    minWidth: "140px",
                    backgroundColor: "#1A1A1A",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "16px 24px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#252525")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1A1A1A")}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>shopping_bag</span>
                  {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn-lift"
                  style={{
                    flex: 1,
                    minWidth: "140px",
                    backgroundColor: "#FFB59D",
                    border: "none",
                    color: "#0A0A0A",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "16px 24px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: "0 0 20px rgba(255,181,157,0.2)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(255,181,157,0.4)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(255,181,157,0.2)")}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Accordion Details */}
            <div style={{ marginTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {/* Ingredients */}
              <div
                onClick={() => setIngredientsOpen((o) => !o)}
                style={{
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.color = "#FFB59D")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.color = "#FFFFFF")}
              >
                <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Ingredients
                </span>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>
                  {ingredientsOpen ? "remove" : "add"}
                </span>
              </div>
              {ingredientsOpen && (
                <div
                  style={{
                    padding: "12px 0 16px",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Organic Alphonso Mango Pulp (Ratnagiri), Fresh Cream, Whole Milk, Cane Sugar, Saffron (Kashmiri), Cardamom. No artificial flavors or preservatives.
                </div>
              )}
              {/* Shipping */}
              <div
                onClick={() => setShippingOpen((o) => !o)}
                style={{
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.color = "#FFB59D")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.color = "#FFFFFF")}
              >
                <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Shipping
                </span>
                <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "rgba(255,255,255,0.5)" }}>
                  {shippingOpen ? "remove" : "add"}
                </span>
              </div>
              {shippingOpen && (
                <div
                  style={{
                    padding: "12px 0 16px",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  Ships within 24 hours in temperature-controlled packaging. Free delivery on orders above ₹999. Available across India. Delivered frozen to preserve freshness.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Reviews Section */}
      <section
        className="reveal"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "64px 24px",
          width: "100%",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "40px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Artisan Reviews
          </h2>
          <button
            onClick={() => router.push("/shop")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#FFB59D",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationColor: "rgba(255,181,157,0.5)",
            }}
          >
            View All
          </button>
        </div>

        <div
          className="review-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {/* Review Card 1 */}
          <div
            className="card-hover"
            style={{
              backgroundColor: "#141414",
              padding: "32px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "4px", color: "#FFB59D" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined star-filled"
                  style={{ fontSize: "20px", color: "#FFB59D" }}
                >
                  star
                </span>
              ))}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                lineHeight: 1.7,
                flexGrow: 1,
                margin: 0,
              }}
            >
              "The texture is unlike anything I've bought in a store. You can actually taste the real mango chunks. Absolutely worth the premium."
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#2A2A2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  flexShrink: 0,
                }}
              >
                A.R.
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Aisha R.</p>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Review Card 2 */}
          <div
            className="card-hover"
            style={{
              backgroundColor: "#141414",
              padding: "32px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "4px", color: "#FFB59D" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined star-filled"
                  style={{ fontSize: "20px", color: "#FFB59D" }}
                >
                  star
                </span>
              ))}
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                lineHeight: 1.7,
                flexGrow: 1,
                margin: 0,
              }}
            >
              "Decadent and rich. The packaging itself feels like a luxury gift. A perfect centerpiece for our dinner party dessert."
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#2A2A2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  flexShrink: 0,
                }}
              >
                K.M.
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Karan M.</p>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Verified Buyer</p>
              </div>
            </div>
          </div>

          {/* Review Card 3 */}
          <div
            className="card-hover"
            style={{
              backgroundColor: "#141414",
              padding: "32px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "4px" }}>
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined star-filled"
                  style={{ fontSize: "20px", color: "#FFB59D" }}
                >
                  star
                </span>
              ))}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px", color: "rgba(255,255,255,0.3)" }}
              >
                star
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                lineHeight: 1.7,
                flexGrow: 1,
                margin: 0,
              }}
            >
              "Really delicious, though slightly sweeter than I expected. The saffron notes are beautiful."
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#2A2A2A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.8)",
                  flexShrink: 0,
                }}
              >
                S.D.
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>Sneha D.</p>
                <p style={{ margin: 0, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Verified Buyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0D0D0D",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "48px 24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "32px",
          }}
        >
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.8)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              opacity: 0.8,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.8")}
          >
            Scoop &amp; Co.
          </button>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
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
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "14px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FFB59D")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)")}
              >
                {link.label}
              </button>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", margin: 0 }}>
            © 2024 Scoop &amp; Co. Proudly Made in India.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile Add to Cart Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          backgroundColor: "rgba(10,10,10,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
        className="mobile-sticky-bar"
      >
        <style>{`
          .mobile-sticky-bar { display: none; }
          @media (max-width: 767px) { .mobile-sticky-bar { display: flex !important; } }
          @media (min-width: 768px) { .hidden-mobile { display: flex !important; } }
          @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
        `}</style>
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#6BCB77" }}>
            ₹{productPrice}
          </span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textDecoration: "line-through", marginLeft: "8px" }}>
            ₹1100
          </span>
        </div>
        <button
          onClick={handleBuyNow}
          className="btn-lift"
          style={{
            flex: 1,
            maxWidth: "200px",
            backgroundColor: "#FFB59D",
            border: "none",
            color: "#0A0A0A",
            fontSize: "14px",
            fontWeight: 600,
            padding: "14px 24px",
            borderRadius: "9999px",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(255,181,157,0.3)",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0A0A0A" }} />}>
      <ProductContent />
    </Suspense>
  );
}