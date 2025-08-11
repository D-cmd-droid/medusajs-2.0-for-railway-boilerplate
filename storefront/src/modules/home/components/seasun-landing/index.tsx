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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--seasun-lighter-sand), var(--seasun-sand))' }}>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 seasun-body text-white px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'var(--seasun-golden-tan)' }}>
          ☀️ Summer Sale - 20% OFF
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="seasun-h1 mb-12">
              <span className="italic">How does it feel to be</span>{" "}
              <span className="font-semibold not-italic" style={{ color: 'var(--seasun-golden-tan)' }}>SUNKISSED</span>
              <span className="italic">?</span>
            </h1>
            
            <div className="mt-20 relative">
              <div className="w-full max-w-sm mx-auto">
                {/* Placeholder for product image */}
                <div className="rounded-2xl aspect-square flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(to bottom, var(--seasun-lighter-sand), var(--seasun-sand))' }}>
                  <div className="text-center">
                    <div className="text-6xl mb-6">🧴</div>
                    <p className="seasun-h4" style={{ color: 'var(--seasun-golden-tan)' }}>SEASUN</p>
                    <p className="seasun-body text-sm mt-3" style={{ color: 'var(--seasun-deep-black)' }}>Caribbean Beauty Secret</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-12 left-6 max-w-xs hidden lg:block">
                <p className="seasun-body text-sm uppercase tracking-wider leading-relaxed" style={{ color: 'var(--seasun-deep-black)' }}>
                  The Caribbean's<br />
                  Best Kept Secret to<br />
                  Effortless, Even-Toned<br />
                  Beauty
                </p>
              </div>
              
              <div className="absolute top-1/3 -right-6 transform rotate-12 hidden lg:block">
                <div className="bg-white px-4 py-3 rounded-xl shadow-lg">
                  <p className="seasun-body text-xs font-semibold">SPF 30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Problem Section */}
      <section className="py-24" style={{ backgroundColor: 'var(--seasun-background-white)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="seasun-h2 mb-12">
              I understand your frustration...
            </h2>
            <div className="space-y-8 mb-12">
              <p className="seasun-body text-xl leading-relaxed" style={{ color: 'var(--seasun-deep-black)' }}>
                Look, I get it. You've probably tried it all - expensive serums, weekly facials, that 12-step routine 
                your friend swears by. And yet, you're still dealing with uneven skin tone, unexpected breakouts, 
                and that constant feeling that your skin just isn't living up to its potential.
              </p>
              <p className="seasun-body text-xl leading-relaxed" style={{ color: 'var(--seasun-deep-black)' }}>
                You're not alone. Millions struggle with these same issues every day. The beauty industry makes it 
                seem so complicated, but what if the answer has been hiding in the Caribbean all along?
              </p>
            </div>
            <Button 
              className="text-white px-10 py-4 text-lg rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105" 
              style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
            >
              <span className="seasun-body">Discover the Secret</span>
            </Button>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-24" style={{ background: 'linear-gradient(to bottom, var(--seasun-lighter-sand), var(--seasun-background-white))' }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              {/* Product image placeholder */}
              <div className="rounded-3xl aspect-square flex items-center justify-center shadow-2xl" style={{ background: 'linear-gradient(to bottom right, var(--seasun-lighter-sand), var(--seasun-sand))' }}>
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
      <section className="py-24" style={{ backgroundColor: 'var(--seasun-background-white)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="seasun-h2 mb-8">
              It's time for a ritual of{" "}
              <span style={{ color: 'var(--seasun-golden-tan)' }}>GLOWING SKIN</span>{" "}
              - what's in your way?
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--seasun-lighter-sand)' }}>
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
            
            <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--seasun-ocean-blue)' }}>
              <h3 className="seasun-h3 mb-6 text-white">The SEASUN Way ☀️</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-white text-lg">✓</span>
                  <span className="seasun-body text-white">One product, multiple benefits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="seasun-body">Natural ingredients that nourish</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="seasun-body">Affordable luxury that works</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="seasun-body">Confident, protected, glowing skin</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24" style={{ background: 'linear-gradient(to bottom, var(--seasun-background-white), var(--seasun-lighter-sand))' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="seasun-h2 text-center mb-16">
              Your Questions, Answered
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-all duration-200"
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
      <section className="py-24" style={{ backgroundColor: 'var(--seasun-background-white)' }}>
        <div className="container mx-auto px-6">
          <h2 className="seasun-h2 text-center mb-16">
            Follow us for more beach vibes
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {instagramImages.map((_, index) => (
              <div 
                key={index}
                className="aspect-square rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg" style={{ background: 'linear-gradient(to bottom right, var(--seasun-ocean-blue), var(--seasun-deeper-blue))' }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl">🏖️</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="secondary" 
              className="px-8 py-4 text-lg rounded-xl transition-all duration-200 hover:opacity-80 hover:scale-105" 
              style={{ borderColor: 'var(--seasun-golden-tan)', color: 'var(--seasun-golden-tan)', borderWidth: '2px' }}
            >
              <span className="seasun-body">@seasunbeauty</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20" style={{ backgroundColor: 'var(--seasun-golden-tan)' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="seasun-h2 text-white mb-6">
              Get 10% off your first order
            </h2>
            <p className="seasun-body text-xl text-white/90 mb-12">
              Join the SEASUN family and be the first to know about new products and exclusive offers.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="seasun-body flex-1 bg-white px-6 py-4 rounded-xl text-lg border-0"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="seasun-body text-white px-8 py-4 text-lg rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: 'var(--seasun-deep-black)' }}
              >
                <span className="seasun-body">{isSubmitting ? "..." : "Subscribe"}</span>
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32" style={{ background: 'linear-gradient(to bottom, var(--seasun-lighter-sand), var(--seasun-background-white))' }}>
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
  )
}