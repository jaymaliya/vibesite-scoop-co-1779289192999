"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const PRIMARY = "#ffb59d";
const BG = "#0a0a0a";
const SURFACE = "#201f1f";
const TEXT = "#e5e2e1";
const MUTED = "#e1bfb5";
const BORDER = "rgba(255,255,255,0.08)";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [btnActive, setBtnActive] = useState(false);

  const currentYear = new Date().getFullYear();

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
  }

  const linkBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9375rem",
    fontFamily: "Inter, sans-serif",
    fontWeight: 400,
    color: "rgba(229,226,225,0.68)",
    padding: "0",
    textAlign: "left",
    transition: "color 0.2s ease",
    letterSpacing: "0.01em",
    lineHeight: "1.75",
  };

  return (
    <footer
      style={{
        backgroundColor: BG,
        borderTop: `1px solid ${BORDER}`,
        fontFamily: "Inter, sans-serif",
        color: TEXT,
      }}
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.25rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
        }}
      >
        {/* Brand column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <button
            onClick={() => router.push("/")}
            aria-label="Scoop & Co. home"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.75rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: PRIMARY,
              textTransform: "uppercase",
              padding: "0",
              lineHeight: 1,
              textAlign: "left",
            }}
          >
            Scoop &amp; Co.
          </button>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "rgba(229,226,225,0.62)",
              lineHeight: "1.75",
              maxWidth: "260px",
              margin: "0",
            }}
          >
            Small-batch artisanal gelato crafted with heritage techniques and the finest Indian ingredients. Every scoop, a story.
          </p>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              gap: "0.875rem",
              marginTop: "0.5rem",
            }}
          >
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Scoop & Co. on Instagram"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${BORDER}`,
                backgroundColor: SURFACE,
                color: MUTED,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = PRIMARY;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = PRIMARY;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = MUTED;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Scoop & Co. on Twitter"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${BORDER}`,
                backgroundColor: SURFACE,
                color: MUTED,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = PRIMARY;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = PRIMARY;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = MUTED;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER;
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.737-8.843L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Scoop & Co. on WhatsApp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: `1px solid ${BORDER}`,
                backgroundColor: SURFACE,
                color: MUTED,
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = PRIMARY;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = PRIMARY;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = MUTED;
                (e.currentTarget as HTMLAnchorElement).style.borderColor = BORDER;
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: PRIMARY,
              textTransform: "uppercase",
              margin: "0 0 0.75rem 0",
            }}
          >
            Explore
          </h3>
          <button
            onClick={() => router.push("/")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Home
          </button>
          <button
            onClick={() => router.push("/shop")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/artisans")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Artisans
          </button>
          <button
            onClick={() => router.push("/story")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Our Story
          </button>
          <button
            onClick={() => router.push("/journal")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Journal
          </button>
          <button
            onClick={() => router.push("/contact")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Contact
          </button>
        </div>

        {/* Help column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: PRIMARY,
              textTransform: "uppercase",
              margin: "0 0 0.75rem 0",
            }}
          >
            Help
          </h3>
          <button
            onClick={() => router.push("/faq")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            FAQs
          </button>
          <button
            onClick={() => router.push("/shipping")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Delivery &amp; Shipping
          </button>
          <button
            onClick={() => router.push("/returns")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Returns Policy
          </button>
          <button
            onClick={() => router.push("/privacy")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => router.push("/terms")}
            style={linkBtnStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.68)"; }}
          >
            Terms &amp; Conditions
          </button>
        </div>

        {/* Newsletter column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.125rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: PRIMARY,
              textTransform: "uppercase",
              margin: "0 0 0.25rem 0",
            }}
          >
            Stay in the Loop
          </h3>
          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(229,226,225,0.62)",
              lineHeight: "1.65",
              margin: "0",
            }}
          >
            Early access to seasonal flavours, artisan collabs, and exclusive offers — straight to your inbox.
          </p>

          {subscribed ? (
            <div
              role="status"
              aria-live="polite"
              style={{
                backgroundColor: "rgba(123,219,133,0.12)",
                border: "1px solid rgba(123,219,133,0.3)",
                borderRadius: "12px",
                padding: "0.875rem 1rem",
                fontSize: "0.875rem",
                color: "#7bdb85",
                fontFamily: "Inter, sans-serif",
                lineHeight: "1.5",
              }}
            >
              You&apos;re on the list! Watch your inbox for something delicious.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}
              aria-label="Newsletter subscription form"
            >
              <div style={{ display: "flex", gap: "0", position: "relative" }}>
                <label htmlFor="footer-email" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="your@email.com"
                  autoComplete="email"
                  aria-describedby={emailError ? "footer-email-error" : undefined}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    backgroundColor: SURFACE,
                    border: `1px solid ${emailError ? "#e05252" : BORDER}`,
                    borderRight: "none",
                    borderRadius: "12px 0 0 12px",
                    padding: "0.625rem 0.875rem",
                    fontSize: "0.875rem",
                    fontFamily: "Inter, sans-serif",
                    color: TEXT,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = PRIMARY;
                  }}
                  onBlur={(e) => {
                    (e.currentTarget as HTMLInputElement).style.borderColor = emailError ? "#e05252" : BORDER;
                  }}
                />
                <button
                  type="submit"
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => { setBtnHover(false); setBtnActive(false); }}
                  onMouseDown={() => setBtnActive(true)}
                  onMouseUp={() => setBtnActive(false)}
                  onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${PRIMARY}`; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
                  onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
                  style={{
                    backgroundColor: btnHover ? "#e89e84" : PRIMARY,
                    color: "#131313",
                    border: "none",
                    borderRadius: "0 12px 12px 0",
                    padding: "0.625rem 1rem",
                    fontSize: "0.8125rem",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transform: btnActive ? "scale(0.97)" : "scale(1)",
                    transition: "background-color 0.2s ease, transform 0.15s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  Subscribe
                </button>
              </div>
              {emailError && (
                <p
                  id="footer-email-error"
                  role="alert"
                  style={{
                    fontSize: "0.8125rem",
                    color: "#e05252",
                    margin: "0",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {emailError}
                </p>
              )}
            </form>
          )}

          {/* Trust badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 0.875rem",
              borderRadius: "10px",
              border: `1px solid ${BORDER}`,
              backgroundColor: "rgba(255,255,255,0.03)",
              marginTop: "0.25rem",
              width: "fit-content",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span
              style={{
                fontSize: "0.75rem",
                color: MUTED,
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Proudly Made in India
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${BORDER}`, maxWidth: "1280px", margin: "0 auto" }} />

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.25rem 1.25rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            fontSize: "0.8125rem",
            color: "rgba(229,226,225,0.42)",
            fontFamily: "Inter, sans-serif",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          &copy; {currentYear} Scoop &amp; Co. All rights reserved. Payments secured by Razorpay.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => router.push("/privacy")}
            style={{
              ...linkBtnStyle,
              fontSize: "0.8125rem",
              color: "rgba(229,226,225,0.42)",
              lineHeight: "1.5",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.42)"; }}
          >
            Privacy
          </button>
          <button
            onClick={() => router.push("/terms")}
            style={{
              ...linkBtnStyle,
              fontSize: "0.8125rem",
              color: "rgba(229,226,225,0.42)",
              lineHeight: "1.5",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.42)"; }}
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
}