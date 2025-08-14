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

import React, { useState, useRef } from 'react'
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

export default function SeasunLanding({ countryCode, region, product }: SeasunLandingProps) {
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
      answer: "SEASUN uses a unique Caribbean formula that has been perfected over generations. Our blend of natural ingredients works with your skin's natural processes, not against them."
    },
    {
      question: "What if my sensitive skin flares up?",
      answer: "SEASUN is formulated with sensitive skin in mind. Our gentle, natural ingredients are dermatologist-tested and free from harsh chemicals. We offer a 30-day money-back guarantee if you experience any irritation."
    },
    {
      question: "Isn't natural skincare just not as effective?",
      answer: "Natural doesn't mean less effective. SEASUN combines time-tested Caribbean botanicals with modern skincare science to deliver results that rival any synthetic product."
    },
    {
      question: "Am I just overthinking my skincare routine?",
      answer: "You're not overthinking - you're being thoughtful about what you put on your skin. SEASUN simplifies your routine while delivering the results you want."
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
      {/* Hero Section */}
      <section 
        className="relative min-h-[100vh] sm:min-h-screen flex items-center justify-center overflow-hidden seasun-hero-solid py-16 sm:py-20"
        role="banner"
        aria-labelledby="hero-heading"
        aria-describedby="hero-description"
      >
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Premium Badge */}
            <div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-8 sm:mb-12"
              role="banner"
              aria-label="Premium product badge"
            >
              <span className="seasun-body text-xs sm:text-sm font-medium" style={{ color: 'var(--seasun-deep-black)' }}>✨ Premium Caribbean Beauty</span>
            </div>
            
            <h1 
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light mb-6 sm:mb-8 leading-tight max-w-4xl mx-auto" 
              style={{ fontFamily: 'var(--seasun-font-heading)' }}
            >
              The Caribbean's best kept secret to effortless, radiant skin
            </h1>
            
            {/* Refined Product Showcase */}
            <div className="mt-12 sm:mt-16 lg:mt-20 relative" role="presentation" aria-labelledby="hero-heading">
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                <div className="relative">
                  {/* Main Product Container */}
                  <div 
                    className="group rounded-2xl sm:rounded-3xl aspect-square flex items-center justify-center shadow-xl sm:shadow-2xl border border-white/20 transition-all duration-500 ease-out hover:scale-105 hover:shadow-3xl cursor-pointer" 
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' }}
                    role="img"
                    aria-label="SEASUN Caribbean Beauty product showcase"
                  >
                    <div className="text-center transition-all duration-300 group-hover:scale-105">
                      <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 filter drop-shadow-lg transition-transform duration-300 group-hover:rotate-3" aria-hidden="true">🧴</div>
                      <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-1 sm:mb-2 transition-colors duration-300" style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-golden-tan)' }}>SEASUN</p>
                      <p className="seasun-body text-xs sm:text-sm opacity-80 font-light transition-opacity duration-300 group-hover:opacity-100" style={{ color: 'var(--seasun-deep-black)' }}>Caribbean Beauty Secret</p>
                    </div>
                  </div>
                  
                  {/* Floating Elements - More Integrated */}
                  <div 
                    className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 hidden md:block animate-pulse"
                    role="note"
                    aria-label="SPF 30 plus protection feature"
                    style={{ animationDelay: '1s', animationDuration: '3s' }}
                  >
                    <div className="bg-white/60 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-white/30 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:bg-white/80">
                      <p className="seasun-body text-xs font-semibold" style={{ color: 'var(--seasun-golden-tan)' }}>SPF 30+</p>
                    </div>
                  </div>
                  
                  <div 
                    className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 hidden md:block animate-pulse"
                    role="note"
                    aria-label="Natural ingredients feature"
                    style={{ animationDelay: '2s', animationDuration: '3s' }}
                  >
                    <div className="bg-white/60 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg border border-white/30 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:bg-white/80">
                      <p className="seasun-body text-xs font-light" style={{ color: 'var(--seasun-deep-black)' }}><span aria-hidden="true">🌿</span> Natural</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Transition Question - Better Positioned */}
              <div className="mt-10 sm:mt-14 max-w-lg mx-auto" role="text">
                <p 
                  id="hero-description"
                  className="seasun-body text-lg sm:text-xl leading-relaxed font-light italic text-center" 
                  style={{ color: 'var(--seasun-deep-black)', opacity: 0.85 }}
                >
                  How does it feel to be{" "}
                  <span 
                    className="font-medium not-italic tracking-wide"
                    style={{ color: 'var(--seasun-golden-tan)' }}
                  >
                    SUNKISSED
                  </span>
                  ?
                </p>
              </div>
            </div>
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
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 max-w-6xl mx-auto" role="text" aria-describedby="trust-problem-heading">
              <div className="space-y-6 text-left">
                <p className="seasun-body text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--seasun-deep-black)', opacity: 0.7 }}>
                  Look, I get it. You've probably tried it all - expensive serums, weekly facials, that 12-step routine 
                  your friend swears by.
                </p>
                <p className="seasun-body text-base sm:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.9 }}>
                  And yet, you're still dealing with uneven skin tone, unexpected breakouts, 
                  and that constant feeling that your skin just isn't living up to its potential.
                </p>
              </div>
              
              <div className="text-left lg:text-right">
                <p className="seasun-body text-base sm:text-lg leading-relaxed font-light" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>
                  You're not alone. Millions struggle with these same issues every day. 
                  <span className="font-medium" style={{ color: 'var(--seasun-deep-black)' }}>The beauty industry makes it seem so complicated</span>, 
                  but what if the answer has been hiding in the Caribbean all along?
                </p>
              </div>
            </div>
            
            <Button 
              onClick={scrollToProductSection}
              className="group relative text-white px-8 py-4 sm:px-12 sm:py-5 text-base sm:text-lg rounded-2xl font-semibold overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-2xl active:scale-95 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-orange/20 focus:ring-offset-4 focus:ring-offset-transparent w-full sm:w-auto min-h-[60px] sm:min-h-[64px]"
              style={{ 
                backgroundColor: 'var(--seasun-golden-tan)',
                boxShadow: '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(247, 138, 21, 0.5), 0 6px 16px rgba(247, 138, 21, 0.3)';
                e.currentTarget.style.backgroundColor = '#cc7a00';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(247, 138, 21, 0.3), 0 2px 8px rgba(247, 138, 21, 0.2)';
                e.currentTarget.style.backgroundColor = 'var(--seasun-golden-tan)';
              }}
              aria-label="Discover the Caribbean beauty secret to solve your skincare frustrations"
              role="button"
              tabIndex={0}
            >
              <span className="relative z-10 seasun-body tracking-wide">Discover the Secret</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
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
                      <div className="w-6 h-6 rounded-full bg-red-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-red-200" aria-hidden="true">
                        <span className="text-red-600 text-sm font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>12-step routines that take forever</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 rounded-full bg-red-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-red-200" aria-hidden="true">
                        <span className="text-red-600 text-sm font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Harsh chemicals that irritate</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 rounded-full bg-red-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-red-200" aria-hidden="true">
                        <span className="text-red-600 text-sm font-semibold">✗</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed font-normal" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Expensive treatments with minimal results</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 rounded-full bg-red-100/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-red-200" aria-hidden="true">
                        <span className="text-red-600 text-sm font-semibold">✗</span>
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
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-white/20" aria-hidden="true">
                        <span className="text-white text-sm font-semibold">✓</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">One product, multiple benefits</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-white/20" aria-hidden="true">
                        <span className="text-white text-sm font-semibold">✓</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">Natural ingredients that nourish</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-white/20" aria-hidden="true">
                        <span className="text-white text-sm font-semibold">✓</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">Affordable luxury that works</span>
                    </li>
                    <li className="flex items-start gap-4" role="listitem">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1 border border-white/20" aria-hidden="true">
                        <span className="text-white text-sm font-semibold">✓</span>
                      </div>
                      <span className="seasun-body text-base lg:text-lg leading-relaxed text-white font-normal">Confident, protected, glowing skin</span>
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
              Your Questions, Answered
            </h2>
            
            <div className="space-y-4 sm:space-y-6" role="region" aria-labelledby="faq-heading">
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
                      maxHeight: expandedFAQ === index ? '300px' : '0px',
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
      <section ref={productSectionRef} className="py-20 sm:py-24 lg:py-28 seasun-section-overlay" aria-labelledby="product-showcase-heading">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Product Display */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
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
          <div className="text-center">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8 max-w-lg sm:max-w-2xl mx-auto list-none" role="list" aria-label="Product guarantees and shipping information">
              <li className="flex items-center justify-center sm:justify-center gap-3 opacity-80 p-2 rounded-lg" role="listitem">
                <span className="text-base sm:text-lg flex-shrink-0" style={{ color: 'var(--seasun-golden-tan)' }} aria-hidden="true">✓</span>
                <span className="seasun-body text-sm sm:text-xs font-normal text-center sm:text-left" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>30-day money back guarantee</span>
              </li>
              <li className="flex items-center justify-center sm:justify-center gap-3 opacity-80 p-2 rounded-lg" role="listitem">
                <span className="text-base sm:text-lg flex-shrink-0" aria-hidden="true">🚚</span>
                <span className="seasun-body text-sm sm:text-xs font-normal text-center sm:text-left" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>Free shipping on orders over $50</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}