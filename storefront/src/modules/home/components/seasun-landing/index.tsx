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

import React, { useState } from 'react'
import { Button, Input } from "@medusajs/ui"

interface FAQItem {
  question: string
  answer: string
}

export default function SeasunLanding({ countryCode }: { countryCode: string }) {
  // countryCode available for future country-specific content
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  const [email, setEmail] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden seasun-hero-solid">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-12">
              <span className="seasun-body text-sm font-medium" style={{ color: 'var(--seasun-deep-black)' }}>✨ Premium Caribbean Beauty</span>
            </div>
            
            <h1 className="seasun-h1 mb-8 leading-tight">
              <span className="italic block mb-2">How does it feel to be</span>
              <span 
                className="inline-block px-4 py-2 rounded-xl not-italic font-semibold" 
                style={{ 
                  background: 'linear-gradient(45deg, var(--seasun-golden-tan), var(--seasun-darker-tan))', 
                  color: 'white',
                  transform: 'rotate(-1deg)',
                  boxShadow: '0 8px 32px rgba(247, 138, 21, 0.3)'
                }}
              >
                SUNKISSED
              </span>
              <span className="italic">?</span>
            </h1>
            
            {/* Refined Product Showcase */}
            <div className="mt-16 relative">
              <div className="w-full max-w-md mx-auto">
                <div className="relative">
                  {/* Main Product Container */}
                  <div className="rounded-3xl aspect-square flex items-center justify-center shadow-2xl border border-white/20" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' }}>
                    <div className="text-center">
                      <div className="text-7xl mb-6 filter drop-shadow-lg">🧴</div>
                      <p className="seasun-h3 mb-2" style={{ color: 'var(--seasun-golden-tan)' }}>SEASUN</p>
                      <p className="seasun-body text-sm opacity-80" style={{ color: 'var(--seasun-deep-black)' }}>Caribbean Beauty Secret</p>
                    </div>
                  </div>
                  
                  {/* Floating Elements - More Integrated */}
                  <div className="absolute -bottom-4 -left-4 hidden lg:block">
                    <div className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-white/30">
                      <p className="seasun-body text-xs font-semibold" style={{ color: 'var(--seasun-golden-tan)' }}>SPF 30+</p>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 hidden lg:block">
                    <div className="bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/30">
                      <p className="seasun-body text-xs" style={{ color: 'var(--seasun-deep-black)' }}>🌿 Natural</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tagline - Better Positioned */}
              <div className="mt-12 max-w-sm mx-auto">
                <p className="seasun-body text-lg leading-relaxed" style={{ color: 'var(--seasun-deep-black)', opacity: 0.7 }}>
                  The Caribbean's best kept secret to effortless, radiant skin
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All sections below hero wrapped in seamless gradient */}
      <div className="seasun-content-gradient">
        {/* Trust/Problem Section */}
        <section className="py-28 relative seasun-section-overlay">
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="seasun-h2 mb-8" style={{ color: 'var(--seasun-deep-black)' }}>
                I understand your frustration...
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--seasun-golden-tan)' }}></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 text-left">
                <p className="seasun-body text-lg leading-relaxed" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>
                  Look, I get it. You've probably tried it all - expensive serums, weekly facials, that 12-step routine 
                  your friend swears by.
                </p>
                <p className="seasun-body text-lg leading-relaxed font-medium" style={{ color: 'var(--seasun-deep-black)' }}>
                  And yet, you're still dealing with uneven skin tone, unexpected breakouts, 
                  and that constant feeling that your skin just isn't living up to its potential.
                </p>
              </div>
              
              <div className="text-left lg:text-right">
                <p className="seasun-body text-lg leading-relaxed" style={{ color: 'var(--seasun-deep-black)' }}>
                  You're not alone. Millions struggle with these same issues every day. 
                  <span className="font-medium">The beauty industry makes it seem so complicated</span>, 
                  but what if the answer has been hiding in the Caribbean all along?
                </p>
              </div>
            </div>
            
            <Button 
              className="text-white px-8 py-3 rounded-2xl transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-lg" 
              style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
            >
              <span className="seasun-body font-medium">Discover the Secret</span>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-24 seasun-section-overlay">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              {/* Product image placeholder */}
              <div className="rounded-3xl aspect-square flex items-center justify-center shadow-2xl bg-white/5 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-8xl mb-6">🧴</div>
                  <p className="seasun-h3" style={{ color: 'var(--seasun-golden-tan)' }}>SEASUN</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="seasun-h2 mb-8">
                You don't have to settle for uneven skin
              </h2>
              <p className="seasun-body text-xl leading-relaxed mb-10" style={{ color: 'var(--seasun-deep-black)' }}>
                Meet SEASUN - your new secret weapon for effortlessly radiant, even-toned skin. Inspired by 
                Caribbean beauty rituals and powered by nature's most effective ingredients.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <span className="text-xl mt-1" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
                  <div>
                    <p className="seasun-body text-lg font-semibold mb-2">Natural Sun Protection</p>
                    <p className="seasun-body text-gray-600">SPF 30 broad spectrum protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
                  <div>
                    <p className="seasun-body font-semibold">Caribbean Botanicals</p>
                    <p className="seasun-body text-sm text-gray-600">Coconut oil, aloe vera, and sea minerals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
                  <div>
                    <p className="seasun-body font-semibold">Even Tone Formula</p>
                    <p className="seasun-body text-sm text-gray-600">Reduces dark spots and hyperpigmentation</p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="text-white px-10 py-4 text-lg rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105" 
                style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
              >
                <span className="seasun-body">Shop Now - $45</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ritual Section */}
      <section className="py-24 seasun-section-overlay">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="seasun-h2 mb-8">
              It's time for a ritual of{" "}
              <span style={{ color: 'var(--seasun-golden-tan)' }}>GLOWING SKIN</span>{" "}
              - what's in your way?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
              <h3 className="seasun-h3 mb-6">The Old Way 😩</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="seasun-body">12-step routines that take forever</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="seasun-body">Harsh chemicals that irritate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="seasun-body">Expensive treatments with minimal results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">✗</span>
                  <span className="seasun-body">Constant worry about sun damage</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <div className="p-10 rounded-3xl shadow-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--seasun-deeper-blue) 0%, var(--seasun-ocean-blue) 100%)' }}>
                <div className="absolute top-4 right-4 text-4xl opacity-20">☀️</div>
                <div className="absolute inset-0 bg-white/3"></div>
                <div className="relative z-10">
                  <h3 className="seasun-h3 mb-8 text-white">The SEASUN Way</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="seasun-body text-lg leading-relaxed text-white">One product, multiple benefits</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="seasun-body text-lg leading-relaxed text-white">Natural ingredients that nourish</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="seasun-body text-lg leading-relaxed text-white">Affordable luxury that works</span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="seasun-body text-lg leading-relaxed text-white">Confident, protected, glowing skin</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 seasun-section-overlay">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="seasun-h2 text-center mb-16">
              Your Questions, Answered
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/30"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-white/10 transition-all duration-200"
                  >
                    <span className="seasun-body text-lg font-semibold">{faq.question}</span>
                    <span className="text-2xl transition-transform duration-200" style={{ color: 'var(--seasun-golden-tan)', transform: expandedFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      +
                    </span>
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-8 pb-6 border-t border-gray-100">
                      <p className="seasun-body text-lg leading-relaxed pt-4" style={{ color: 'var(--seasun-deep-black)' }}>{faq.answer}</p>
                    </div>
                  )}
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
      <section className="py-24 relative seasun-section-overlay">
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-3xl p-12 shadow-xl">
              <h2 className="seasun-h2 mb-6" style={{ color: 'var(--seasun-deep-black)' }}>
                Get 10% off your first order
              </h2>
              <p className="seasun-body text-lg mb-10 max-w-2xl mx-auto" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>
                Join the SEASUN family and be the first to know about new products and exclusive offers.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="seasun-body flex-1 bg-white/30 backdrop-blur-sm border border-white/40 px-6 py-4 rounded-2xl placeholder:text-gray-600"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="seasun-body text-white px-8 py-4 rounded-2xl transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-xl"
                  style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
                >
                  <span className="seasun-body font-medium">{isSubmitting ? "..." : "Subscribe"}</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 seasun-section-overlay">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="seasun-h1 mb-6">
              Ready to feel{" "}
              <span 
                className="inline-block px-3 py-1 rounded-lg" 
                style={{ 
                  color: 'white', 
                  backgroundColor: 'var(--seasun-golden-tan)',
                  transform: 'rotate(-1deg)'
                }}
              >
                SUNKISSED
              </span>
              ?
            </h2>
            
            <div className="mb-16">
              <p className="seasun-body text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--seasun-deep-black)', opacity: 0.8 }}>
                Join thousands of women who have discovered the Caribbean secret to
              </p>
              <p className="seasun-body text-xl leading-relaxed font-medium" style={{ color: 'var(--seasun-deep-black)' }}>
                radiant, even-toned skin.
              </p>
            </div>
            
            <div className="mb-12">
              <Button 
                className="text-white px-10 py-4 text-lg rounded-2xl transition-all duration-300 hover:opacity-90 hover:scale-105 shadow-xl" 
                style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
              >
                <span className="seasun-body font-medium">Shop SEASUN Now - $45</span>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="seasun-body" style={{ color: 'var(--seasun-deep-black)' }}>30-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚚</span>
                <span className="seasun-body" style={{ color: 'var(--seasun-deep-black)' }}>Free shipping on orders over $50</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}