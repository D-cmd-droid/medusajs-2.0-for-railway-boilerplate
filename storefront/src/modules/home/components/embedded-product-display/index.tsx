"use client"

// ====================================================================================
// # EMBEDDED PRODUCT DISPLAY - FLUID DESIGN IMPLEMENTATION
// ====================================================================================
//
// ## FLUID DESIGN SYSTEM
// This component implements Apple-inspired fluid design principles:
//
// 1. Content-Driven Breakpoints: Design responds to content needs, not device sizes
// 2. Fluid Typography: Text scales smoothly using clamp() between viewport bounds
// 3. Fluid Spacing: Margins and padding scale proportionally with viewport
// 4. Aspect-Ratio Preservation: Image containers maintain proportions
// 5. Visual Consistency: UI elements scale uniformly across viewport sizes
//
// ## IMPLEMENTATION DETAILS
// - Typography: Uses clamp(min, preferred, max) for smooth text scaling
// - Spacing: Fluid margins and padding with min/max constraints
// - Layout: Responsive grid with fluid gap values
// - Buttons: Proportional padding and consistent visual weight
// ====================================================================================

// ====================================================================================
// IMPORTS AND DEPENDENCIES
// ====================================================================================
import { Button } from "@medusajs/ui"
import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"

// ====================================================================================
// TYPE DEFINITIONS
// ====================================================================================
type EmbeddedProductDisplayProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

