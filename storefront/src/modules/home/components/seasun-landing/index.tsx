"use client"

// ====================================================================================
// # CLAUDE REFERENCE INFORMATION - SEASUN LANDING PAGE
// ====================================================================================
//
// ## COMPONENT ARCHITECTURE
// Complete one-page landing for SEASUN Caribbean beauty product
//
// ### Core Architecture
// - State Management: Newsletter signup, FAQ accordion states
// - Event Handlers: Form submissions, accordion toggles
// - Inline Components: FAQItem for consistent styling
//
// ### Component Hierarchy
// SeasunLanding
// ├── Hero Section (How does it feel to be SUNKISSED?)
// ├── Product Benefits Section
// ├── Problem/Solution Section
// ├── FAQ Section (accordion style)
// ├── Instagram Gallery
// └── Newsletter Signup
//
// ### Visual Layout
// - Full-width sections with alternating backgrounds
// - Hero with product image on gradient background
// - Benefits grid with icons
// - FAQ accordion with smooth animations
// - Instagram grid gallery at bottom
//
// ## STYLING APPROACH
// Uses existing Tailwind classes with SEASUN brand colors
// Maintains consistency with existing Medusa UI components
// ====================================================================================

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button, Input } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import EmbeddedProductDisplay from "@modules/home/components/embedded-product-display"

interface FAQItem {
  question: string
  answer: string
}

type SeasunLandingProps = {
  countryCode: string
  region: HttpTypes.StoreRegion
  product: HttpTypes.StoreProduct | null
}

// ============================================================================
// INGREDIENT DATA
// ============================================================================
type Ingredient = {
  id: string
  name: string
  emoji: string
  description: string
  style: React.CSSProperties
  className?: string
}

const ingredients: Ingredient[] = [
  {
    id: "coconut-oil",
    name: "Coconut Oil",
    emoji: "🥥",
    description: "Deep Moisture... retains hydration so your tan develops smoothly, not in dry patches.",
    style: {
      position: 'absolute',
      // Simple percentage positioning on Image element
      top: '41%',
      left: '61%',
      transform: 'translate(-50%, -50%) rotate(-1deg)'  // Center on coordinates
    },
    className: 'coconut-pill'
  },
  {
    id: "cinnamon",
    name: "Cinnamon",
    emoji: "🌶️",
    description: "Circulation Boost... increases blood flow so pigment spreads evenly for that sun-kissed warmth.",
    style: {
      position: 'absolute',
      // Temporary visual adjustment until bottle PNG is edited
      top: '57%',
      left: '82%',  // Slightly right for visual alignment
      transform: 'translate(-50%, -50%) rotate(1deg)'  // Center on coordinates
    },
    className: 'cinnamon-pill'
  },
  {
    id: "annatto",
    name: "Annatto",
    emoji: "☀️",
    description: "Golden Tint... infuses a natural warmth, deepening your tan with a vibrant glow.",
    style: {
      position: 'absolute',
      // Simple percentage positioning on Image element
      top: '69%',
      left: '62%',
      transform: 'translate(-50%, -50%) rotate(-0.5deg)'  // Center on coordinates
    },
    className: 'annatto-pill'
  }
]

