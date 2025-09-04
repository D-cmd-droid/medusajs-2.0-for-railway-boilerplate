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
import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import EmbeddedProductDisplay from "@modules/home/components/embedded-product-display"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface FAQItem {
  question: string
  answer: string
}

type SeasunLandingProps = {
  countryCode?: string  // Optional since it's not currently used
  region: HttpTypes.StoreRegion
  product: HttpTypes.StoreProduct | null
}

// ============================================================================
// PRODUCT INFORMATION
// ============================================================================

export default function SeasunLanding({ region, product }: SeasunLandingProps) {
  // countryCode available for future country-specific content
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  
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
    
    // Store position before refresh - using named function for proper cleanup
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
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
      
      // Remove beforeunload listener with the same function reference
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
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
      question: "Does it work if I have trouble tanning?",
      answer: "Yes. SEASUN was specially created for skin that takes longer to tan or has lighter areas. It gives your skin a boost to achieve an even, golden, and beautiful tan. We've seen exceptional results with customers who previously struggled to get any color at all."
    },
    {
      question: "Will I turn red or orange?",
      answer: "No. Unlike other products, SEASUN won't stain or leave your skin looking 'muddy brown' or 'lobster red.' Its formula enhances your natural tone to achieve a healthy golden glow through a carefully balanced blend of natural ingredients that work with your skin, not against it."
    },
    {
      question: "How soon will I see results?",
      answer: "Many people notice results from the very first day in the sun: a faster, more even, and radiant tan. Results may vary depending on your skin type and sun exposure, but the majority of our customers report visible improvements after their first session using SEASUN."
    },
    {
      question: "What if my order arrives damaged or I want to return it?",
      answer: "We want you to love your SEASUN. If something doesn't arrive in perfect condition, contact us within 7 days and we'll arrange a replacement or refund with no questions asked. Your satisfaction is our priority, and we stand behind our product completely."
    },
    {
      question: "Can I use it if I have very sensitive skin?",
      answer: "Yes, although we recommend testing a small area first. Since it's natural, it's generally well tolerated, but every skin is different. SEASUN's formula was specifically designed to be gentle, using only natural ingredients without harsh chemicals or artificial fragrances that typically cause reactions."
    }
  ]

  // Instagram gallery with horizontal scroll behavior and navigation
  // Add effect to handle scroll button initialization
  useEffect(() => {
    // Initialize scroll controls once component is mounted
    const scrollContainer = document.getElementById('instagram-scroll-container');
    const backButton = document.getElementById('gallery-back-button');
    const nextButton = document.getElementById('gallery-next-button');
    
    if (scrollContainer && backButton && nextButton) {
      // Check if we can scroll right (content wider than container)
      const canScrollRight = scrollContainer.scrollWidth > scrollContainer.clientWidth;
      
      // Initialize next button visibility
      if (canScrollRight) {
        nextButton.style.opacity = '1';
        nextButton.style.pointerEvents = 'auto';
      } else {
        nextButton.style.opacity = '0';
        nextButton.style.pointerEvents = 'none';
      }
      
      // Initialize back button (always hidden initially)
      backButton.style.opacity = '0';
      backButton.style.pointerEvents = 'none';
    }
  }, []);

  // ============================================================================
  // MAIN RENDER
  // ============================================================================
  return (
    <div className="w-full">
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
                  you&apos;ve been
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
                  fontSize: 'clamp(1.25rem, 2vw + 0.75rem, 2.75rem)',
                  fontWeight: '300',
                  letterSpacing: '0.03em',
                  lineHeight: '1.3',
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
                  opacity: 0.75,
                  fontSize: 'clamp(0.95rem, 0.75vw + 0.5rem, 1.125rem)',
                  lineHeight: '1.8',
                  maxWidth: 'min(100%, 700px)',
                  margin: '0 auto clamp(1.5rem, 5vh, 3rem) auto',
                  letterSpacing: '0.01em',
                }}
                data-scroll-animation="fade-up"
              >
                How many times have you ended up with lobster red burns or that muddy brown tone after hours under the sun with nothing to show for it? I know that feeling when you look at yet another product thinking, &quot;Sure, I&apos;ve heard these promises before.&quot; Your bathroom cabinet probably tells that story all too well.
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
                  opacity: 0.75,
                  fontSize: 'clamp(0.95rem, 0.75vw + 0.5rem, 1.125rem)',
                  lineHeight: '1.8',
                  maxWidth: 'min(100%, 700px)',
                  margin: '0 auto',
                  letterSpacing: '0.01em',
                }}
                data-scroll-animation="fade-up"
              >
                I felt the same way until I couldn&apos;t take it anymore. That&apos;s why SEASUN had to be different—finally, a beautiful, sexy glow with no chemicals and none of the frustration.
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
              fontSize: 'clamp(1.25rem, 2vw + 0.75rem, 2.75rem)',
              fontWeight: '300',
              letterSpacing: '0.03em',
              lineHeight: '1.3',
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
            ✨ If the sun plays hard to get with your skin, SEASUN makes it easy. Forget those complicated formulas with ingredients you can&apos;t pronounce. We&apos;ve found a simpler answer that actually works.
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
            - Centered on mobile with auto margins
            - Desktop maintains original positioning
            */}
            <div 
              className="mx-auto lg:mx-0 max-w-full lg:max-w-none lg:pl-0"
              style={{ 
                marginBottom: 'clamp(3rem, 12vh, 6rem)',
                position: 'relative',
                overflow: 'hidden'
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
                      fontSize: 'clamp(1.1rem, 1.5vw + 0.5rem, 1.75rem)',
                      fontWeight: '300',
                      letterSpacing: '0.03em',
                      lineHeight: '1.3',
                      marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                      textAlign: 'center'
                    }}
                    data-scroll-animation="fade-up"
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
                      opacity: 0.75,
                      fontSize: 'clamp(0.85rem, 0.5vw + 0.7rem, 1rem)',
                      lineHeight: '1.8',
                      textAlign: 'center',
                      letterSpacing: '0.01em'
                    }}
                    data-scroll-animation="fade-up"
                  >
                    Say goodbye to greasy, artificial moisturizers that just sit on your skin. Pure coconut oil dives deep, finding those stubborn lighter areas that never seem to catch the sun. It creates the perfect canvas for an even, natural tan by delivering intense hydration exactly where you need it most—no 12-step routine required. Just smooth, ready-to-tan skin.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 
            CINNAMON - SECOND INGREDIENT: 
            - Centered on mobile with auto margins
            - Desktop maintains progressive left offset
            */}
            <div 
              className="mx-auto lg:mx-0 max-w-full lg:max-w-none lg:pl-[clamp(1rem,calc(15vw-2rem),15rem)]"
              style={{ 
                marginBottom: 'clamp(3rem, 12vh, 6rem)',
                position: 'relative',
                overflow: 'hidden'
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
                      fontSize: 'clamp(1.1rem, 1.5vw + 0.5rem, 1.75rem)',
                      fontWeight: '300',
                      letterSpacing: '0.03em',
                      lineHeight: '1.3',
                      marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                      textAlign: 'center'
                    }}
                    data-scroll-animation="fade-up"
                  >
                    Cinnamon 🌶️ Speeds
                  </h3>
                  
                  <p 
                    className="seasun-body font-light text-center lg:text-left"
                    style={{ 
                      color: 'var(--seasun-deep-black)', 
                      opacity: 0.75,
                      fontSize: 'clamp(0.85rem, 0.5vw + 0.7rem, 1rem)',
                      lineHeight: '1.8',
                      textAlign: 'center',
                      letterSpacing: '0.01em'
                    }}
                    data-scroll-animation="fade-up"
                  >
                    Tired of harsh chemical accelerators that irritate and damage your skin? Cinnamon takes a different approach. It works with your body, not against it—gently boosting circulation exactly where you apply it. This brings more blood flow to the surface, speeding up your natural tanning process without the redness and irritation. No more waiting forever for results that never come.
                  </p>
                </div>
              </div>
            </div>
            
            {/* 
            ANNATTO - THIRD INGREDIENT: 
            - Centered on mobile with auto margins
            - Desktop maintains maximum left offset for diagonal effect
            */}
            <div 
              className="mx-auto lg:mx-0 max-w-full lg:max-w-none lg:pl-[clamp(2rem,calc(25vw-3rem),25rem)]"
              style={{ 
                marginBottom: 'clamp(3rem, 12vh, 6rem)',
                position: 'relative',
                overflow: 'hidden'
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
                      fontSize: 'clamp(1.1rem, 1.5vw + 0.5rem, 1.75rem)',
                      fontWeight: '300',
                      letterSpacing: '0.03em',
                      lineHeight: '1.3',
                      marginBottom: 'clamp(0.5rem, 2vh, 1rem)',
                      textAlign: 'center'
                    }}
                    data-scroll-animation="fade-up"
                  >
                    Annatto ☀️ Transforms
                  </h3>
                  
                  <p 
                    className="seasun-body font-light text-center lg:text-left"
                    style={{ 
                      color: 'var(--seasun-deep-black)', 
                      opacity: 0.75,
                      fontSize: 'clamp(0.85rem, 0.5vw + 0.7rem, 1rem)',
                      lineHeight: '1.8',
                      textAlign: 'center',
                      letterSpacing: '0.01em'
                    }}
                    data-scroll-animation="fade-up"
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
              That&apos;s why SEASUN doesn&apos;t just work differently—it works better. No more lobster red, muddy brown, or hours under the sun with no results. Our organic oil boosts those stubborn lighter areas, speeds up your tan, and transforms it into a golden, even, hydrated glow. A beautiful, sexy glow—no chemicals, no frustration. 💛🌴
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
      FAQ SECTION - FLUID DESIGN APPROACH
      ===============================================================
      
      Key design principles:
      1. Fluid typography with clamp() instead of breakpoints
      2. Consistent visual hierarchy across sections
      3. Standardized line heights and font weights
      4. Unified opacity values for similar text types
      5. Simplified container structure for mobile optimization
      */}
      <section 
        className="seasun-section-overlay overflow-hidden" 
        aria-labelledby="faq-heading"
        style={{
          /* Consistent section padding that scales with viewport */
          paddingTop: 'clamp(3rem, 10vh, 7rem)',
          paddingBottom: 'clamp(3rem, 10vh, 7rem)',
        }}
      >
        {/* 
        CONTENT CONTAINER: 
        - Fluid width container that matches other sections
        - Consistent horizontal padding that scales with viewport
        - Simplified nesting structure for better mobile display
        */}
        <div 
          className="relative w-full mx-auto" 
          style={{ 
            maxWidth: 'min(90vw, 1400px)', 
            padding: '0 clamp(1rem, 5vw, 3rem)'
          }}
        >
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
                fontSize: 'clamp(1.25rem, 2vw + 0.75rem, 2.75rem)',
                fontWeight: '300',
                letterSpacing: '0.03em',
                lineHeight: '1.3',
                marginBottom: 'clamp(1.5rem, 5vh, 3rem)',
              }}
            >
              HONEST ANSWERS TO YOUR <span style={{ color: 'var(--seasun-golden-tan)', fontWeight: '500' }}>REAL CONCERNS</span>
            </h2>
            
            {/* FAQ Questions - Simplified container with optimal reading width */}
            <div 
              className="mx-auto mb-16" 
              style={{ 
                maxWidth: '700px',
                gap: '12px',
                display: 'flex',
                flexDirection: 'column'
              }}
              role="region" 
              aria-labelledby="faq-heading"
            >
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="group/card overflow-hidden mb-4 pb-0 hover:bg-[rgba(250,248,246,0.8)]"
                  style={{
                    background: 'rgba(250, 248, 246, 0.6)',
                    borderRadius: '2px',
                    border: '0.5px solid rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.01)'
                  }}
                >
                  <h3>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="group w-full text-left flex justify-between items-center transition-all duration-700 focus:outline-none focus-visible:outline-none py-4 px-5 min-h-[50px] relative"
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
                          fontSize: 'clamp(0.85rem, 0.5vw + 0.7rem, 1rem)',
                          lineHeight: '1.6',
                          letterSpacing: '0.01em',
                          fontWeight: expandedFAQ === index ? '500' : '400',
                          transition: 'all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
                          opacity: expandedFAQ === index ? '0.95' : '0.8',
                          position: 'relative'
                        }}
                      >
                        {faq.question}
                      </span>
                      
                      {/* Plus icon - Maintained original styling */}
                      <div
                        className="transition-all duration-700 ease-out flex-shrink-0 ml-6 w-[16px] h-[16px] relative"
                        style={{ 
                          transition: 'all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)'
                        }}
                        aria-hidden="true"
                      >
                        <div className="absolute top-[7px] left-0 w-full h-[2px] bg-black/25 transition-all duration-700" 
                          style={{
                            transform: expandedFAQ === index ? 'rotate(180deg) scaleX(0.7)' : 'rotate(0deg)'
                          }}></div>
                        <div className="absolute top-0 left-[7px] w-[2px] h-full bg-black/25 transition-all duration-700"
                          style={{
                            opacity: expandedFAQ === index ? 0 : 1,
                            transform: expandedFAQ === index ? 'rotate(90deg) scaleY(0)' : 'rotate(0deg)'
                          }}></div>
                      </div>
                    </button>
                  </h3>
                  
                  {/* 
                  ANSWER CONTAINER:
                  - Smooth height transition maintained
                  - Consistent padding that scales with viewport
                  */}
                  <div 
                    className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                    style={{
                      maxHeight: expandedFAQ === index ? '600px' : '0px',
                      opacity: expandedFAQ === index ? 1 : 0,
                      transformOrigin: 'top left'
                    }}
                  >
                    <div 
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      style={{
                        transform: expandedFAQ === index ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        padding: '0 0 1rem 0',
                        margin: '0',
                        position: 'relative'
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
                          opacity: 0.7,
                          fontSize: 'clamp(0.85rem, 0.5vw + 0.7rem, 1rem)',
                          lineHeight: '1.6',
                          letterSpacing: '0.01em',
                          fontWeight: '300',
                          paddingLeft: '1rem',
                          paddingRight: '1rem'
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
              className="mx-auto border-t border-gray-100/30"
              style={{
                paddingTop: 'clamp(1.5rem, 4vh, 3rem)',
                paddingBottom: 'clamp(1rem, 2vh, 2rem)',
                /* Match the max-width of the FAQ container for consistency */
                maxWidth: 'min(100%, 700px)',
                width: '100%'
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
                It sounds like you&apos;ve been let down before-and that kind of doubt makes perfect sense. What if you could test SEASUN risk-free and see for yourself? How would it feel to finally get the even, glowing tan you&apos;ve been chasing? Reach out at <span style={{ color: 'var(--seasun-deeper-blue)', fontWeight: '500' }}>hello@seasun.com</span> and let&apos;s find your answer.
              </p>
            </div>
        </div>
      </section>

      {/* 
      ===============================================================
      INSTAGRAM GALLERY SECTION - FLUID DESIGN APPROACH
      ===============================================================
      
      Key design principles:
      1. Fluid sizing with clamp() functions instead of breakpoints
      2. Consistent visual hierarchy with other sections
      3. Smooth scroll animations with proper hardware acceleration
      4. Responsive image optimization with progressive loading
      */}
      <section 
        className="relative seasun-section-overlay overflow-hidden" 
        aria-labelledby="instagram-heading"
        style={{
          /* Fluid vertical padding that scales with viewport height */
          paddingTop: 'clamp(3rem, 10vh, 7rem)',
          paddingBottom: 'clamp(3rem, 10vh, 7rem)',
        }}
      >
        {/* 
        CONTENT CONTAINER: 
        - Fluid width container that maintains optimal reading length
        - Consistent horizontal padding that scales with viewport
        */}
        <div 
          className="container mx-auto" 
          style={{ 
            maxWidth: 'min(90vw, 1400px)', 
            padding: '0 clamp(1rem, 5vw, 3rem)'
          }}
        >
          <div 
            className="text-center max-w-4xl mx-auto" 
            style={{ 
              marginBottom: 'clamp(2rem, 8vh, 5rem)' 
            }}
            data-scroll-animation="fade-up"
          >
            {/* 
            SECTION HEADING: 
            - Matches heading style across all sections
            - Fluid typography that scales smoothly 
            - Consistent visual hierarchy with other h2 elements
            */}
            <h2 
              id="instagram-heading" 
              className="font-light text-center"
              style={{ 
                fontFamily: 'var(--seasun-font-heading)', 
                color: 'var(--seasun-deep-black)',
                fontSize: 'clamp(1.25rem, 2vw + 0.75rem, 2.75rem)',
                fontWeight: '300',
                letterSpacing: '0.03em',
                lineHeight: '1.3',
                marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
              }}
            >
              Follow us for more beach vibes
              
              {/* 
              DECORATIVE UNDERLINE: 
              - Matches style from other sections
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
            TAGLINE: 
            - Matches body text styling across sections
            - Fluid typography with clamp()
            - Consistent opacity and margins
            */}
            <p 
              className="seasun-body font-light text-center"
              style={{ 
                color: 'var(--seasun-deep-black)', 
                opacity: 0.85,
                fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
                lineHeight: '1.6',
                maxWidth: 'min(100%, 800px)',
                margin: '0 auto',
              }}
              data-scroll-animation="fade-up"
            >
              Join our community and discover daily inspiration
            </p>
          </div>
          
          {/* 
          APPLE-INSPIRED HORIZONTAL SCROLL GALLERY:
          - Full-width scrolling section extends to page edges
          - Cards scroll horizontally with consistent sizing
          - Smooth snap scrolling behavior with navigation controls
          - Adapts to swipeable interface on mobile
          */}
          <div 
            className="relative w-screen -mx-[calc(50vw-50%)] mb-16"
            style={{
              // Full width container that extends beyond normal content margins
              overflow: 'hidden', // Ensure nothing spills outside
              marginBottom: 'clamp(3rem, 10vh, 5rem)'
            }}
          >
            {/* Horizontal scrolling container with snap behavior */}
            <div 
              id="instagram-scroll-container"
              className="relative overflow-x-auto"
              style={{
                // Hide scrollbar but maintain functionality
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                // Add scroll snap for clean stops at each card
                scrollBehavior: 'smooth',
                scrollSnapType: 'x mandatory',
                // Padding for sides creates breathing room at screen edges
                paddingLeft: 'max(1rem, calc((100vw - 1400px) / 2))',
                paddingRight: 'max(4rem, calc((100vw - 1400px) / 2 + 3rem))', // Extra space for arrow
              }}
              onScroll={(e) => {
                // Get the scroll container
                const container = e.currentTarget;
                const backButton = document.getElementById('gallery-back-button');
                const nextButton = document.getElementById('gallery-next-button');
                
                if (backButton && nextButton) {
                  // Show/hide back button based on scroll position
                  if (container.scrollLeft > 20) {
                    // Show back button when scrolled
                    backButton.style.opacity = '1';
                    backButton.style.pointerEvents = 'auto';
                  } else {
                    // Hide back button at the beginning
                    backButton.style.opacity = '0';
                    backButton.style.pointerEvents = 'none';
                  }
                  
                  // Check if we're near the end (allowing for some rounding errors)
                  const isAtEnd = container.scrollWidth - container.scrollLeft <= container.clientWidth + 20;
                  
                  // Show/hide next button based on scroll position
                  if (isAtEnd) {
                    // Hide next button at the end
                    nextButton.style.opacity = '0';
                    nextButton.style.pointerEvents = 'none';
                  } else {
                    // Show next button when not at the end
                    nextButton.style.opacity = '1';
                    nextButton.style.pointerEvents = 'auto';
                  }
                }
              }}
            >
              {/* Card row with proper spacing that scales with viewport */}
              <div className="flex gap-x-4 pb-8 md:gap-x-6 lg:gap-x-8">
                {/* Card 1 */}
                <div 
                  className="flex-none scroll-snap-align-start group relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    // Fluid card sizing using clamp for min/max constraints with viewport scaling
                    width: 'clamp(260px, 30vw, 320px)',
                    aspectRatio: '0.8/1',
                    scrollSnapAlign: 'start',
                    background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))',
                  }}
                >
                  {/* Image container with overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/ig _images/seasun-ig-img-1.png"
                      alt="SEASUN tanning oil bottle on sandy beach at sunset with palm trees"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                      priority={true} /* Load the first visible card with priority */
                      quality={85} /* Good balance of quality and file size */
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'translateZ(0)', /* Hardware acceleration hint */
                      }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      loading="eager" /* Ensure first cards load immediately */
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="seasun-body text-sm font-medium">Caribbean paradise • 2h</p>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div 
                  className="flex-none scroll-snap-align-start group relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    width: 'clamp(260px, 30vw, 320px)',
                    aspectRatio: '0.8/1',
                    scrollSnapAlign: 'start',
                    background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))',
                  }}
                >
                  {/* Image container with overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/ig _images/seasun-ig-img-2.png"
                      alt="Close-up of SEASUN organic tanning oil ingredients"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                      priority={true} /* Also prioritize second card which may be visible */
                      quality={85}
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'translateZ(0)', /* Hardware acceleration hint */
                      }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="seasun-body text-sm font-medium">Natural ingredients • 4h</p>
                  </div>
                </div>
                
                {/* Card 3 */}
                <div 
                  className="flex-none scroll-snap-align-start group relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    width: 'clamp(260px, 30vw, 320px)',
                    aspectRatio: '0.8/1',
                    scrollSnapAlign: 'start',
                    background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))',
                  }}
                >
                  {/* Image container with overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/ig _images/seasun-ig-img-3.png"
                      alt="SEASUN product with ocean waves in background"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                      quality={85}
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center 40%', /* Position to focus on the most interesting part */
                        transform: 'translateZ(0)',
                      }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      loading="lazy" /* Lazy load cards that might be offscreen initially */
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="seasun-body text-sm font-medium">Ocean vibes • 6h</p>
                  </div>
                </div>
                
                {/* Card 4 */}
                <div 
                  className="flex-none scroll-snap-align-start group relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    width: 'clamp(260px, 30vw, 320px)',
                    aspectRatio: '0.8/1',
                    scrollSnapAlign: 'start',
                    background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))',
                  }}
                >
                  {/* Image container with overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/ig _images/seasun-ig-img-4.png"
                      alt="Person applying SEASUN oil on palm-lined beach"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                      quality={85}
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'translateZ(0)',
                      }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="seasun-body text-sm font-medium">Island life • 8h</p>
                  </div>
                </div>
                
                {/* Card 5 */}
                <div 
                  className="flex-none scroll-snap-align-start group relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    width: 'clamp(260px, 30vw, 320px)',
                    aspectRatio: '0.8/1',
                    scrollSnapAlign: 'start',
                    background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))',
                  }}
                >
                  {/* Image container with overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/ig _images/seasun-ig-img-5.png"
                      alt="Person with glowing tan enjoying the sunshine"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                      quality={85}
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'translateZ(0)',
                      }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="seasun-body text-sm font-medium">Sunshine glow • 5h</p>
                  </div>
                </div>
                
                {/* Card 6 */}
                <div 
                  className="flex-none scroll-snap-align-start group relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    width: 'clamp(260px, 30vw, 320px)',
                    aspectRatio: '0.8/1',
                    scrollSnapAlign: 'start',
                    background: 'linear-gradient(135deg, var(--seasun-ocean-blue), var(--seasun-deeper-blue))',
                  }}
                >
                  {/* Image container with overlay */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="/images/ig _images/seasun-ig-img-6.png"
                      alt="SEASUN organic tanning oil bottle display"
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 320px"
                      quality={85}
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center',
                        transform: 'translateZ(0)',
                      }}
                      className="group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="seasun-body text-sm font-medium">Product showcase • 3h</p>
                  </div>
                </div>
              </div>
              
              {/* Custom CSS to hide scrollbar across browsers */}
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            </div>
            
            {/* 
            BACK BUTTON: 
            - Matches styling of other interactive elements
            - Fluid sizing with clamp() for consistent proportions
            - Enhanced transition effects for smoother interactions
            */}
            <button 
              id="gallery-back-button"
              className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hidden md:flex opacity-0 transform transition-all duration-500 ease-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                left: 'max(1rem, calc((100vw - 1400px) / 2 + 1rem))', // Align with container padding
                width: 'clamp(40px, 5vw, 56px)',
                height: 'clamp(40px, 5vw, 56px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Matches other transitions
                pointerEvents: 'none', // Initially disabled
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => {
                const container = document.getElementById('instagram-scroll-container');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll back"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Back arrow icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* 
            FORWARD BUTTON: 
            - Matches styling of back button for visual consistency
            - Enhanced with same interaction effects as other buttons
            - Proper accessibility attributes for keyboard navigation
            */}
            <button 
              id="gallery-next-button"
              className="absolute top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hidden md:flex transform transition-all duration-500 ease-out hover:scale-110 focus:outline-none focus:ring-4 focus:ring-black/10 focus:ring-offset-2 focus:ring-offset-transparent"
              style={{
                right: 'max(1rem, calc((100vw - 1400px) / 2 + 1rem))', // Align with container padding
                width: 'clamp(40px, 5vw, 56px)',
                height: 'clamp(40px, 5vw, 56px)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)', // Matches other transitions
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => {
                const container = document.getElementById('instagram-scroll-container');
                if (container) {
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
              aria-label="Scroll to see more"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15), 0 1px 4px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Forward arrow icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* 
          FOLLOW BUTTON CONTAINER: 
          - Consistent spacing that scales with viewport
          - Centered layout matching other CTA sections
          */}
          <div 
            className="text-center"
            style={{
              marginTop: 'clamp(2rem, 5vh, 4rem)',
            }}
            data-scroll-animation="fade-up"
          >
            {/* 
            INSTAGRAM FOLLOW BUTTON: 
            - Styling consistent with secondary buttons elsewhere
            - Enhanced hover effects matching other interactive elements
            - Fluid padding that scales with viewport size
            */}
            <Button 
              variant="secondary" 
              className="px-10 py-4 text-lg rounded-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-lg border-2 active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-golden-tan/20 focus:ring-offset-4 focus:ring-offset-transparent" 
              style={{ 
                borderColor: 'var(--seasun-golden-tan)', 
                color: 'var(--seasun-golden-tan)',
                background: 'linear-gradient(135deg, transparent 0%, rgba(247, 138, 21, 0.05) 100%)',
                boxShadow: '0 4px 16px rgba(247, 138, 21, 0.15), 0 1px 4px rgba(247, 138, 21, 0.1)',
                padding: 'clamp(0.75rem, 1.5vh, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 138, 21, 0.2), 0 2px 8px rgba(247, 138, 21, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(247, 138, 21, 0.15), 0 1px 4px rgba(247, 138, 21, 0.1)';
              }}
              aria-label="Follow SEASUN on Instagram"
            >
              <span className="seasun-body font-medium flex items-center gap-2">
                <span>🌊</span>
                @seasunbeauty
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Membership Sign-up Section */}
      <section className="py-20 sm:py-24 lg:py-28 relative seasun-section-overlay" aria-labelledby="membership-heading">
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl overflow-hidden">
              {/* Background image with fluid responsive approach */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src="/images/seasun-beach-image.png"
                  alt="Tropical beach scene"
                  fill
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  priority
                  quality={90}
                />
                {/* Very faint black overlay for improved readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-black/5"></div>
              </div>
              
              {/* Card content with proper z-index */}
              <div className="relative z-10">
              <h2 id="membership-heading" className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 leading-tight" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-sand)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
                Become a SEASUN Member
              </h2>
              <div className="mb-12 max-w-3xl mx-auto" role="text" aria-describedby="membership-heading">
                <p id="membership-description" className="seasun-body text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--seasun-sand)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
                  Join the SEASUN family to enjoy exclusive benefits, early access to new products, and special member-only offers.
                </p>
              </div>
              
              <div className="flex justify-center">
                <LocalizedClientLink
                  href="/account"
                  className="inline-block"
                  aria-label="Create your SEASUN member account"
                >
                  <button 
                    className="group relative seasun-body text-white px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg rounded-2xl font-medium overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-black/20 focus:ring-offset-4 focus:ring-offset-transparent"
                    style={{ 
                      backgroundColor: 'var(--seasun-deep-black)',
                      boxShadow: '0 6px 24px rgba(26, 26, 26, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      minWidth: '220px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 12px 36px rgba(26, 26, 26, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)';
                      e.currentTarget.style.backgroundColor = '#2a2a2a';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 24px rgba(26, 26, 26, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)';
                      e.currentTarget.style.backgroundColor = 'var(--seasun-deep-black)';
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="relative z-10 seasun-body tracking-wide font-semibold">Create Account</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </button>
                </LocalizedClientLink>
              </div>
              
              <p className="mt-6 text-sm seasun-body font-light" style={{ color: 'var(--seasun-sand)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
                Already a member? <LocalizedClientLink href="/account" className="underline hover:opacity-80 transition-opacity duration-200 font-medium" style={{ color: 'var(--seasun-lighter-sand)' }}>Sign in</LocalizedClientLink>
              </p>
              </div>
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