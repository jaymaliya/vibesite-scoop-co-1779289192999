"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    newsletter: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    if (pageRef.current) {
      pageRef.current.style.opacity = "0";
      pageRef.current.style.transform = "translateY(16px)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (pageRef.current) {
            pageRef.current.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            pageRef.current.style.opacity = "1";
            pageRef.current.style.transform = "translateY(0)";
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(24px)";
    });
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transition =
              "opacity 0.6s ease, transform 0.6s ease";
            (e.target as HTMLElement).style.opacity = "1";
            (e.target as HTMLElement).style.transform = "translateY(0)";
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [mounted]);

  const shippingCost = totalPrice > 500 ? 0 : 99;
  const orderTotal = totalPrice + shippingCost;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    else if (!/^\d{6}$/.test(form.postalCode)) newErrors.postalCode = "Enter a valid 6-digit PIN";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phone: val }));
    if (errors.phone) setErrors((prev) => { const n = { ...prev }; delete n.phone; return n; });
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setForm((prev) => ({ ...prev, postalCode: val }));
    if (errors.postalCode) setErrors((prev) => { const n = { ...prev }; delete n.postalCode; return n; });
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (items.length === 0) {
      router.push("/shop");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal }),
      });
      const order = await res.json();
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const rzp = new (window as any).Razorpay({
          key: "rzp_test_",
          amount: order.amount,
          currency: "INR",
          name: "Scoop & Co.",
          description: "Order Payment",
          handler: () => {
            clearCart();
            router.push("/");
          },
          prefill: {
            email: form.email,
            contact: form.phone,
            name: `${form.firstName} ${form.lastName}`,
          },
          theme: { color: "#e8c96a" },
        });
        rzp.open();
      };
      document.body.appendChild(script);
    } catch {
      clearCart();
      router.push("/");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    borderBottom: errors[field] ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.2)",
    color: "#e5e2e1",
    fontSize: "15px",
    padding: "12px 0",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "inherit",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "rgba(229,226,225,0.7)",
    marginBottom: "8px",
    textTransform: "uppercase",
    fontFamily: "inherit",
  };

  return (
    <div
      ref={pageRef}
      style={{
        backgroundColor: "#131313",
        color: "#e5e2e1",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #e5e2e1;
          -webkit-box-shadow: 0 0 0px 1000px #131313 inset;
          transition: background-color 5000s ease-in-out 0s;
        }
        input:focus {
          border-bottom-color: #e8c96a !important;
        }
      `}</style>

      {/* Header */}
      <header
        style={{
          backgroundColor: "#131313",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          width: "100%",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#e8c96a",
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "inherit",
          }}
        >
          Scoop &amp; Co.
        </button>
        <button
          onClick={() => router.push("/shop")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(229,226,225,0.7)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            letterSpacing: "0.05em",
            fontFamily: "inherit",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e8c96a")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,226,225,0.7)")}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            arrow_back
          </span>
          RETURN TO CART
        </button>
      </header>

      {/* Main */}
      <main
        style={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "48px 24px",
        }}
      >
        {/* Empty Cart State */}
        {mounted && items.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "50vh",
              gap: "24px",
              textAlign: "center",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "64px", color: "rgba(229,226,225,0.3)" }}
            >
              shopping_cart
            </span>
            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#e5e2e1" }}>
              Your cart is empty
            </h2>
            <p style={{ color: "rgba(229,226,225,0.6)", fontSize: "15px" }}>
              Add some items to your cart before checking out.
            </p>
            <button
              onClick={() => router.push("/shop")}
              style={{
                backgroundColor: "#e8c96a",
                color: "#000000",
                border: "none",
                borderRadius: "999px",
                padding: "14px 32px",
                fontSize: "13px",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,201,106,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
            }}
            className="checkout-grid"
          >
            <style>{`
              @media (min-width: 1024px) {
                .checkout-grid {
                  grid-template-columns: 7fr 5fr !important;
                  gap: 64px !important;
                }
              }
            `}</style>

            {/* Left Column: Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: "700",
                  color: "#e5e2e1",
                  marginBottom: "32px",
                  letterSpacing: "-0.02em",
                }}
              >
                Checkout
              </h1>

              {/* Contact Information */}
              <section className="reveal" style={{ marginBottom: "48px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#e5e2e1" }}>
                    Contact Information
                  </h2>
                  <span style={{ fontSize: "12px", color: "rgba(229,226,225,0.6)" }}>
                    Step 1 of 2
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={labelStyle} htmlFor="email">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle("email")}
                    />
                    {errors.email && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "20px",
                        height: "20px",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        backgroundColor: "transparent",
                      }}
                    >
                      <input
                        id="newsletter"
                        type="checkbox"
                        checked={form.newsletter}
                        onChange={handleChange}
                        style={{
                          position: "absolute",
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          margin: 0,
                        }}
                      />
                      {form.newsletter && (
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "16px", color: "#e8c96a" }}
                        >
                          check
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "14px", color: "rgba(229,226,225,0.8)" }}>
                      Email me with news and offers
                    </span>
                  </label>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="reveal">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: "8px",
                    marginBottom: "24px",
                  }}
                >
                  <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#e5e2e1" }}>
                    Shipping Address
                  </h2>
                  <span style={{ fontSize: "12px", color: "rgba(229,226,225,0.6)" }}>
                    Step 2 of 2
                  </span>
                </div>

                <div className="form-grid" style={{ display: "grid", gap: "24px" }}>
                  <style>{`
                    @media (min-width: 768px) {
                      .form-grid {
                        grid-template-columns: 1fr 1fr;
                      }
                      .col-span-2 {
                        grid-column: span 2;
                      }
                    }
                    .col-span-2 {
                      grid-column: span 1;
                    }
                  `}</style>

                  <div>
                    <label style={labelStyle} htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      style={inputStyle("firstName")}
                    />
                    {errors.firstName && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      style={inputStyle("lastName")}
                    />
                    {errors.lastName && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label style={labelStyle} htmlFor="address">
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={handleChange}
                      style={inputStyle("address")}
                    />
                    {errors.address && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label style={labelStyle} htmlFor="apartment">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      id="apartment"
                      type="text"
                      value={form.apartment}
                      onChange={handleChange}
                      style={inputStyle("apartment")}
                    />
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="city">
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      style={inputStyle("city")}
                    />
                    {errors.city && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={labelStyle} htmlFor="postalCode">
                      Postal Code
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      value={form.postalCode}
                      onChange={handlePinChange}
                      inputMode="numeric"
                      style={inputStyle("postalCode")}
                    />
                    {errors.postalCode && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.postalCode}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label style={labelStyle} htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      inputMode="numeric"
                      style={inputStyle("phone")}
                    />
                    {errors.phone && (
                      <p style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Order Summary */}
            <div style={{ marginTop: "0" }}>
              <div
                className="reveal"
                style={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  padding: "32px",
                  position: "sticky",
                  top: "96px",
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#e5e2e1",
                    marginBottom: "32px",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    paddingBottom: "16px",
                  }}
                >
                  Order Summary
                </h2>

                {/* Products */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "32px" }}>
                  {mounted && items.length > 0 ? (
                    items.map((item) => (
                      <div
                        key={item.id}
                        style={{ display: "flex", gap: "16px", alignItems: "center" }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#2a2a2a",
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                            position: "relative",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          )}
                          {!item.image && (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ color: "rgba(229,226,225,0.3)", fontSize: "32px" }}
                              >
                                image
                              </span>
                            </div>
                          )}
                          <div
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              backgroundColor: "#2a2a2a",
                              color: "#e5e2e1",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              border: "1px solid rgba(255,255,255,0.1)",
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#e5e2e1" }}>
                            {item.name}
                          </h3>
                          {item.color && (
                            <p style={{ fontSize: "12px", color: "rgba(229,226,225,0.5)" }}>
                              {item.color}
                            </p>
                          )}
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ fontSize: "14px", color: "#e5e2e1" }}>
                            ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {/* Stitch fallback products when cart is empty but page renders */}
                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#2a2a2a",
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                            position: "relative",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHempfEtyxGp2-jwkkUAw7VzmRE-Aga2oKHn_DSS-6gUkfR1M8Xu59slvgd1RE7TvzuT6bbpVZDficEoFZJoC4x9BdWjC2mmV_2wR70PC3oFfnI6SJWJ6t8EvxZywlFntCGdiROzi0LTD7_AAaHvVXKO9Q939j3GRNHWMaRDOtEOBcXDMP9ayvWJOympis1Dq3nXiL3ulKWoD8AsJ5q-MgRXSuXMxTMaKJCmwI7FecO13Vpi9T8PXI7gbFXTY7Kmyc71rSTksZzxg1"
                            alt="Artisan Charcoal Vase"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              backgroundColor: "#2a2a2a",
                              color: "#e5e2e1",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              border: "1px solid rgba(255,255,255,0.1)",
                              fontWeight: "600",
                            }}
                          >
                            1
                          </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#e5e2e1" }}>
                            Artisan Charcoal Vase
                          </h3>
                          <p style={{ fontSize: "12px", color: "rgba(229,226,225,0.5)" }}>
                            Matte Finish
                          </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ fontSize: "14px", color: "#e5e2e1" }}>₹ 4,500</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#2a2a2a",
                            borderRadius: "8px",
                            overflow: "hidden",
                            flexShrink: 0,
                            position: "relative",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCLYNhlSwhZ7ntOFe8tUabhfggMv--i5l-YJ3vAf3pe8lNMF73iyKRvg5kxydjjA-j7lj14Vk4Xo2Nm3eq2cLG41JSBFdxLXdylv93z5CvD98aIoOgzo2Tn0tvy1Lo1MReyGsq8GjkMjMWWzBvNOzPz9Kfap-j_oPF08D_NRWTJcHlZ4GawFS6lz4CFOnrY-8eS2D0fzLz4ShlcKs6hHDzTaJ_Be06MVo29FqQm282lGnoo7cJ7iO_VRV4MXRTAnMSV9l6cTk6D22j"
                            alt="Saffron & Cedar Candle"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "-8px",
                              right: "-8px",
                              backgroundColor: "#2a2a2a",
                              color: "#e5e2e1",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              border: "1px solid rgba(255,255,255,0.1)",
                              fontWeight: "600",
                            }}
                          >
                            2
                          </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#e5e2e1" }}>
                            Saffron &amp; Cedar Candle
                          </h3>
                          <p style={{ fontSize: "12px", color: "rgba(229,226,225,0.5)" }}>
                            250g
                          </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ fontSize: "14px", color: "#e5e2e1" }}>₹ 3,200</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Totals */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: "24px",
                    marginBottom: "32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "14px", color: "rgba(229,226,225,0.8)" }}>
                      Subtotal
                    </span>
                    <span style={{ fontSize: "14px", color: "rgba(229,226,225,0.8)" }}>
                      {mounted && items.length > 0
                        ? `₹ ${totalPrice.toLocaleString("en-IN")}`
                        : "₹ 7,700"}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "14px", color: "rgba(229,226,225,0.8)" }}>
                      Shipping
                    </span>
                    <span style={{ fontSize: "14px", color: "#6ebd8a" }}>
                      {mounted && items.length > 0
                        ? shippingCost === 0
                          ? "Free"
                          : `₹ ${shippingCost}`
                        : "Free"}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span style={{ fontSize: "20px", fontWeight: "600", color: "#e5e2e1" }}>
                      Total
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(229,226,225,0.5)",
                          marginRight: "8px",
                        }}
                      >
                        INR
                      </span>
                      <span
                        style={{ fontSize: "20px", fontWeight: "700", color: "#e8c96a" }}
                      >
                        {mounted && items.length > 0
                          ? `₹ ${orderTotal.toLocaleString("en-IN")}`
                          : "₹ 7,700"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    backgroundColor: "#e8c96a",
                    color: "#000000",
                    border: "none",
                    borderRadius: "999px",
                    padding: "16px 24px",
                    fontSize: "13px",
                    fontWeight: "600",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "24px",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    opacity: isSubmitting ? 0.7 : 1,
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,201,106,0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => {
                    if (!isSubmitting) e.currentTarget.style.transform = "scale(0.98)";
                  }}
                  onMouseUp={(e) => {
                    if (!isSubmitting) e.currentTarget.style.transform = "scale(1.02)";
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "20px",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    lock
                  </span>
                  {isSubmitting ? "Processing..." : "Pay via Razorpay"}
                </button>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    opacity: 0.6,
                    filter: "grayscale(1)",
                    marginBottom: "16px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    verified_user
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    credit_card
                  </span>
                  <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>
                    account_balance
                  </span>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "10px",
                    color: "rgba(229,226,225,0.4)",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                  }}
                >
                  100% Secure Checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#0f0f0f",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          width: "100%",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px 24px",
          }}
          className="footer-inner"
        >
          <style>{`
            @media (min-width: 768px) {
              .footer-inner {
                flex-direction: row !important;
              }
            }
          `}</style>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: "#e5e2e1",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Scoop &amp; Co.
          </div>
          <nav
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
                  fontSize: "14px",
                  color: "rgba(229,226,225,0.5)",
                  transition: "color 0.2s ease",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8c96a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229,226,225,0.5)")}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div style={{ fontSize: "14px", color: "rgba(229,226,225,0.5)" }}>
            © 2024 Scoop &amp; Co. Proudly Made in India.
          </div>
        </div>
      </footer>
    </div>
  );
}