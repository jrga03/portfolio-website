import { useEffect, useRef, useState } from "react"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

const MENU_TRANSITION_MS = 200

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMenuOpen(true)
    requestAnimationFrame(() => setMenuVisible(true))
  }

  const closeMenu = () => {
    setMenuVisible(false)
    closeTimer.current = setTimeout(() => setMenuOpen(false), MENU_TRANSITION_MS)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  // Close menu on outside click (pointerdown avoids ghost-click issues on mobile)
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!menuOpen) return
    const handleOutsidePointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu()
      }
    }
    document.addEventListener("pointerdown", handleOutsidePointer)
    return () => document.removeEventListener("pointerdown", handleOutsidePointer)
  }, [menuOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
      closeMenu()
    }
  }

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="text-lg font-bold text-text"
        >
          Jason
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-text-muted hover:text-text transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-muted hover:text-text"
          onClick={() => (menuVisible ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={`md:hidden border-t border-border bg-bg/95 backdrop-blur-md transition-all duration-200 ease-out overflow-hidden ${
            menuVisible
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-text-muted hover:text-text transition-colors py-3 min-h-[48px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
