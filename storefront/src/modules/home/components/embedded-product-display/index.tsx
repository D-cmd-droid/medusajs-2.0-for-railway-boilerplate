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
  const [quantity, setQuantity] = useState<number>(1)
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
  
  // Calculate max quantity based on inventory
  const maxQuantity = useMemo(() => {
    if (!selectedVariant) return 10
    
    if (!selectedVariant.manage_inventory || selectedVariant.allow_backorder) {
      return 10 // Default max if inventory not managed
    }
    
    return Math.min(selectedVariant.inventory_quantity || 0, 10)
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
        quantity: quantity,
        countryCode,
      })
      
      // Redirect to checkout starting at address step
      window.location.href = `/${countryCode}/checkout?step=address`
    } catch (error) {
      console.error("Error adding to cart:", error)
      setIsAdding(false)
    }
  }


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
          <span 
            className="inline-block rounded-lg font-semibold" 
            style={{ 
              color: 'white', 
              backgroundColor: 'var(--seasun-golden-tan)',
              boxShadow: '0 3px 12px rgba(247, 138, 21, 0.25)',
              padding: 'clamp(0.3rem, 0.7vw, 0.7rem) clamp(0.7rem, 1.2vw, 1rem)',
              fontSize: 'clamp(1rem, 1.5vw, 1.5rem)'
            }}
            aria-label="SEASUN brand name"
          >
            SEASUN
          </span>{" "}
          <span style={{ 
            fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.8rem)', 
            fontWeight: 'lighter',
            opacity: '0.9'
          }}>
            Organic Tanning Oil
          </span>
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
          <div className="py-1.5 my-1 border-t border-b border-golden-tan/20">
            <p 
               className="seasun-body font-medium text-center" 
               style={{ 
                 color: 'var(--seasun-golden-tan)', 
                 fontSize: 'clamp(0.85rem, 0.9vw + 0.3rem, 1.1rem)',
                 lineHeight: '1.4',
                 fontWeight: 'bold',
                 letterSpacing: '0.01em',
                 textShadow: '0 1px 2px rgba(0,0,0,0.05)'
               }}>
              <span className="mr-2 text-xs">✨</span>
              Any reason not to glow?
              <span className="ml-2 text-xs">✨</span>
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
                    rounded-lg transition-all duration-300 relative
                    ${selectedSize === '100ml' 
                      ? 'bg-[#f78a15] text-white shadow-lg' 
                      : 'bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 hover:bg-white/50'
                    }
                  `}
                  style={{ 
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                    padding: 'clamp(0.5rem, 0.75vw, 0.75rem) clamp(0.5rem, 1vw, 0.75rem)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--seasun-font-body)',
                    fontWeight: selectedSize === '100ml' ? '500' : '300',
                    marginRight: '0.75rem',
                    minWidth: '180px',
                    width: '100%',
                    flex: '1'
                  }}
                >
                  <div className="flex flex-row items-center justify-between w-full px-2">
                    <span className="text-base font-medium">100ml</span>
                    <div className="h-10 border-l border-white/20 mx-2"></div>
                    <span className={`${selectedSize === '100ml' ? 'font-medium' : ''}`}>$29.99</span>
                  </div>
                  {selectedSize === '100ml' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-sm"></span>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSize('250ml')}
                  className={`
                    rounded-lg transition-all duration-300 relative
                    ${selectedSize === '250ml' 
                      ? 'bg-[#f78a15] text-white shadow-lg' 
                      : 'bg-white/30 backdrop-blur-sm border border-white/40 text-gray-700 hover:bg-white/50'
                    }
                  `}
                  style={{ 
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                    padding: 'clamp(0.5rem, 0.75vw, 0.75rem) clamp(0.5rem, 1vw, 0.75rem)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--seasun-font-body)',
                    fontWeight: selectedSize === '250ml' ? '500' : '300',
                    minWidth: '180px',
                    width: '100%',
                    flex: '1'
                  }}
                >
                  <div className="flex flex-row items-center justify-between w-full px-2">
                    <span className="text-base font-medium">250ml</span>
                    <div className="h-10 border-l border-white/20 mx-2"></div>
                    <span className={`${selectedSize === '250ml' ? 'font-medium' : ''}`}>$39.99</span>
                  </div>
                  {selectedSize === '250ml' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-sm"></span>
                  )}
                </button>
              </div>
            </div>
            
          </div>
          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <p 
              className="seasun-body font-light"
              style={{ 
                color: 'var(--seasun-deep-black)', 
                fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                lineHeight: '1.7',
                marginRight: 'clamp(0.5rem, 1vw, 0.75rem)'
              }}
            >
              Quantity:
            </p>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-9 h-9 flex items-center justify-center rounded-l-lg bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
                style={{
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <span className="text-lg font-light">−</span>
              </button>
              
              <input
                type="text"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= maxQuantity) {
                    setQuantity(val);
                  }
                }}
                className="w-10 h-9 text-center bg-white/20 backdrop-blur-sm border-t border-b border-white/40 focus:outline-none"
                aria-label="Quantity"
                style={{
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                }}
              />
              
              <button
                onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                disabled={quantity >= maxQuantity}
                className="w-9 h-9 flex items-center justify-center rounded-r-lg bg-white/30 backdrop-blur-sm border border-white/40 hover:bg-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
                style={{
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <span className="text-lg font-light">+</span>
              </button>
              
              {maxQuantity < 10 && (
                <span className="ml-3 text-xs opacity-70">
                  (Only {maxQuantity} left)
                </span>
              )}
            </div>
          </div>
          
          
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
              className="group relative text-white font-semibold overflow-hidden transform transition-all duration-300 ease-out hover:scale-[1.02] shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed w-full"
              style={{
                backgroundColor: 'var(--seasun-golden-tan)',
                boxShadow: '0 clamp(4px, 1vw, 16px) clamp(8px, 2vw, 24px) rgba(247, 138, 21, 0.35), 0 clamp(2px, 0.5vw, 8px) clamp(4px, 1vw, 12px) rgba(247, 138, 21, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'var(--seasun-font-body)',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                padding: 'clamp(0.9rem, 1.5vh, 1.2rem) clamp(1.5rem, 3vw, 2.25rem)',
                borderRadius: 'clamp(0.5rem, 1vw, 0.75rem)',
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
                className="seasun-body relative z-10 tracking-wide flex items-center justify-center"
                style={{ 
                  letterSpacing: 'clamp(0.01em, 0.02vw, 0.05em)',
                  lineHeight: '1.5',
                  fontWeight: '600'
                }}
              >
                {!selectedVariant
                  ? "Select size"
                  : !inStock
                  ? "Out of stock"
                  : isAdding
                  ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  )
                  : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5H7C4.79086 5 3 6.79086 3 9V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V9C21 6.79086 19.2091 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12V16M12 12L9 14.5M12 12L15 14.5" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Buy Now
                    </>
                  )}
              </span>
              
              {/* Animated highlight effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </Button>
            
            {/* Secure checkout indicator */}
            <div className="text-xs text-center mt-3 opacity-70">
              Secure checkout • Fast delivery
            </div>
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

export default EmbeddedProductDisplay