// ============================================================================
// INGREDIENT PILL COMPONENT
// ============================================================================
function IngredientPill({ id, name, emoji, description, style, className = '' }: Ingredient) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const pillRef = useRef<HTMLDivElement>(null);
  
  const toggleExpand = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  
  // Add event listener to handle clicks outside the pill
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);
  
  return (
    <div 
      ref={pillRef}
      className={`hidden small:block pointer-events-auto transition-all duration-500 relative ${className}`}
      style={{
        ...style,
        zIndex: isExpanded ? 50 : 30,
        transform: isHovered && !isExpanded
          ? `${style.transform?.toString()} scale(1.05)` 
          : style.transform,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => !isExpanded && setIsHovered(false)}
      onClick={toggleExpand}
    >
      {/* Ingredient Pill */}
      <div 
        className="backdrop-blur-lg px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer transition-all duration-300 relative"
        aria-expanded={isExpanded}
        aria-controls={`ingredient-info-${id}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleExpand(e)}
        style={{
          background: id === "coconut-oil" 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 253, 240, 0.75) 100%)' 
            : id === "cinnamon" 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 241, 230, 0.7) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 250, 230, 0.7) 100%)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          transition: 'all 0.3s ease-out'
        }}
      >
        <span className="text-lg" aria-hidden="true">{emoji}</span>
        <p className="seasun-body text-sm font-bold" style={{ color: 'var(--seasun-deep-black)' }}>{name}</p>
        <span 
          className="text-sm transition-transform duration-300"
          style={{ 
            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
            color: 'var(--seasun-deep-black)'
          }}
          aria-hidden="true"
        >
          +
        </span>
      </div>
      
      {/* Expandable Content */}
      <div 
        id={`ingredient-info-${id}`}
        className="absolute top-full left-0 mt-2 backdrop-blur-lg px-4 py-3 rounded-xl w-64 overflow-hidden transition-all duration-500"
        style={{
          background: id === "coconut-oil" 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 253, 240, 0.7) 100%)' 
            : id === "cinnamon" 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 241, 230, 0.65) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 250, 230, 0.65) 100%)',
          maxHeight: isExpanded ? '200px' : '0px',
          opacity: isExpanded ? 1 : 0,
          padding: isExpanded ? '0.75rem 1rem' : '0 1rem',
          zIndex: 100,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          transform: isExpanded ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, -10px, 0) scale(0.98)',
          pointerEvents: isExpanded ? 'auto' : 'none'
        }}
        aria-hidden={!isExpanded}
      >
        <p className="seasun-body text-sm leading-relaxed" style={{ 
          color: 'var(--seasun-deep-black)', 
          textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)'
        }}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default function SeasunLanding({ region, product }: SeasunLandingProps) {
  // countryCode available for future country-specific content
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [email, setEmail] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // ============================================================================
  // REFS
  // ============================================================================
  const productSectionRef = useRef<HTMLElement>(null)

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement newsletter signup
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      alert("Thank you for subscribing!")
    }, 1000)
  }

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index)
  }
  
  const scrollToProductSection = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  

  // ============================================================================
  // DATA
  // ============================================================================
  const faqs: FAQItem[] = [
    {
      question: "Why would this work when nothing else has?",
      answer: "I hear you-skepticism is the sensible response after endless letdowns. I felt that same frustration. Here's the key: most formulas battle against your skin's rhythm. SEASUN teams up with your body's natural chemistry, guiding it to an even, radiant tan. That's why women who've tried every bottle on the shelf finally see real results here."
    },
    {
      question: "What if my sensitive skin flares up?",
      answer: "Totally valid worry. I've walked in your shoes-sensitive skin isn't a minor annoyance; it's a deal-breaker. That's why SEASUN skips the harsh chemicals and artificial scents that trigger reactions. But let's be honest, your bigger fear is the regret of yet another dud. I get it. So if your skin doesn't adore SEASUN, you owe nothing-no questions asked."
    },
    {
      question: "Isn't coconut oil alone enough?",
      answer: "That makes perfect sense-you're drawn to simple, natural fixes. Coconut oil hydrates, yes, but it can't even out your tan by itself. Seasun's magic comes from the precise harmony of coconut, cinnamon, and annatto-three powerhouses working together to protect, nourish, and balance your glow. It's this exact blend-nothing more, nothing less-that delivers what plain oil can't."
    },
    {
      question: "Am I just overpaying for a fancy label?",
      answer: "I get it-price matters when you've burned through your budget on empty promises. Here's the difference: Seasun isn't padded with fillers or cheap additives. Every drop is packed with purpose-driven, natural actives. And because it works so efficiently, you use less each application-making Seasun more cost-effective over time than the bargain brands you end up repurchasing month after month."
    }
  ]

  const instagramImages = [
    "/beach-sunset.jpg",
    "/beach-chair.jpg", 
    "/ocean-view.jpg",
    "/beach-rocks.jpg",
    "/palm-trees.jpg",
    "/coastal-path.jpg"
  ]

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <div className="w-full">
      {/* Breakpoint indicator - visual aid for responsive debugging */}
      <div className="breakpoint-indicator"></div>
      {/* 
      ===============================================================
      HERO SECTION - APPLE-INSPIRED RESPONSIVE APPROACH
      ===============================================================
      
      Key principles:
      1. Content-first vs device-first: Using natural content breakpoints
      2. Fluid typography: Text that scales smoothly across viewport sizes
      3. Proportional spacing: Elements that maintain visual relationships 
      4. Intrinsic design: Layout responds to content needs, not fixed sizes

      Implementation techniques:
      - clamp(): For fluid values that scale between min/max bounds
      - calc(): For responsive mathematical calculations
      - min()/max(): For constraining values responsively
      - CSS variables: For consistent values across components
      */}
      <section 
        className="relative flex items-center justify-center"
        style={{
          /* 
          FLUID HEIGHT: Instead of fixed 100vh (which causes mobile issues),
          use clamp() to set minimum height while allowing natural expansion.
          This prevents content overflow on small screens.
          */
          minHeight: 'clamp(500px, 100vh, 900px)',
          /* Allows proper spacing on ultra-tall screens */
          paddingTop: 'clamp(2rem, 8vh, 6rem)',
          paddingBottom: 'clamp(2rem, 8vh, 6rem)',
        }}
        role="banner"
        aria-labelledby="hero-heading"
        aria-describedby="hero-description"
      >
        {/* 
        CONTENT CONTAINER: 
        - Using min() for max-width creates a fluid container that responds to viewport
        - Percentage-based horizontal padding (5vw) creates proportional spacing
        - Maintains centered alignment with auto margins
        */}
        <div className="relative w-full mx-auto" style={{ 
          maxWidth: 'min(90vw, 1400px)', 
          padding: '0 clamp(1rem, 5vw, 3rem)'
        }}>
          {/* 
          RESPONSIVE GRID: 
          - Single column by default (mobile-first)
          - Two columns at larger screens (lg:grid-cols-2)
          - Gap scales with viewport to maintain consistent visual rhythm
          */}
          <div className="relative grid lg:grid-cols-2 items-center" style={{
            gap: 'clamp(2rem, 5vw, 5rem)', 
            minHeight: 'clamp(400px, 70vh, 700px)'
          }}>
            
            {/* 
            TEXT CONTENT CONTAINER: 
            - Centered on mobile, left-aligned on larger screens
            - Padding scales proportionally with viewport
            - Max-width prevents excessively long line lengths
            */}
            <div className="relative text-center sm:text-left" style={{
              paddingLeft: 'clamp(0rem, 2vw, 3rem)',
              maxWidth: 'min(100%, 640px)',
              margin: '0 auto lg:0',
            }}>
              {/* 
              HEADING: 
              - Uses clamp() for fluid typography that scales smoothly
              - Maintains proper visual hierarchy with proportional line heights
              - Eliminates multiple breakpoint-specific text sizes
              */}
              <h1 
                id="hero-heading"
                style={{ 
                  fontFamily: 'var(--seasun-font-heading)', /* Changed from decorative to regular Cinzel */
                  color: 'var(--seasun-deep-black)',
                  letterSpacing: '0.05em',
                  marginBottom: 'clamp(1.5rem, 5vh, 3rem)',
                  /* Create better visual rhythm with a more natural line height */
                  lineHeight: '1.1',
                }}
              >
                {/* 
                HERO LINE 1: 
                - Font size scales fluidly between 1.5rem (24px) and 3.5rem (56px)
                - Maintains specific font weight characteristics
                */}
                <span 
                  className="block seasun-hero-line-1"
                  style={{ 
                    fontWeight: 'bold', /* Changed from light to bold */
                    fontFamily: 'var(--seasun-font-heading)', /* Changed from decorative to regular Cinzel */
                    color: 'var(--seasun-deep-black)',
                    fontSize: 'clamp(1.25rem, 1.5vw + 0.75rem, 2.75rem)' /* Reduced size */
                  }}
                >
                  The glow
                </span>
                
                {/* 
                HERO LINE 2: 
                - Slightly larger than line 1 for visual emphasis
                - Margin scales proportionally with viewport
                */}
                <span 
                  className="block seasun-hero-line-2"
                  style={{ 
                    fontWeight: 'bold', /* Changed from medium to bold */
                    marginTop: 'clamp(0.25rem, 1vh, 0.75rem)',
                    fontFamily: 'var(--seasun-font-heading)', /* Changed from decorative to regular Cinzel */
                    color: 'var(--seasun-deep-black)',
                    fontSize: 'clamp(1.5rem, 2.5vw + 0.75rem, 3.25rem)' /* Reduced size */
                  }}
                >
                  you've been
                </span>
                
                {/* 
                HERO LINE 3: 
                - Largest line for maximum impact
                - Semi-bold weight enhances visual hierarchy
                */}
                <span 
                  className="block seasun-hero-line-3"
                  style={{ 
                    fontWeight: 'bold', /* Changed from semi-bold to bold */
                    marginTop: 'clamp(0.5rem, 1.5vh, 1rem)',
                    fontFamily: 'var(--seasun-font-heading)', /* Changed from decorative to regular Cinzel */
                    color: 'var(--seasun-deep-black)',
                    fontSize: 'clamp(1.75rem, 3vw + 0.75rem, 3.75rem)' /* Reduced size */
                  }}
                >
                  searching for
                </span>
              </h1>
              
              {/* 
              TAGLINE & CTA CONTAINER: 
              - Proportional bottom margin scales with viewport
              - Creates consistent spacing relationship with heading
              */}
              <div style={{ 
                marginBottom: 'clamp(1.5rem, 5vh, 3rem)'
              }}>
                {/* 
                TAGLINE: 
                - Fluid typography scales between 1rem (16px) and 1.5rem (24px)
                - Maintains proper spacing relationship with heading
                */}
                <p 
                  className="seasun-body font-light italic text-center sm:text-left" 
                  style={{ 
                    color: 'var(--seasun-deep-black)', 
                    opacity: 0.85,
                    marginTop: 'clamp(1rem, 3vh, 2rem)',
                    fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',
                    lineHeight: '1.6',
                  }}
                  id="hero-description"
                  role="text"
                >
                  How does it feel to be
                  {/* 
                  ENHANCED TEXT: 
                  - Scaled in proportion to surrounding text
                  - Maintains proper visual weight with consistent font styling
                  */}
                  <span 
                    className="seasun-sunkissed-enhanced"
                    style={{
                      fontWeight: 'bold', /* Changed from seasun-font-bold to bold */
                      fontFamily: 'var(--seasun-font-heading)', /* Changed from decorative to regular Cinzel */
                      letterSpacing: '0.15em',
                      fontStyle: 'normal',
                      marginLeft: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                      fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)', /* Reduced size */
                    }}
                    aria-label="SUNKISSED"
                  >
                    SUNKISSED
                  </span>?
                </p>
                
                {/* 
                CTA BUTTON CONTAINER: 
                - Maintains consistent alignment with text content
                - Scales margin proportionally with viewport
                */}
                <div className="flex justify-start lg:justify-start text-left" style={{
                  marginTop: 'clamp(1.5rem, 4vh, 3rem)'
                }}>
                  {/* 
                  CTA BUTTON: 
                  - Padding scales proportionally with viewport
                  - Text size scales for proper readability
                  - Maintains consistent visual appearance across devices
                  */}
                  <button
                    onClick={scrollToProductSection}
                    className="group relative seasun-body text-white rounded-xl font-medium overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:ring-offset-4 focus:ring-offset-transparent"
                    style={{ 
                      backgroundColor: 'var(--seasun-golden-tan)',
                      boxShadow: '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      /* Fluid padding creates consistent visual weight */
                      padding: 'clamp(0.5rem, 1vh, 0.75rem) clamp(1rem, 2vw, 2rem)',
                      /* Button text scales appropriately with viewport */
                      fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 16px 48px rgba(247, 138, 21, 0.5), 0 6px 16px rgba(247, 138, 21, 0.3)';
                      e.currentTarget.style.backgroundColor = '#fa9322';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)';
                      e.currentTarget.style.backgroundColor = 'var(--seasun-golden-tan)';
                    }}
                    aria-label="See product details"
                  >
                    <span className="relative z-10 seasun-body tracking-wide font-semibold">See for yourself</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </button>
                </div>
              </div>
            </div>
            
            {/* 
            RIGHT COLUMN: Empty placeholder for future content
            - Maintains proper sizing relationship with left column
            - Will eventually contain the bottle image
            */}
            <div className="relative" style={{
              minHeight: 'clamp(200px, 50vh, 500px)',
            }}></div>
          </div>
        </div>
      </section>

      {/* Mobile Ingredient Showcase - Only visible on mobile */}
      <section className="py-10 sm:hidden seasun-section-overlay" aria-labelledby="mobile-ingredients-heading">
        <div className="container mx-auto px-4">
          <h2 
            id="mobile-ingredients-heading" 
            className="text-xl font-light mb-6 text-center"
            style={{ 
              fontFamily: 'var(--seasun-font-heading)', 
              color: 'var(--seasun-deep-black)'
            }}
          >
            Powerful Natural Ingredients
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {ingredients.map(ingredient => (
              <div key={ingredient.id} className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/50 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">{ingredient.emoji}</span>
                    <h3 className="text-base font-medium" style={{ color: 'var(--seasun-deep-black)' }}>{ingredient.name}</h3>
                  </div>
                  <p className="seasun-body text-sm leading-relaxed" style={{ color: 'var(--seasun-deep-black)', opacity: 0.85 }}>
                    {ingredient.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* All sections below hero wrapped in seamless gradient */}
      <div className="seasun-content-gradient">
        {/* Trust/Problem Section */}
        <section className="py-20 sm:py-24 lg:py-28 relative seasun-section-overlay" aria-labelledby="trust-problem-heading">
        
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-16">
              <h2 id="trust-problem-heading" className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
                I understand your <span className="underline decoration-2 underline-offset-4" style={{ textDecorationColor: 'var(--seasun-golden-tan)' }}>frustration</span>...
              </h2>
              <div className="w-16 h-0.5 mx-auto rounded-full opacity-60" style={{ backgroundColor: 'var(--seasun-deep-black)' }}></div>
            </div>
            
            <div className="mb-16 max-w-3xl mx-auto" role="text" aria-describedby="trust-problem-heading">
              <div className="space-y-6 text-center">
                <p className="seasun-body text-base sm:text-lg md:text-xl leading-relaxed font-light" style={{ color: 'var(--seasun-deep-black)', opacity: 0.85 }}>
                  Look, I get it. You've probably tried so many products that promised to fix your uneven skin tone, and none of them worked. It's exhausting. At this point, you're probably looking at this thinking, 'Yeah, right - here's another one making big claims.' I don't blame you for being skeptical. Your bathroom cabinet probably has the evidence of money wasted on disappointments.
                </p>
                <p className="seasun-body text-base sm:text-lg md:text-xl leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.9 }}>
                  That's exactly how I felt too. After years of disappointment, I started to believe maybe uneven skin tone was just something I had to live with.
                </p>
                
                <div className="pt-6">
                  <p className="seasun-body text-lg sm:text-xl md:text-2xl leading-relaxed font-medium" style={{ 
                    color: 'var(--seasun-deep-black)', 
                    opacity: 1,
                    borderLeft: '3px solid var(--seasun-golden-tan)',
                    paddingLeft: '1rem',
                    margin: '2rem auto',
                    maxWidth: '80%',
                  }}>
                    That's why SEASUN had to be different.
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={scrollToProductSection}
              className="group relative seasun-body text-white px-8 py-4 sm:px-12 sm:py-5 text-base sm:text-lg rounded-2xl font-semibold overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:ring-offset-4 focus:ring-offset-transparent w-full sm:w-auto min-h-[60px] sm:min-h-[64px]"
              style={{ 
                backgroundColor: 'var(--seasun-golden-tan)',
                boxShadow: '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(247, 138, 21, 0.5), 0 6px 16px rgba(247, 138, 21, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)';
              }}
              aria-label="Discover the Caribbean beauty secret to solve your skincare frustrations"
              role="button"
              tabIndex={0}
            >
              <span className="relative z-10 seasun-body tracking-wide font-semibold">Discover the Secret</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </Button>
          </div>
        </div>
      </section>


      {/* Ritual Section */}
      <section className="py-20 sm:py-24 lg:py-28 seasun-section-overlay" aria-labelledby="ritual-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 id="ritual-heading" className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
              It's time for a ritual of{" "}
              <span style={{ color: 'var(--seasun-golden-tan)', fontWeight: '500' }} aria-label="glowing skin">GLOWING SKIN</span>{" "}
              - what's in your way?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto" role="region" aria-labelledby="ritual-heading">
            <article className="group relative" aria-labelledby="old-way-heading">
              <div className="p-6 sm:p-8 lg:p-10 rounded-3xl relative overflow-hidden border shadow-xl transition-all duration-300 hover:shadow-2xl" style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)', 
                backdropFilter: 'blur(12px)',
                borderColor: 'rgba(0,0,0,0.1)'
              }}>
                {/* Emoji removed */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-orange-50/20"></div>
                <div className="relative z-10">
                  <h3 id="old-way-heading" className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>The Old Way</h3>
                  <ul className="space-y-6" role="list" aria-label="Problems with traditional skincare approaches">
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <span className="text-red-600 text-lg font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>12-step routines that take forever</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <span className="text-red-600 text-lg font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Harsh chemicals that irritate</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <span className="text-red-600 text-lg font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Expensive treatments with minimal results</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <span className="text-red-600 text-lg font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Constant worry about sun damage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
            
            <article className="group relative" aria-labelledby="seasun-way-heading">
              <div className="p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02]" style={{ background: 'linear-gradient(135deg, var(--seasun-deeper-blue) 0%, var(--seasun-ocean-blue) 100%)' }}>
                {/* Emoji removed */}
                <div className="absolute inset-0 bg-white/3"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <h3 id="seasun-way-heading" className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-white leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)' }}>The SEASUN Way</h3>
                  <ul className="space-y-6" role="list" aria-label="Benefits of SEASUN Caribbean skincare approach">
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V4C12.75 4.41421 12.4142 4.75 12 4.75C11.5858 4.75 11.25 4.41421 11.25 4V2C11.25 1.58579 11.5858 1.25 12 1.25ZM3.66865 3.71609C3.94815 3.41039 4.42255 3.38915 4.72825 3.66865L6.95026 5.70024C7.25596 5.97974 7.2772 6.45413 6.9977 6.75983C6.7182 7.06553 6.2438 7.08677 5.9381 6.80727L3.71609 4.77569C3.41039 4.49619 3.38915 4.02179 3.66865 3.71609ZM20.3314 3.71609C20.6109 4.02179 20.5896 4.49619 20.2839 4.77569L18.0619 6.80727C17.7562 7.08677 17.2818 7.06553 17.0023 6.75983C16.7228 6.45413 16.744 5.97974 17.0497 5.70024L19.2718 3.66865C19.5775 3.38915 20.0518 3.41039 20.3314 3.71609ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H4C4.41421 11.25 4.75 11.5858 4.75 12C4.75 12.4142 4.41421 12.75 4 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM19.25 12C19.25 11.5858 19.5858 11.25 20 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H20C19.5858 12.75 19.25 12.4142 19.25 12ZM17.0255 17.0252C17.3184 16.7323 17.7933 16.7323 18.0862 17.0252L20.3082 19.2475C20.6011 19.5404 20.601 20.0153 20.3081 20.3082C20.0152 20.6011 19.5403 20.601 19.2475 20.3081L17.0255 18.0858C16.7326 17.7929 16.7326 17.3181 17.0255 17.0252ZM6.97467 17.0253C7.26756 17.3182 7.26756 17.7931 6.97467 18.086L4.75244 20.3082C4.45955 20.6011 3.98468 20.6011 3.69178 20.3082C3.39889 20.0153 3.39889 19.5404 3.69178 19.2476L5.91401 17.0253C6.2069 16.7324 6.68177 16.7324 6.97467 17.0253ZM12 19.25C12.4142 19.25 12.75 19.5858 12.75 20V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V20C11.25 19.5858 11.5858 19.25 12 19.25Z" fill="currentColor"></path>
                          <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" fill="currentColor"></path>
                        </svg>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">Uneven skin tone doesn't have to be your reality anymore</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512" className="text-white">
                          <path fill="currentColor" d="M433.814 68.664c-2.74.05-5.495.423-8.242 1.152-8.47 2.25-15.3 7.512-20.44 14.49C292.905 120.865 186.494 154.58 75.276 190.4c-39.714 12.79-64.6 51.163-53.006 86.784 11.597 35.62 54.342 52.277 94.035 39.277l-.002.002c109.41-35.827 214.424-69.036 325.12-104.656.56.212 1.13.39 1.694.58-2.62 2.935-4.226 6.796-4.226 11.04 0 9.164 7.43 16.593 16.594 16.593 9.165 0 16.596-7.43 16.596-16.593 0-4.32-1.664-8.24-4.367-11.192 12.75-4.865 21.353-16.866 25.535-30.898 4.547-15.257 4.504-33.654-.584-52.48-5.088-18.828-14.327-34.77-25.94-45.712-8.712-8.206-19.263-13.79-30.175-14.43-.91-.052-1.822-.07-2.736-.054zm.497 18.68c.455-.007.914.005 1.377.035 5.567.358 11.818 3.34 18.22 9.37 8.535 8.04 16.44 21.165 20.716 36.986 3.622 13.4 4 26.397 2.012 36.852h-52.783c-3.517-6.207-6.512-13.352-8.622-21.158-4.276-15.822-4.046-31.094-.716-42.266 3.33-11.172 9.122-17.497 15.855-19.285 1.262-.336 2.578-.517 3.94-.536zm-38.414 17.043c-3.815 14.734-3.516 32.133 1.29 49.92 1.544 5.707 3.472 11.143 5.728 16.26h-151.22c-64.405 20.742-125.856 40.507-163.35 52.59-23.24 7.486-35.353 27.407-30.406 42.593 4.946 15.188 26.582 24.333 49.75 16.75 66.89-21.89 199.01-64.39 302.822-97.803 3.76 5.807 7.998 10.967 12.62 15.323.066.06.135.118.2.18-104.876 33.753-241.66 77.74-309.83 100.05-30.827 10.09-64.424-1.334-73.344-28.72-8.92-27.385 11.603-56.22 42.438-66.155 68.055-21.93 208.2-66.996 313.302-100.988zm59.58 180.205c-16.948 63.255-40.507 54.472-40.507 91.5 0 22.36 18.146 40.508 40.507 40.508 22.36 0 40.507-18.147 40.507-40.508 0-39.97-23.256-27.12-40.507-91.5z"></path>
                        </svg>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">Chemical-filled products aren't what your skin is looking for</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1024 1024" className="text-white">
                          <path fill="currentColor" d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                        </svg>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">Your natural beauty deserves to be enhanced, not masked</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24 lg:py-28 seasun-section-overlay" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl lg:text-4xl font-light text-center mb-12 leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
              HONEST ANSWERS TO YOUR <span style={{ color: 'var(--seasun-golden-tan)', fontWeight: '500' }}>REAL CONCERNS</span>
            </h2>
            
            {/* FAQ Questions */}
            <div className="space-y-4 sm:space-y-6 mb-8" role="region" aria-labelledby="faq-heading">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="group/card bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/30 hover:shadow-xl hover:bg-white/90 transition-all duration-500 ease-out"
                  style={{
                    transform: expandedFAQ === index ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <h3>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="group w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-6 text-left flex justify-between items-center hover:bg-white/20 transition-all duration-500 ease-out focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-transparent min-h-[60px] sm:min-h-[68px]"
                      aria-expanded={expandedFAQ === index}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      type="button"
                    >
                      <span className="seasun-body text-sm sm:text-base lg:text-lg font-medium leading-relaxed group-hover:opacity-90 transition-opacity duration-300 pr-3" style={{ color: 'var(--seasun-deep-black)' }}>{faq.question}</span>
                      <span 
                        className="text-xl sm:text-2xl transition-all duration-500 ease-out group-hover:scale-110 flex-shrink-0 ml-2 sm:ml-4 min-w-[24px] min-h-[24px] flex items-center justify-center" 
                        style={{ 
                          color: 'var(--seasun-deep-black)', 
                          transform: expandedFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: expandedFAQ === index ? '600px' : '0px',
                      opacity: expandedFAQ === index ? 1 : 0
                    }}
                  >
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-4 pb-5 sm:px-6 sm:pb-6 lg:px-8 lg:pb-6 border-t border-gray-100"
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      style={{
                        transform: expandedFAQ === index ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'transform 0.3s ease-out 0.2s'
                      }}
                    >
                      <p className="seasun-body text-xs sm:text-sm lg:text-base leading-relaxed pt-3 sm:pt-4 font-light" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Final message - separated from the FAQ questions with proper spacing */}
            <div className="pt-8 pb-4 max-w-3xl mx-auto border-t border-gray-100/30">
              <p className="text-base sm:text-lg leading-relaxed font-normal text-center" style={{ color: 'var(--seasun-deep-black)', opacity: 0.85, fontFamily: 'var(--seasun-font-body)' }}>
                It sounds like you've been let down before-and that kind of doubt makes perfect sense. What if you could test SEASUN risk-free and see for yourself? How would it feel to finally get the even, glowing tan you've been chasing? Reach out at <span style={{ color: 'var(--seasun-deeper-blue)', fontWeight: '500' }}>hello@seasun.com</span> and let's find your answer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section className="py-28 relative seasun-section-overlay">
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="seasun-h2 mb-6" style={{ color: 'var(--seasun-deep-black)' }}>
              Follow us for more beach vibes
            </h2>
            <p className="seasun-body text-lg" style={{ color: 'var(--seasun-deep-black)', opacity: 0.7 }}>
              Join our community and discover daily inspiration
            </p>
            <div className="w-24 h-1 mx-auto rounded-full mt-8" style={{ backgroundColor: 'var(--seasun-golden-tan)' }}></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {instagramImages.map((_, index) => (
              <div 
                key={index}
                className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500" 
                style={{ background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))' }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">🏖️</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="seasun-body text-sm font-medium">Beach lifestyle • {index + 1}h</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="secondary" 
              className="px-10 py-4 text-lg rounded-2xl transition-all duration-300 hover:opacity-80 hover:scale-105 shadow-lg border-2" 
              style={{ 
                borderColor: 'var(--seasun-golden-tan)', 
                color: 'var(--seasun-golden-tan)',
                background: 'linear-gradient(135deg, transparent 0%, rgba(247, 138, 21, 0.05) 100%)'
              }}
            >
              <span className="seasun-body font-medium flex items-center gap-2">
                <span>🌊</span>
                @seasunbeauty
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Refined */}
      <section className="py-20 sm:py-24 lg:py-28 relative seasun-section-overlay" aria-labelledby="newsletter-heading">
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl">
              <h2 id="newsletter-heading" className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
                Get 10% off your first order
              </h2>
              <div className="mb-12 max-w-3xl mx-auto" role="text" aria-describedby="newsletter-heading">
                <p id="newsletter-description" className="seasun-body text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--seasun-deep-black)', opacity: 0.7 }}>
                  Join the SEASUN family and be the first to know about new products and exclusive offers.
                </p>
              </div>
              
              <form 
                onSubmit={handleNewsletterSubmit} 
                className="flex flex-col gap-4 sm:flex-row sm:gap-6 max-w-md sm:max-w-lg mx-auto"
                role="form"
                aria-labelledby="newsletter-heading"
                aria-describedby="newsletter-description"
              >
                <div className="flex-1 w-full">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address for newsletter subscription
                  </label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for newsletter subscription"
                    aria-describedby="newsletter-description"
                    className="seasun-body w-full bg-white/30 backdrop-blur-sm border border-white/40 px-4 py-4 sm:px-6 sm:py-4 rounded-2xl placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-2 focus:ring-offset-transparent focus:border-black/40 min-h-[60px] sm:min-h-[56px] text-base"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group relative seasun-body text-white px-6 py-4 sm:px-8 sm:py-4 text-base sm:text-lg rounded-2xl font-medium overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-4 focus:ring-offset-transparent w-full sm:w-auto min-h-[60px] sm:min-h-[56px]"
                  style={{ 
                    backgroundColor: 'var(--seasun-deep-black)',
                    boxShadow: '0 6px 24px rgba(26, 26, 26, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.boxShadow = '0 12px 36px rgba(26, 26, 26, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.backgroundColor = '#2a2a2a';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.boxShadow = '0 6px 24px rgba(26, 26, 26, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.backgroundColor = 'var(--seasun-deep-black)';
                    }
                  }}
                  aria-label={isSubmitting ? "Subscribing to newsletter" : "Subscribe to newsletter for 10% discount"}
                  role="button"
                  tabIndex={0}
                >
                  <span className="relative z-10 seasun-body tracking-wide">{isSubmitting ? "Subscribing..." : "Subscribe"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Product Display Section */}
      <section ref={productSectionRef} className="py-20 sm:py-24 lg:py-28 pb-24 sm:pb-32 lg:pb-40 seasun-section-overlay" aria-labelledby="product-showcase-heading">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Product Display */}
          <div className="mb-16 sm:mb-20 lg:mb-24">
            {product ? (
              <EmbeddedProductDisplay product={product} region={region} />
            ) : (
              // Fallback display if product is not available
              <div className="text-center py-16">
                <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-12 shadow-xl max-w-md mx-auto">
                  <div className="text-6xl mb-6">🧴</div>
                  <h3 className="text-2xl font-light mb-4" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
                    SEASUN Coming Soon
                  </h3>
                  <p className="text-base opacity-70" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                    Our premium tanning oil will be available shortly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-10 max-w-lg sm:max-w-2xl mx-auto list-none" role="list" aria-label="Product guarantees and shipping information">
              <li className="flex items-center justify-center sm:justify-center gap-4 opacity-90 p-4 rounded-lg" role="listitem">
                <span className="text-lg sm:text-xl flex-shrink-0" style={{ color: 'var(--seasun-golden-tan)' }} aria-hidden="true">✓</span>
                <span className="seasun-body text-base sm:text-sm font-medium text-center sm:text-left leading-relaxed" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>30-day money back guarantee</span>
              </li>
              <li className="flex items-center justify-center sm:justify-center gap-4 opacity-90 p-4 rounded-lg" role="listitem">
                <span className="text-lg sm:text-xl flex-shrink-0" aria-hidden="true">🚚</span>
                <span className="seasun-body text-base sm:text-sm font-medium text-center sm:text-left leading-relaxed" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Free shipping on orders over $50</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Animated Wave Divider with Safety Border */}
      <div className="relative w-full overflow-hidden mt-8">
        {/* Safety border to prevent gaps during animation */}
        <div className="absolute bottom-0 w-full h-[2px] bg-[var(--seasun-ocean-blue)]"></div>
        
        <svg 
          className="w-full h-[60px] sm:h-[80px] md:h-[100px] lg:h-[120px]"
          viewBox="0 0 1440 120" 
          fill="none" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            verticalAlign: 'bottom',
            position: 'relative'
          }}
        >
          {/* Bottom wave (ocean blue) */}
          <g className="footer-wave-animation">
            <path 
              d="M-100 120V80C-20 68 60 56 140 50C220 44 300 44 380 50C460 56 540 68 620 74C700 80 780 80 860 74C940 68 1020 56 1100 50C1180 44 1260 44 1300 44H1540V120H-100Z" 
              fill="var(--seasun-ocean-blue)"
            />
          </g>
          
          {/* Top wave (deeper blue with transparency) */}
          <g className="footer-wave-animation-delayed">
            <path 
              d="M-120 120V90C0 80 120 70 240 65C360 60 480 60 600 65C720 70 840 80 960 85C1080 90 1200 90 1320 85C1440 80 1560 70 1680 65C1800 60 1920 60 1980 60H2040V120H-120Z" 
              fill="var(--seasun-deeper-blue)"
            />
          </g>
        </svg>
      </div>
      </div>
    </div>
  )
}