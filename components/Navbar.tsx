"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

const PRIMARY = "#ffb59d";
const BG = "#131313";
const SURFACE = "#201f1f";
const TEXT = "#e5e2e1";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);
  const [badgePop, setBadgePop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevCount && totalItems > 0) {
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 350);
      setPrevCount(totalItems);
      return () => clearTimeout(t);
    }
    setPrevCount(totalItems);
  }, [totalItems]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks: { label: string; path: string }[] = [
    { label: "Shop", path: "/shop" },
    { label: "Artisans", path: "/artisans" },
    { label: "Story", path: "/story" },
    { label: "Journal", path: "/journal" },
  ];

  const linkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    letterSpacing: "0.04em",
    color: "rgba(229,226,225,0.72)",
    padding: "0",
    transition: "color 0.2s ease",
    textTransform: "uppercase" as const,
  };

  const iconBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: TEXT,
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "color 0.2s ease",
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(19,19,19,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled
          ? "0 4px 24px rgba(0,0,0,0.45)"
          : "none",
        transition: "box-shadow 0.3s ease",
        fontFamily: "Inter, sans-serif",
      }}
      ref={menuRef}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.25rem",
          height: "64px",
        }}
        aria-label="Main navigation"
      >
        {/* Left: Logo + desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            aria-label="Scoop & Co. home"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: PRIMARY,
              textTransform: "uppercase",
              padding: "0",
              lineHeight: 1,
            }}
          >
            Scoop &amp; Co.
          </button>

          {/* Desktop nav links */}
          <nav
            aria-label="Site sections"
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            className="hidden md:flex"
          >
            <button
              onClick={() => router.push("/shop")}
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.72)"; }}
            >
              Shop
            </button>
            <button
              onClick={() => router.push("/artisans")}
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.72)"; }}
            >
              Artisans
            </button>
            <button
              onClick={() => router.push("/story")}
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.72)"; }}
            >
              Story
            </button>
            <button
              onClick={() => router.push("/journal")}
              style={linkStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.72)"; }}
            >
              Journal
            </button>
          </nav>
        </div>

        {/* Right: icons + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Search icon */}
          <button
            aria-label="Search"
            style={iconBtnStyle}
            className="hidden md:flex"
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = TEXT; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${PRIMARY}`; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Account icon */}
          <button
            aria-label="My account"
            style={iconBtnStyle}
            className="hidden md:flex"
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = TEXT; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${PRIMARY}`; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Cart icon with badge */}
          <button
            aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            onClick={() => router.push("/cart")}
            style={{
              ...iconBtnStyle,
              position: "relative",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = TEXT; }}
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${PRIMARY}`; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                aria-live="polite"
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  minWidth: "18px",
                  height: "18px",
                  borderRadius: "9999px",
                  backgroundColor: "#e53e3e",
                  color: "#ffffff",
                  fontSize: "0.625rem",
                  fontWeight: 700,
                  fontFamily: "Inter, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                  transform: badgePop ? "scale(1.35)" : "scale(1)",
                  transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  pointerEvents: "none",
                  lineHeight: 1,
                }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Hamburger — mobile only */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              ...iconBtnStyle,
              padding: "6px",
            }}
            className="flex md:hidden"
            onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${PRIMARY}`; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
            onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "block",
                fontSize: "1.375rem",
                lineHeight: 1,
                fontFamily: "Inter, sans-serif",
                color: TEXT,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        aria-hidden={!menuOpen}
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "320px" : "0px",
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          backgroundColor: SURFACE,
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        <nav
          aria-label="Mobile navigation"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: menuOpen ? "1.25rem 1.25rem 1.5rem" : "0 1.25rem",
            gap: "0",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                router.push(link.path);
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 500,
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.05em",
                color: "rgba(229,226,225,0.8)",
                padding: "0.875rem 0",
                textAlign: "left",
                textTransform: "uppercase",
                transition: "color 0.2s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.8)"; }}
              onFocus={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = `2px solid ${PRIMARY}`; (e.currentTarget as HTMLButtonElement).style.outlineOffset = "2px"; }}
              onBlur={(e) => { (e.currentTarget as HTMLButtonElement).style.outline = "none"; }}
            >
              {link.label}
            </button>
          ))}

          {/* Mobile search + account row */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}>
            <button
              aria-label="Search"
              style={{
                ...iconBtnStyle,
                color: "rgba(229,226,225,0.72)",
                gap: "0.4rem",
                fontSize: "0.8125rem",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.72)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Search
            </button>
            <button
              aria-label="My account"
              onClick={() => { router.push("/account"); setMenuOpen(false); }}
              style={{
                ...iconBtnStyle,
                color: "rgba(229,226,225,0.72)",
                gap: "0.4rem",
                fontSize: "0.8125rem",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = PRIMARY; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(229,226,225,0.72)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Account
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}