// ====================================================================================
// COMPONENT IMPLEMENTATION
// ====================================================================================
const EmbeddedProductDisplay: React.FC<EmbeddedProductDisplayProps> = ({
  product,
  region, // Required for prop type validation
}) => {
  // ====================================================================================
  // STATE AND DATA MANAGEMENT
  // ====================================================================================
  const [selectedSize, setSelectedSize] = useState<'100ml' | '250ml'>('100ml')
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  
  // Map sizes to existing variants (S = 100ml, M = 250ml)
  const sizeVariantMap = useMemo(() => {
    const variants = product.variants || []
    const sVariant = variants.find(v => 
      v.options?.some(opt => opt.value === 'S')
    )
    const mVariant = variants.find(v => 
      v.options?.some(opt => opt.value === 'M')
    )
    
    return {
      '100ml': sVariant,
      '250ml': mVariant,
    }
  }, [product.variants])

  // Get selected variant based on user selection
  const selectedVariant = sizeVariantMap[selectedSize]

  // Get pricing for selected variant (used internally by Medusa)
  getProductPrice({
    product,
    variantId: selectedVariant?.id,
  })

  // Check if in stock
  const inStock = useMemo(() => {
    if (!selectedVariant) return false
    
    // If we don't manage inventory, we can always add to cart
    if (!selectedVariant.manage_inventory) return true
    
    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant.allow_backorder) return true
    
    // If there is inventory available, we can add to cart
    if (
      selectedVariant.manage_inventory &&
      (selectedVariant.inventory_quantity || 0) > 0
    ) {
      return true
    }
    
    return false
  }, [selectedVariant])

  // ====================================================================================
  // EVENT HANDLERS
  // ====================================================================================
  // Buy Now functionality - adds to cart and redirects to checkout
  const handleBuyNow = async () => {
    if (!selectedVariant?.id) return

    setIsAdding(true)
    
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
      
      // Redirect to checkout starting at address step
      window.location.href = `/${countryCode}/checkout?step=address`
    } catch (error) {
      console.error("Error adding to cart:", error)
      setIsAdding(false)
    }
  }

  // Display price based on selected size
  const displayPrice = selectedSize === '100ml' ? '$29.99' : '$39.99'

  // ===================================================================
  // MATCHING HERO LAYOUT STRUCTURE - USING XSMALL BREAKPOINT (512px)
  // ===================================================================
  return (
    <div 
      className="relative w-full mx-auto" 
      style={{
        maxWidth: 'min(90vw, 1400px)', // Match hero container width
        padding: '0 clamp(1rem, 3vw, 2rem)',
        paddingBottom: 'clamp(1rem, 4vh, 2rem)'
      }}>
      <div 
        className="grid xsmall:grid-cols-5 items-center" 
        style={{
          gap: 'clamp(1rem, 3vw, 2.5rem)',
          minHeight: 'clamp(300px, 60vh, 600px)',
          maxWidth: '1600px',
          margin: '0 auto'
        }}>
      {/* ===================================================================
         PRODUCT IMAGE DISPLAY - FLUID CONTAINER WITH ASPECT RATIO
         =================================================================== */}
      <div className="order-2 xsmall:order-1 xsmall:col-span-2 flex items-center justify-center">
        {/* Simplified container structure - matching hero layout pattern */}
        <div className="relative" style={{
            width: 'clamp(240px, 90%, 400px)',
            aspectRatio: '1/1.2',
            margin: '0 auto xsmall:mr-0 xsmall:ml-auto',
            borderRadius: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            boxShadow: '0 clamp(0.5rem, 2vw, 1.5rem) clamp(1rem, 3vw, 2rem) rgba(0,0,0,0.1)',
            overflow: 'hidden'
        }}>
          {/* Coastal Background - Simplified with fluid gradient */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: '#78c8e3',
              background: 'linear-gradient(to bottom, #78c8e3 0%, #49b0d3 100%)',
              transition: 'all 0.5s ease-in-out' // Smooth transitions for any dynamic changes
            }}
          />
          
          {/* Product Image with fill property - matches hero section pattern */}
          <Image
            src="/images/seasun-product-image.png"
            alt="SEASUN Organic Tanning Oil - 250ml amber bottle"
            fill
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 600px"
            className="z-10 object-contain"
            style={{ 
              filter: 'drop-shadow(0 clamp(6px, 1.5vw, 16px) clamp(12px, 3vw, 24px) rgba(0,0,0,0.15))',
              transition: 'all 0.3s ease-in-out',
              transform: 'scale(0.85)' // Slightly smaller to fit container better
            }}
          />
          
          {/* Natural Badge - Fluid positioning and sizing */}
          <div 
            className="absolute bg-white/15 backdrop-blur-sm border border-white/30 z-20"
            style={{
              bottom: 'clamp(1rem, 3vw, 1.5rem)',
              left: 'clamp(1rem, 3vw, 1.5rem)',
              padding: 'clamp(0.375rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
              borderRadius: '9999px',
            }}>
            <span 
              className="seasun-body font-light text-white tracking-wide"
              style={{ 
                fontSize: 'clamp(0.65rem, 0.8vw, 0.875rem)',
                lineHeight: '1.5'
              }}
            >🌿 Natural</span>
          </div>
        </div>
      </div>

      {/* ===================================================================
         PRODUCT INFORMATION & PURCHASE - FLUID LAYOUT AND TYPOGRAPHY
         =================================================================== */}
      <div 
        className="order-1 xsmall:order-2 xsmall:col-span-3 text-center xsmall:text-left" 
        style={{ 
          padding: 'clamp(0.5rem, 2vw, 1.5rem)',
          maxWidth: 'min(100%, 540px)',
          margin: '0 auto xsmall:m-0'
        }}>
        <h2 
            className="seasun-h2 font-light" 
            style={{ 
              color: 'var(--seasun-deep-black)',
              fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.5rem)',
              lineHeight: '1.2',
              marginBottom: 'clamp(1rem, 3vh, 1.5rem)'
            }}>
          Meet{" "}
          <span 
            className="inline-block rounded-lg font-semibold" 
            style={{ 
              color: 'white', 
              backgroundColor: 'var(--seasun-golden-tan)',
              boxShadow: '0 3px 12px rgba(247, 138, 21, 0.25)',
              padding: 'clamp(0.25rem, 0.5vw, 0.5rem) clamp(0.5rem, 1vw, 0.75rem)',
              fontSize: 'clamp(0.75rem, 1vw, 1.125rem)'
            }}
            aria-label="SEASUN brand name"
          >
            SEASUN
          </span>{" "}
          Organic<br className="hidden xsmall:block"/> Tanning Oil
        </h2>
        
        <div style={{ marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)' }} className="max-w-2xl mx-auto xsmall:mx-0">
          <p 
             className="seasun-body font-light" 
             style={{ 
               color: 'var(--seasun-deep-black)', 
               opacity: 0.9, 
               fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
               lineHeight: '1.7',
               marginBottom: 'clamp(0.75rem, 2vh, 1rem)'
             }}>
            Your natural beauty deserves to be enhanced, not masked.
          </p>
          <p 
             className="seasun-body font-light" 
             style={{ 
               color: 'var(--seasun-deep-black)', 
               opacity: 0.85, 
               fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
               lineHeight: '1.7',
               marginBottom: 'clamp(0.75rem, 2vh, 1rem)'
             }}>
            The secret lies in what's NOT in the bottle: no artificial chemicals, no synthetic dyes, no empty promises - just coconut oil, cinnamon, and annatto working together as nature intended.
          </p>
          <div>
            <p 
               className="seasun-body font-light" 
               style={{ 
                 color: 'var(--seasun-golden-tan)', 
                 fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',
                 lineHeight: '1.7'
               }}>
              Any reason not to glow?
            </p>
          </div>
        </div>

        {/* ===================================================================
           SIZE SELECTION AND PRICING - FLUID COMPONENTS
           =================================================================== */}
        <div style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
          <div 
            className="flex flex-col xsmall:flex-row items-start xsmall:items-center xsmall:justify-between" 
            style={{ 
              gap: 'clamp(1rem, 2vw, 1.5rem)', 
              marginBottom: 'clamp(0.5rem, 1vh, 0.75rem)' 
            }}>
            {/* Size Selection */}
            <div className="flex items-center">
              <p 
                className="seasun-body font-light"
                style={{ 
                  color: 'var(--seasun-deep-black)', 
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                  lineHeight: '1.7',
                  marginRight: 'clamp(0.5rem, 1vw, 0.75rem)'
                }}
              >
                Size:
              </p>
              <div className="flex">
                <button
                  onClick={() => setSelectedSize('100ml')}
                  className={`
                    rounded-l-lg transition-all duration-300 
                    ${selectedSize === '100ml' 
                      ? 'bg-[#f78a15] text-white font-medium' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={{ 
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                    padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 1.5vw, 1.2rem)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--seasun-font-body)',
                    fontWeight: '300'
                  }}
                >
                  100ml
                </button>
                <button
                  onClick={() => setSelectedSize('250ml')}
                  className={`
                    rounded-r-lg transition-all duration-300
                    ${selectedSize === '250ml' 
                      ? 'bg-[#f78a15] text-white font-medium' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={{ 
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                    padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 1.5vw, 1.2rem)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--seasun-font-body)',
                    fontWeight: '300'
                  }}
                >
                  250ml
                </button>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="flex items-center">
              <div 
              className="seasun-h4"
              style={{ 
                color: 'var(--seasun-deep-black)',
                fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 2rem)',
                fontWeight: 'var(--seasun-font-light)',
                lineHeight: '1.4'
              }}
            >
              {displayPrice}
            </div>
            </div>
          </div>
          <p 
            className="seasun-body font-light opacity-70 text-left" 
            style={{ 
              color: 'var(--seasun-deep-black)', 
              fontSize: 'clamp(0.65rem, 0.75vw, 0.75rem)',
              lineHeight: '1.7',
              marginBottom: 'clamp(0.75rem, 2vh, 1rem)'
            }}
          >
            Free shipping on orders over $50
          </p>
          
          {/* ===================================================================
           BUY NOW BUTTON - FLUID STYLING WITH ENHANCED ANIMATIONS
           =================================================================== */}
          <div 
            className="flex justify-center xsmall:justify-start" 
            style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}
          >
            <Button
              onClick={handleBuyNow}
              disabled={!inStock || !selectedVariant || isAdding}
              className="group relative text-white font-semibold overflow-hidden transform transition-all duration-300 ease-out hover:scale-[1.02] shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed w-full xsmall:w-auto"
              style={{
                backgroundColor: 'var(--seasun-golden-tan)',
                boxShadow: '0 clamp(4px, 1vw, 16px) clamp(8px, 2vw, 24px) rgba(247, 138, 21, 0.35), 0 clamp(2px, 0.5vw, 8px) clamp(4px, 1vw, 12px) rgba(247, 138, 21, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'var(--seasun-font-body)',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                padding: 'clamp(0.6rem, 1.5vh, 0.9rem) clamp(1.5rem, 3vw, 2.25rem)',
                borderRadius: 'clamp(0.5rem, 1vw, 0.75rem)',
                minWidth: 'clamp(160px, 30vw, 240px)',
                maxWidth: '100%'
              }}
              onMouseEnter={(e) => {
                if (!isAdding && inStock && selectedVariant) {
                  e.currentTarget.style.boxShadow = '0 clamp(8px, 2vw, 24px) clamp(16px, 4vw, 32px) rgba(247, 138, 21, 0.5), 0 clamp(4px, 1vw, 12px) clamp(8px, 2vw, 16px) rgba(247, 138, 21, 0.25)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isAdding && inStock && selectedVariant) {
                  e.currentTarget.style.boxShadow = '0 clamp(4px, 1vw, 16px) clamp(8px, 2vw, 24px) rgba(247, 138, 21, 0.35), 0 clamp(2px, 0.5vw, 8px) clamp(4px, 1vw, 12px) rgba(247, 138, 21, 0.2)'
                }
              }}
            >
              {/* Button Text - Changes based on product state */}
              <span 
                className="seasun-body font-light relative z-10 tracking-wide"
                style={{ 
                  letterSpacing: 'clamp(0.01em, 0.02vw, 0.05em)',
                  lineHeight: '1.5'
                }}
              >
                {!selectedVariant
                  ? "Select size"
                  : !inStock
                  ? "Out of stock"
                  : isAdding
                  ? "Adding..."
                  : "Buy Now"}
              </span>
            </Button>
          </div>
        </div>

        {/* ===================================================================
           PRODUCT FEATURES - ENHANCED WITH FLUID DESIGN
           =================================================================== */}
        <div style={{ 
          borderTop: '1px solid rgba(229, 231, 235, 0.8)', 
          paddingTop: 'clamp(0.75rem, 2vh, 1.25rem)',
          marginTop: 'clamp(0.25rem, 1vh, 0.5rem)'
        }}>
          <div 
            className="flex flex-wrap justify-center xsmall:justify-between"
            style={{ gap: 'clamp(1rem, 2vw, 1.5rem)' }}>
            {/* SPF reference removed */}
            <div className="flex items-center">
              <span 
                className="flex-shrink-0" 
                style={{ 
                  color: 'var(--seasun-golden-tan)',
                  fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)' 
                }}
              >✓</span>
              <span 
                className="seasun-body font-light tracking-wide" 
                style={{ 
                  color: 'var(--seasun-deep-black)', 
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  marginLeft: 'clamp(0.375rem, 0.75vw, 0.5rem)'
                }}
              >
                Coconut, cinnamon, annatto
              </span>
            </div>
            <div className="flex items-center">
              <span 
                className="flex-shrink-0" 
                style={{ 
                  color: 'var(--seasun-golden-tan)',
                  fontSize: 'clamp(0.875rem, 1.25vw, 1.125rem)' 
                }}
              >✓</span>
              <span 
                className="seasun-body font-light tracking-wide" 
                style={{ 
                  color: 'var(--seasun-deep-black)', 
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  marginLeft: 'clamp(0.375rem, 0.75vw, 0.5rem)'
                }}
              >
                Evens skin tone
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default EmbeddedProductDisplay