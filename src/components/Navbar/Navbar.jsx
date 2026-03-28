import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./Navbar.module.css";

const NAV_LINKS = ["Home", "Work", "Contact"];

// ── Desktop Clip-Path Reveal link ────────────────────────────────────────────────────
function NavLink({ label, isActive, onClick }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const top = wrap.querySelector("[data-top]");
    const bottom = wrap.querySelector("[data-bottom]");
    const underline = wrap.querySelector("[data-underline]");

    gsap.set(bottom, { y: "100%" });

    const onMouseEnter = () => {
      gsap.to(top, { y: "-100%", duration: 0.4, ease: "power3.out" });
      gsap.to(bottom, { y: "0%", duration: 0.4, ease: "power3.out" });
      gsap.to(underline, { scaleX: 1, duration: 0.35, ease: "power3.out" });
      gsap.to(wrap, { opacity: 1, duration: 0.25 });
    };

    const onMouseLeave = () => {
      gsap.to(top, { y: "0%", duration: 0.4, ease: "power3.out" });
      gsap.to(bottom, { y: "100%", duration: 0.4, ease: "power3.out" });
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.3,
        ease: "power3.in",
        onComplete: () =>
          gsap.set(underline, { transformOrigin: "left center" }),
      });
      if (!isActive) gsap.to(wrap, { opacity: 0.35, duration: 0.25 });
    };

    wrap.addEventListener("mouseenter", onMouseEnter);
    wrap.addEventListener("mouseleave", onMouseLeave);
    return () => {
      wrap.removeEventListener("mouseenter", onMouseEnter);
      wrap.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isActive]);

  return (
    <li
      ref={wrapRef}
      className={`${styles.navItem} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}
      onClick={() => onClick(label)}
    >
      {/* clip window */}
      <span className={styles.clipWindow}>
        <span data-top className={styles.labelTop}>
          {label}
        </span>
        <span data-bottom className={styles.labelBottom}>
          {label}
        </span>
      </span>
      <span data-underline className={styles.underline} />
    </li>
  );
}

// ── Mobile menu link ─────────────────────────────────────────────────────────
function MobileLink({ label, isActive, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.set(ref.current, { opacity: 0, y: 48 });
  }, []);

  return (
    <li
      ref={ref}
      className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ""}`}
      onClick={() => onClick(label)}
      data-mobile-link
    >
      {label}
    </li>
  );
}

// ── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const overlayRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const borderRef = useRef(null);

  const [theme, setTheme] = useState("dark");
  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const isAnimating = useRef(false);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.2 },
    );
    if (linksRef.current) {
      tl.fromTo(
        linksRef.current.querySelectorAll(`.${styles.navItem}`),
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.4",
      );
    }
    tl.fromTo(
      borderRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    );
  }, []);

  // Section theme detection
  useEffect(() => {
    const sections = document.querySelectorAll("[data-theme]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setTheme(entry.target.dataset.theme || "dark");
        });
      },
      { threshold: 0, rootMargin: "-63px 0px -100% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Nav color tween
  useEffect(() => {
    if (menuOpen) return;
    gsap.to(navRef.current, {
      color: theme === "dark" ? "#ffffff" : "#0a0a0a",
      "--nav-border":
        theme === "dark" ? "rgba(255, 255, 255, 0.218)" : "rgba(0, 0, 0, 0.15)",
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [theme, menuOpen]);

  const openMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMenuOpen(true);
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const mobileLinks = overlay.querySelectorAll("[data-mobile-link]");

    // 2 lines → cross
    gsap.to(line1Ref.current, {
      rotate: 45,
      y: 5,
      duration: 0.35,
      ease: "power3.inOut",
    });
    gsap.to(line2Ref.current, {
      rotate: -45,
      y: -5,
      duration: 0.35,
      ease: "power3.inOut",
    });

    // Force nav text to dark for overlay
    gsap.to(navRef.current, { color: "#0a0a0a", duration: 0.3 });

    gsap.set(overlay, { display: "flex" });
    gsap
      .timeline({
        onComplete: () => {
          isAnimating.current = false;
        },
      })
      .fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" },
      )
      .fromTo(
        mobileLinks,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.45, ease: "power3.out" },
        "-=0.25",
      );
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const overlay = overlayRef.current;
    const mobileLinks = overlay.querySelectorAll("[data-mobile-link]");

    // cross → 2 lines
    gsap.to(line1Ref.current, {
      rotate: 0,
      y: 0,
      duration: 0.35,
      ease: "power3.inOut",
    });
    gsap.to(line2Ref.current, {
      rotate: 0,
      y: 0,
      duration: 0.35,
      ease: "power3.inOut",
    });

    // Restore theme color
    gsap.to(navRef.current, {
      color: theme === "dark" ? "#ffffff" : "#0a0a0a",
      duration: 0.3,
      delay: 0.4,
    });

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setMenuOpen(false);
          isAnimating.current = false;
          document.body.style.overflow = "";
        },
      })
      .to(mobileLinks, {
        opacity: 0,
        y: -20,
        stagger: 0.04,
        duration: 0.25,
        ease: "power3.in",
      })
      .to(
        overlay,
        { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "power4.inOut" },
        "-=0.1",
      );
  }, [theme]);

  const handleLinkClick = (label) => {
    setActiveLink(label);
    if (menuOpen) closeMenu();
  };

  return (
    <>
      <nav ref={navRef} className={styles.navbar} aria-label="Main navigation">
        <span ref={logoRef} className={styles.logo}>
          Prashant Warghude
        </span>

        <span ref={borderRef} className={styles.navBorder} />

        {/* Desktop links */}
        <ul ref={linksRef} className={styles.navLinks} role="list">
          {NAV_LINKS.map((label) => (
            <NavLink
              key={label}
              label={label}
              isActive={activeLink === label}
              onClick={handleLinkClick}
            />
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className={styles.hamburger}
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span ref={line1Ref} className={styles.hLine} />
          <span ref={line2Ref} className={styles.hLine} />
        </button>
      </nav>

      {/* Full-screen mobile overlay */}
      <div ref={overlayRef} className={styles.mobileOverlay}>
        <ul className={styles.mobileNavLinks} role="list">
          {NAV_LINKS.map((label) => (
            <MobileLink
              key={label}
              label={label}
              isActive={activeLink === label}
              onClick={handleLinkClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
