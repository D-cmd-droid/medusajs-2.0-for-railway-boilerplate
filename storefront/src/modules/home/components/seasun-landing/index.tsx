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
// PRODUCT INFORMATION
// ============================================================================
// Ingredients information removed

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
  // SCROLL ANIMATION UTILITY - ENHANCED WITH SCROLL DIRECTION DETECTION & INITIAL CHECK
  // ============================================================================
  useEffect(() => {
    // Get all elements with animations - already hidden by CSS
    const animatedElements = document.querySelectorAll('[data-scroll-animation]');
    
    // Track scroll position to determine direction
    let lastScrollY = window.scrollY;
    let scrollingDown = true;
    
    // Update scroll direction on scroll
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      scrollingDown = scrollY > lastScrollY;
      lastScrollY = scrollY;
    };
    
    // Add scroll listener to track direction
    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    
    // Keep track of elements that have been animated
    const animatedElementsMap = new Map();
    
    // Store position before refresh
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    });
    
    // Reusable function to animate an element
    const animateElement = (element: Element, delay = 0) => {
      const animation = element.getAttribute('data-scroll-animation');
      
      setTimeout(() => {
        // Add the animation class - keyframes handle the rest
        if (animation === 'fade-up') {
          element.classList.add('animate-fade-up');
        } else if (animation === 'fade-left') {
          element.classList.add('animate-fade-left');
        } else if (animation === 'fade-right') {
          element.classList.add('animate-fade-right');
        } else if (animation === 'width') {
          element.classList.add('animate-width');
        } else if (animation === 'height') {
          element.classList.add('animate-height');
        }
        
        // Mark element as animated
        animatedElementsMap.set(element, true);
      }, delay);
    };
    
    // Function to check elements for animation - handles both viewport and above viewport
    const checkElementsForAnimation = () => {
      // Get current scroll position
      const scrollY = window.scrollY;
      
      animatedElements.forEach(element => {
        // Skip if already animated
        if (animatedElementsMap.has(element) && 
            element.getAttribute('data-animation-repeat') !== 'true') {
          return;
        }
        
        // Get element position
        const rect = element.getBoundingClientRect();
        
        // Get element's absolute position on page
        const elementTop = rect.top + scrollY;
        const elementBottom = rect.bottom + scrollY;
        
        // Check if element is at or above current scroll position
        // (This means it's either in viewport or we've already scrolled past it)
        if (elementBottom <= scrollY + window.innerHeight) {
          // Element is above or in the current viewport - should be animated
          const delay = parseInt(element.getAttribute('data-animation-delay') || '0');
          
          // Apply animation
          animateElement(element, delay);
          
          // Stop observing if not repeating
          if (element.getAttribute('data-animation-repeat') !== 'true') {
            observer.unobserve(element);
          }
        }
      });
    };
    
    // Configure observer with optimal settings
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        // Skip if element has been animated before and is not supposed to repeat
        if (animatedElementsMap.has(element) && element.getAttribute('data-animation-repeat') !== 'true') {
          return;
        }
        
        // Check if element is intersecting AND we're scrolling down
        // This is the key part - only animate on downward scroll
        if (entry.isIntersecting && scrollingDown) {
          // Calculate visibility percentage (how much of the element is visible)
          const visibleHeight = Math.min(
            entry.boundingClientRect.bottom, 
            window.innerHeight
          ) - Math.max(entry.boundingClientRect.top, 0);
          
          const visibilityRatio = visibleHeight / entry.boundingClientRect.height;
          
          // Only animate if enough of the element is visible (at least 15%)
          if (visibilityRatio >= 0.15) {
            // Get any delay for sequenced animations
            const delay = parseInt(element.getAttribute('data-animation-delay') || '0');
            
            // Apply animation with optional delay
            animateElement(element, delay);
            
            // If no repeat is specified, stop observing
            if (element.getAttribute('data-animation-repeat') !== 'true') {
              observer.unobserve(element);
            }
          }
        }
      });
    }, { 
      threshold: [0.15, 0.3, 0.5, 0.75],  // Multiple thresholds for smoother detection
      rootMargin: '0px 0px -10% 0px' // Slight bottom offset to trigger animations earlier
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    // Restore scroll position if we have it saved
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
    
    // Run animation check after a small delay to ensure page is fully rendered
    // This will handle both in-viewport and above-viewport elements
    setTimeout(checkElementsForAnimation, 200);
    
    // Cleanup observer and event listeners on component unmount
    return () => {
      // Remove scroll direction tracking
      window.removeEventListener('scroll', updateScrollDirection);
      
      // Remove beforeunload listener
      window.removeEventListener('beforeunload', () => {
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());
      });
      
      // Clean up observer
      animatedElements.forEach(element => {
        if (element) observer.unobserve(element);
      });
      
      // Clean up map
      animatedElementsMap.clear();
    };
  }, []);

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
        className="relative flex items-center justify-center overflow-hidden"
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
        BACKGROUND IMAGE: 
        - Using Next.js Image component for optimized loading and responsive behavior
        - fill prop ensures image covers entire container
        - objectFit='cover' maintains aspect ratio while filling container
        - z-index -10 positions image behind all content
        - priority ensures immediate loading as this is a critical above-fold element
        */}
        <div className="absolute inset-0" style={{ zIndex: -10 }}>
          <Image
            src="/images/seasun-hero-bg.png"
            alt="Tropical beach scene background"
            fill
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            quality={90}
            priority
          />
        </div>
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
          - Two columns starting at xsmall breakpoint (512px)
          - Grid maintains side-by-side layout when text is left-aligned
          - Gap scales with viewport to maintain consistent visual rhythm
          */}
          <div className="relative grid xsmall:grid-cols-5 items-center" style={{
            gap: 'clamp(1rem, 3vw, 3rem)', // Reduced gap for better text-bottle relationship
            minHeight: 'clamp(400px, 70vh, 700px)',
            // Ensure grid container doesn't grow too wide and stretch bottle image
            maxWidth: '1600px',
            margin: '0 auto'
          }}>
            
            {/* 
            TEXT CONTENT CONTAINER: 
            - Centered on mobile, left-aligned on larger screens
            - Padding scales proportionally with viewport
            - Max-width prevents excessively long line lengths
            - Column sizing ensures proper proportions
            */}
            <div className="relative text-center xsmall:text-left xsmall:col-span-3" style={{
              paddingLeft: 'clamp(0rem, 2vw, 3rem)',
              // Allow for more natural text width with better constraints
              maxWidth: 'min(100%, 540px)',
              // Add subtle text shadow for better readability against background image
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
              // Better margin control with vertical alignment
              margin: '0 auto xsmall:m-0',
              // Ensure vertical alignment with bottle
              paddingTop: 'clamp(1rem, 5vh, 3rem)',
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
                  color: 'var(--seasun-white)', /* Changed to brand white for better contrast with background */
                  letterSpacing: '0.05em',
                  marginBottom: 'clamp(1rem, 4vh, 2.5rem)', // Adjusted for better spacing
                  /* Create better visual rhythm with a more natural line height */
                  lineHeight: '1.15', // Slightly increased for better text flow
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
                    color: 'var(--seasun-white)', /* Changed to brand white for better contrast */
                    fontSize: 'clamp(1.25rem, 1.5vw + 0.75rem, 2.75rem)', /* Reduced size */
                    marginBottom: 'clamp(0.25rem, 1vh, 0.5rem)' // Add spacing between lines
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
                    marginBottom: 'clamp(0.25rem, 1vh, 0.5rem)', // Add spacing between lines
                    fontFamily: 'var(--seasun-font-heading)', /* Changed from decorative to regular Cinzel */
                    color: 'var(--seasun-white)', /* Changed to brand white for better contrast */
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
                    color: 'var(--seasun-white)', /* Changed to brand white for better contrast */
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
                marginBottom: 'clamp(1rem, 4vh, 2.5rem)' // Reduced for better proportions
              }}>
                {/* 
                TAGLINE: 
                - Fluid typography scales between 1rem (16px) and 1.5rem (24px)
                - Maintains proper spacing relationship with heading
                */}
                <p 
                  className="seasun-body font-light italic text-center xsmall:text-left" 
                  style={{ 
                    color: 'var(--seasun-white)', /* Changed to brand white for better contrast */
                    opacity: 0.95, /* Increased opacity for better visibility */
                    marginTop: 'clamp(1rem, 3vh, 2rem)',
                    fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)',
                    lineHeight: '1.6',
                  }}
                  id="hero-description"
                  role="text"
                >
                  How does it feel to be
                  {/* Wrapping SUNKISSED and ? together to prevent line breaks between them */}
                  <span style={{ whiteSpace: 'nowrap' }}>
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
                        /* Keeping original color (no specific color means it inherits from parent) */
                        marginLeft: 'clamp(0.25rem, 0.5vw, 0.5rem)',
                        fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)', /* Reduced size */
                      }}
                      aria-label="SUNKISSED"
                    >
                      SUNKISSED
                    </span>?
                  </span>
                </p>
                
                {/* 
                CTA BUTTON CONTAINER: 
                - Maintains consistent alignment with text content
                - Scales margin proportionally with viewport
                */}
                <div className="flex justify-center xsmall:justify-start text-left" style={{
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
            RIGHT COLUMN: Product Image Container
            - Uses Next.js Image for optimized loading
            - Maintains proper aspect ratio
            - Scales fluidly with viewport
            - Proper alignment with text content
            - Only appears beside text at appropriate breakpoints
            */}
            <div className="relative flex items-center justify-center xsmall:col-span-2" style={{
              minHeight: 'clamp(200px, 50vh, 500px)',
            }}>
              <div className="relative" style={{
                width: 'clamp(280px, 90%, 500px)',
                aspectRatio: '1/1.2',
                margin: '0 auto xsmall:mr-0 xsmall:ml-auto',
              }}>
                <Image
                  src="/images/seasun-hero-bottle.png"
                  alt="SEASUN organic tanning oil with natural ingredients: coconut, cinnamon, and annatto"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 600px"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Ingredient Showcase removed */}


      {/* All sections below hero wrapped in seamless gradient */}
      <div className="seasun-content-gradient">
        {/* 
        ===============================================================
        TRUST/PROBLEM SECTION - STANDARDIZED DESIGN PATTERNS
        ===============================================================
        
        Design standardization:
        1. Matching container structure with other sections
        2. Consistent background elements and textures
        3. Uniform heading decoration with centered gradient
        4. Standardized spacing and animations
        5. Visual consistency with Ingredients section
        */}
        <section 
          className="relative overflow-hidden" 
          aria-labelledby="trust-problem-heading"
          style={{
            paddingTop: 'clamp(3rem, 10vh, 7rem)',
            paddingBottom: 'clamp(3rem, 10vh, 7rem)',
          }}
        >
          {/* 
          BACKGROUND TEXTURE:
          - Matches Ingredients section sand texture 
          - Creates consistent visual language across sections
          */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{
              background: 'url(/images/sand-texture.png)',
              backgroundSize: 'clamp(200px, 30vw, 400px)', 
              mixBlendMode: 'overlay'
            }}
          ></div>
          
          {/* Visual Elements - Sun rays background (preserved) */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
              <div className="w-full h-full bg-gradient-radial from-yellow-400/30 to-transparent"></div>
            </div>
          </div>
          
          {/* 
          CONTENT CONTAINER:
          - Matches structure of Ingredients section
          - Consistent max-width and padding
          */}
          <div 
            className="relative z-10 w-full mx-auto" 
            style={{ 
              maxWidth: 'min(90vw, 1400px)', 
              padding: '0 clamp(1rem, 5vw, 3rem)'
            }}
          >
            <div className="max-w-3xl mx-auto text-center">
              {/* 
              SECTION HEADING:
              - Matches heading style across all sections
              - Consistent decoration with centered gradient underline
              - Standardized margin-bottom that matches Ingredients
              */}
              <h2 
                id="trust-problem-heading" 
                className="font-light text-center"
                style={{ 
                  fontFamily: 'var(--seasun-font-heading)', 
                  color: 'var(--seasun-deep-black)',
                  fontSize: 'clamp(1.5rem, 3vw + 1rem, 3.5rem)',
                  lineHeight: '1.2',
                  marginBottom: 'clamp(2rem, 8vh, 4rem)',
                }}
                data-scroll-animation="fade-up"
              >
                When the sun plays hard to get
                
                {/* 
                DECORATIVE UNDERLINE:
                - Matches style from Ingredients section
                - Centered gradient for consistent visual language
                */}
                <span 
                  className="block mx-auto mt-6" 
                  style={{ 
                    height: 'clamp(2px, 0.3vh, 4px)',
                    width: 'clamp(4rem, 8vw, 8rem)',
                    background: 'linear-gradient(to right, transparent, var(--seasun-golden-tan), transparent)' 
                  }}
                  data-scroll-animation="width"
                ></span>
              </h2>
              
              {/* 
              FIRST PARAGRAPH:
              - Matches structure of Ingredients opening statement
              - Consistent max-width and margin
              - Added animation attributes for consistency
              */}
              <p 
                className="seasun-body font-light text-center"
                style={{ 
                  color: 'var(--seasun-deep-black)', 
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
                  lineHeight: '1.6',
                  maxWidth: 'min(100%, 800px)',
                  margin: '0 auto clamp(1.5rem, 5vh, 3rem) auto',
                }}
                data-scroll-animation="fade-up"
              >
                How many times have you ended up with lobster red burns or that muddy brown tone after hours under the sun with nothing to show for it? I know that feeling when you look at yet another product thinking, "Sure, I've heard these promises before." Your bathroom cabinet probably tells that story all too well.
              </p>
              
              {/* 
              SECOND PARAGRAPH:
              - Consistent styling with first paragraph
              - Maintains font-normal weight for emphasis
              - Added animation with slight delay
              */}
              <p 
                className="seasun-body font-normal text-center"
                style={{ 
                  color: 'var(--seasun-deep-black)', 
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
                  lineHeight: '1.6',
                  maxWidth: 'min(100%, 800px)',
                  margin: '0 auto',
                }}
                data-scroll-animation="fade-up"
                data-aos-delay="50"
              >
                I felt the same way until I couldn't take it anymore. That's why SEASUN had to be different—finally, a beautiful, sexy glow with no chemicals and none of the frustration.
              </p>
              
              {/* 
              BUTTON CONTAINER:
              - Matches spacing from Ingredients section
              - Added animation with delayed reveal
              */}
              <div 
                style={{ 
                  marginTop: 'clamp(2rem, 5vh, 4rem)',
                  display: 'flex',
                  justifyContent: 'center'
                }}
                data-scroll-animation="fade-up"
                data-aos-delay="100"
              >
                {/* 
                CTA BUTTON:
                - Preserved existing styling
                - Maintained fluid padding and font sizing
                */}
                <Button 
                  onClick={scrollToProductSection}
                  className="group relative seasun-body text-white rounded-2xl font-semibold overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:ring-offset-4 focus:ring-offset-transparent w-full sm:w-auto"
                  style={{ 
                    backgroundColor: 'var(--seasun-golden-tan)',
                    boxShadow: '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: '200px',
                    /* Fluid padding creates consistent visual weight */
                    padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
                    /* Button text scales appropriately with viewport */
                    fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
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
                  <span className="relative z-10 seasun-body tracking-wide font-semibold">See the Difference</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Button>
              </div>
            </div>
          </div>
        </section>


      {/* 
      ===============================================================
      INGREDIENTS SECTION - APPLE-INSPIRED RESPONSIVE APPROACH
      ===============================================================
      
      Key principles applied:
      1. Content-first spacing: Proportional spacing that maintains visual rhythm
      2. Fluid typography: Text that scales smoothly across viewport sizes
      3. Diagonal offset pattern: Content layout that scales proportionally 
      4. Aspect-ratio preservation: Images that maintain proportions naturally
      */}
      <section 
        className="relative overflow-hidden" 
        aria-labelledby="ingredients-heading"
        style={{
          /* Fluid vertical padding that scales with viewport height */
          paddingTop: 'clamp(3rem, 10vh, 7rem)',
          paddingBottom: 'clamp(3rem, 10vh, 7rem)',
        }}
      >
        {/* 
        BACKGROUND TEXTURE: 
        - Subtle sand texture provides natural depth
        - Overlay blend mode ensures proper contrast with content
        */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{
            background: 'url(/images/sand-texture.png)',
            backgroundSize: 'clamp(200px, 30vw, 400px)', // Responsive texture size
            mixBlendMode: 'overlay'
          }}
        ></div>
        
        {/* 
        CONTENT CONTAINER: 
        - Fluid width container that maintains optimal reading length
        - Consistent horizontal padding that scales with viewport
        */}
        <div 
          className="relative z-10 w-full mx-auto" 
          style={{ 
            maxWidth: 'min(90vw, 1400px)', 
            padding: '0 clamp(1rem, 5vw, 3rem)'
          }}
        >
          {/* 
          SECTION HEADING: 
          - Fluid typography scales smoothly between viewport sizes
          - Bottom margin scales proportionally with viewport height
          - Maintains proper visual hierarchy with consistent styling
          */}
          <h2 
            id="ingredients-heading" 
            className="font-light text-center"
            style={{ 
              fontFamily: 'var(--seasun-font-heading)', 
              color: 'var(--seasun-deep-black)',
              fontSize: 'clamp(1.5rem, 3vw + 1rem, 3.5rem)',
              lineHeight: '1.2',
              marginBottom: 'clamp(2rem, 8vh, 4rem)',
            }}
            data-scroll-animation="fade-up"
          >
            The Power of Pure Caribbean Ingredients
            
            {/* 
            DECORATIVE UNDERLINE: 
            - Width scales proportionally with viewport
            - Maintains consistent visual weight across screen sizes
            */}
            <span 
              className="block mx-auto mt-6" 
              style={{ 
                height: 'clamp(2px, 0.3vh, 4px)',
                width: 'clamp(4rem, 8vw, 8rem)',
                background: 'linear-gradient(to right, transparent, var(--seasun-golden-tan), transparent)' 
              }}
              data-scroll-animation="width"
            ></span>
          </h2>
          
          {/* 
          OPENING STATEMENT: 
          - Fluid typography and line height for optimal readability
          - Max-width prevents excessive line lengths on large screens
          - Margin scales proportionally with viewport
          */}
          <p 
            className="seasun-body font-light text-center"
            style={{ 
              color: 'var(--seasun-deep-black)', 
              opacity: 0.85,
              fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
              lineHeight: '1.6',
              maxWidth: 'min(100%, 800px)',
              margin: '0 auto clamp(2.5rem, 10vh, 5rem) auto',
            }}
            data-scroll-animation="fade-up"
          >
            ✨ If the sun plays hard to get with your skin, SEASUN makes it easy. Forget those complicated formulas with ingredients you can't pronounce. We've found a simpler answer that actually works.
          </p>
          
          {/* 
          INGREDIENT DISPLAY CONTAINER: 
          - Creates progressive visual rhythm with proportional spacing
          - Maintains consistent layout structure across viewport sizes
          */}
          <div style={{
            marginBottom: 'clamp(2.5rem, 8vh, 5rem)',
          }}>

            {/* 
            COCONUT OIL - FIRST INGREDIENT: 
            - Viewport-proportional left offset (0%)
            - Margin scales smoothly with viewport height
            */}
            <div 
              style={{ 
                marginBottom: 'clamp(3rem, 12vh, 6rem)',
                paddingLeft: 'clamp(0rem, calc(0vw), 0rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                {/* 
                IMAGE: 
                - Uses pre-made transparent image with natural shadows
                - Size scales proportionally with viewport
                - Maintains proper spacing with content
                */}
                <div 
                  style={{ 
                    width: 'clamp(120px, 15vw, 180px)',
                    aspectRatio: '1/1',
                    marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                    marginRight: 'clamp(0rem, 3vw, 1.5rem)',
                    position: 'relative'
                  }}
                  data-scroll-animation="fade-right"
                  data-aos-delay="0"
                >
                  <Image
                    src="/images/ingredients/coconut.png"
                    alt="Coconut Oil"
                    fill
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
                {/* 
                CONTENT CONTAINER: 
                - Optimal width for readability
                - Maintains proper spacing relationship with image
                */}
                <div style={{
                  maxWidth: 'min(100%, 640px)',
                  flex: '1',
                }}>
                  {/* 
                  INGREDIENT TITLE: 
                  - Fluid typography scales smoothly with viewport
                  - Consistent visual hierarchy with section heading
                  */}
                  <h3 
                    className="font-light text-center lg:text-left"
                    style={{ 
                      fontFamily: 'var(--seasun-font-heading)', 
                      color: 'var(--seasun-deep-black)',
                      fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)',
                      lineHeight: '1.3',
                      marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                      textAlign: 'center',
                      '@media (min-width: 1024px)': {
                        textAlign: 'left',
                      }
                    }}
                    data-scroll-animation="fade-up"
                    data-aos-delay="50"
                  >
                    Coconut Oil 🥥 Boosts
                  </h3>
                  
                  {/* 
                  INGREDIENT DESCRIPTION: 
                  - Fluid typography for optimal readability
                  - Line height scales proportionally with font size
                  */}
                  <p 
                    className="seasun-body font-light text-center lg:text-left"
                    style={{ 
                      color: 'var(--seasun-deep-black)', 
                      opacity: 0.85,
                      fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                      lineHeight: '1.6',
                      textAlign: 'center',
                      '@media (min-width: 1024px)': {
                        textAlign: 'left',
                      }
                    }}
                    data-scroll-animation="fade-up"
                    data-aos-delay="100"
                  >
                    Say goodbye to greasy, artificial moisturizers that just sit on your skin. Pure coconut oil dives deep, finding those stubborn lighter areas that never seem to catch the sun. It creates the perfect canvas for an even, natural tan by delivering intense hydration exactly where you need it most—no 12-step routine required. Just smooth, ready-to-tan skin.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 
            CINNAMON - SECOND INGREDIENT: 
            - Progressive left offset scales proportionally with viewport width
            - Creates visual interest through diagonal layout pattern
            */}
            <div 
              style={{ 
                marginBottom: 'clamp(3rem, 12vh, 6rem)',
                paddingLeft: 'clamp(1rem, calc(15vw - 2rem), 15rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                {/* Image Container - Maintains same proportional styling as first ingredient */}
                <div 
                  style={{ 
                    width: 'clamp(120px, 15vw, 180px)',
                    aspectRatio: '1/1',
                    marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                    marginRight: 'clamp(0rem, 3vw, 1.5rem)',
                    position: 'relative'
                  }}
                  data-scroll-animation="fade-right"
                  data-aos-delay="200"
                >
                  <Image
                    src="/images/ingredients/cinnamon.png"
                    alt="Cinnamon"
                    fill
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
                {/* Content Container - Consistent with first ingredient */}
                <div style={{
                  maxWidth: 'min(100%, 640px)',
                  flex: '1',
                }}>
                  <h3 
                    className="font-light text-center lg:text-left"
                    style={{ 
                      fontFamily: 'var(--seasun-font-heading)', 
                      color: 'var(--seasun-deep-black)',
                      fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)',
                      lineHeight: '1.3',
                      marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                      textAlign: 'center',
                      '@media (min-width: 1024px)': {
                        textAlign: 'left',
                      }
                    }}
                    data-scroll-animation="fade-up"
                    data-aos-delay="250"
                  >
                    Cinnamon 🌶️ Speeds
                  </h3>
                  
                  <p 
                    className="seasun-body font-light text-center lg:text-left"
                    style={{ 
                      color: 'var(--seasun-deep-black)', 
                      opacity: 0.85,
                      fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                      lineHeight: '1.6',
                      textAlign: 'center',
                      '@media (min-width: 1024px)': {
                        textAlign: 'left',
                      }
                    }}
                    data-scroll-animation="fade-up"
                    data-aos-delay="300"
                  >
                    Tired of harsh chemical accelerators that irritate and damage your skin? Cinnamon takes a different approach. It works with your body, not against it—gently boosting circulation exactly where you apply it. This brings more blood flow to the surface, speeding up your natural tanning process without the redness and irritation. No more waiting forever for results that never come.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 
            ANNATTO - THIRD INGREDIENT: 
            - Maximum left offset creates strongest diagonal effect
            - Maintains visual pattern established by previous ingredients
            */}
            <div 
              style={{ 
                marginBottom: 'clamp(3rem, 12vh, 6rem)',
                paddingLeft: 'clamp(2rem, calc(25vw - 3rem), 25rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                {/* Image Container - Consistent with previous ingredients */}
                <div 
                  style={{ 
                    width: 'clamp(120px, 15vw, 180px)',
                    aspectRatio: '1/1',
                    marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                    marginRight: 'clamp(0rem, 3vw, 1.5rem)',
                    position: 'relative'
                  }}
                  data-scroll-animation="fade-right"
                  data-aos-delay="400"
                >
                  <Image
                    src="/images/ingredients/annatto.png"
                    alt="Annatto"
                    fill
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </div>
                
                {/* Content Container - Consistent with previous ingredients */}
                <div style={{
                  maxWidth: 'min(100%, 640px)',
                  flex: '1',
                }}>
                  <h3 
                    className="font-light text-center lg:text-left"
                    style={{ 
                      fontFamily: 'var(--seasun-font-heading)', 
                      color: 'var(--seasun-deep-black)',
                      fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)',
                      lineHeight: '1.3',
                      marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                      textAlign: 'center',
                      '@media (min-width: 1024px)': {
                        textAlign: 'left',
                      }
                    }}
                    data-scroll-animation="fade-up"
                    data-aos-delay="450"
                  >
                    Annatto ☀️ Transforms
                  </h3>
                  
                  <p 
                    className="seasun-body font-light text-center lg:text-left"
                    style={{ 
                      color: 'var(--seasun-deep-black)', 
                      opacity: 0.85,
                      fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                      lineHeight: '1.6',
                      textAlign: 'center',
                      '@media (min-width: 1024px)': {
                        textAlign: 'left',
                      }
                    }}
                    data-scroll-animation="fade-up"
                    data-aos-delay="500"
                  >
                    Forget about those artificial bronzers that wash away after your first swim. Annatto infuses your skin with a golden warmth that brings out your natural beauty. This ancient Caribbean secret transforms your skin from within, creating that head-turning sun-kissed glow that looks completely natural—because it is! Not an expensive treatment with disappointing results, but an affordable solution that delivers every time. Your skin, but better.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 
          CLOSING STATEMENT: 
          - Centered layout with maximum width for optimal readability
          - Fluid typography and margins scale proportionally with viewport
          - Creates natural visual conclusion to the section
          */}
          <div 
            style={{
              textAlign: 'center',
              maxWidth: 'min(100%, 800px)',
              margin: '0 auto',
              marginTop: 'clamp(2rem, 8vh, 4rem)',
            }}
            data-scroll-animation="fade-up"
          >
            <p 
              className="seasun-body font-light"
              style={{ 
                color: 'var(--seasun-deep-black)', 
                opacity: 0.9,
                fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
                lineHeight: '1.6',
                marginBottom: 'clamp(1.5rem, 5vh, 2.5rem)',
              }}
            >
              That's why SEASUN doesn't just work differently—it works better. No more lobster red, muddy brown, or hours under the sun with no results. Our organic oil boosts those stubborn lighter areas, speeds up your tan, and transforms it into a golden, even, hydrated glow. A beautiful, sexy glow—no chemicals, no frustration. 💛🌴
            </p>
            
            {/* 
            CTA BUTTON: 
            - Consistent styling with hero CTA
            - Fluid padding and font size scale with viewport
            - Maintains proper visual weight across all sizes
            */}
            <Button 
              onClick={scrollToProductSection}
              className="group relative seasun-body text-white rounded-xl font-medium overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:ring-offset-4 focus:ring-offset-transparent"
              style={{ 
                backgroundColor: 'var(--seasun-golden-tan)',
                boxShadow: '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
                fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                minWidth: 'clamp(150px, 20vw, 200px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(247, 138, 21, 0.5), 0 6px 16px rgba(247, 138, 21, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)';
              }}
            >
              <span className="relative z-10 seasun-body tracking-wide font-semibold">Experience the Difference</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* 
      ===============================================================
      FAQ SECTION - STANDARDIZED TYPOGRAPHY
      ===============================================================
      
      Typography standardization:
      1. Fluid typography with clamp() instead of breakpoints
      2. Consistent visual hierarchy across sections
      3. Standardized line heights and font weights
      4. Unified opacity values for similar text types
      */}
      <section 
        className="seasun-section-overlay" 
        aria-labelledby="faq-heading"
        style={{
          /* Consistent section padding that scales with viewport */
          paddingTop: 'clamp(3rem, 10vh, 7rem)',
          paddingBottom: 'clamp(3rem, 10vh, 7rem)',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* 
            SECTION HEADING:
            - Matches ingredient section heading style
            - Fluid typography that scales smoothly 
            - Consistent visual hierarchy with other h2 elements
            */}
            <h2 
              id="faq-heading" 
              className="font-light text-center"
              style={{ 
                fontFamily: 'var(--seasun-font-heading)', 
                color: 'var(--seasun-deep-black)',
                fontSize: 'clamp(1.5rem, 3vw + 1rem, 3.5rem)',
                lineHeight: '1.2',
                marginBottom: 'clamp(1.5rem, 5vh, 3rem)',
              }}
            >
              HONEST ANSWERS TO YOUR <span style={{ color: 'var(--seasun-golden-tan)', fontWeight: '500' }}>REAL CONCERNS</span>
            </h2>
            
            {/* FAQ Questions - Container with proportional spacing */}
            <div 
              className="space-y-4 sm:space-y-6" 
              style={{ marginBottom: 'clamp(1.5rem, 5vh, 3rem)' }}
              role="region" 
              aria-labelledby="faq-heading"
            >
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
                      {/* 
                      QUESTION TEXT:
                      - Standardized font sizing with clamp()
                      - Consistent font weight and line height
                      - Matches interactive text styling across sections 
                      */}
                      <span 
                        className="seasun-body font-medium group-hover:opacity-90 transition-opacity duration-300 pr-3" 
                        style={{ 
                          color: 'var(--seasun-deep-black)',
                          fontSize: 'clamp(0.875rem, 0.75vw + 0.75rem, 1.125rem)',
                          lineHeight: '1.6',
                        }}
                      >
                        {faq.question}
                      </span>
                      
                      {/* Plus icon - Maintained original styling */}
                      <span 
                        className="transition-all duration-500 ease-out group-hover:scale-110 flex-shrink-0 ml-2 sm:ml-4 min-w-[24px] min-h-[24px] flex items-center justify-center" 
                        style={{ 
                          color: 'var(--seasun-deep-black)', 
                          transform: expandedFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                          fontSize: 'clamp(1.25rem, 1vw + 1rem, 1.75rem)',
                        }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  
                  {/* 
                  ANSWER CONTAINER:
                  - Smooth height transition maintained
                  - Consistent padding that scales with viewport
                  */}
                  <div 
                    className="overflow-hidden transition-all duration-500 ease-out"
                    style={{
                      maxHeight: expandedFAQ === index ? '600px' : '0px',
                      opacity: expandedFAQ === index ? 1 : 0
                    }}
                  >
                    <div 
                      id={`faq-answer-${index}`}
                      className="border-t border-gray-100"
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      style={{
                        transform: expandedFAQ === index ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'transform 0.3s ease-out 0.2s',
                        padding: 'clamp(0.75rem, 3vh, 1.5rem) clamp(1rem, 4vw, 2rem)',
                      }}
                    >
                      {/* 
                      ANSWER TEXT:
                      - Standardized font sizing with clamp()
                      - Consistent opacity and line height 
                      - Matches secondary text styling across sections
                      */}
                      <p 
                        className="seasun-body font-light" 
                        style={{ 
                          color: 'var(--seasun-deep-black)', 
                          opacity: 0.8,
                          fontSize: 'clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)',
                          lineHeight: '1.6',
                        }}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 
            FINAL MESSAGE:
            - Consistent spacing that scales with viewport
            - Standardized typography matches body text elsewhere
            - Maintains border separator with proportional spacing
            */}
            <div 
              className="max-w-3xl mx-auto border-t border-gray-100/30"
              style={{
                paddingTop: 'clamp(1.5rem, 4vh, 3rem)',
                paddingBottom: 'clamp(1rem, 2vh, 2rem)',
              }}
            >
              {/* 
              FINAL MESSAGE TEXT:
              - Matches standard body text styling
              - Fluid typography with clamp()
              - Consistent line height and opacity
              */}
              <p 
                className="seasun-body font-normal text-center" 
                style={{ 
                  color: 'var(--seasun-deep-black)', 
                  opacity: 0.85,
                  fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
                  lineHeight: '1.6',
                }}
              >
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