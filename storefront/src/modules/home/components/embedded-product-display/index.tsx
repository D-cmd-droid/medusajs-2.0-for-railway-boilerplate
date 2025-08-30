"use client"

import { Button } from "@medusajs/ui"
import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { addToCart } from "@lib/data/cart"
import { getProductPrice } from "@lib/util/get-product-price"

type EmbeddedProductDisplayProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
}

const EmbeddedProductDisplay: React.FC<EmbeddedProductDisplayProps> = ({
  product,
  region,
}) => {
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

  // Get selected variant
  const selectedVariant = sizeVariantMap[selectedSize]

  // Get pricing for selected variant
  const { variantPrice } = getProductPrice({
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

  const displayPrice = selectedSize === '100ml' ? '$29.99' : '$39.99'

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-5xl mx-auto pb-4 sm:pb-6 lg:pb-8">
      {/* Product Image Display */}
      <div className="order-2 lg:order-1">
        <div className="relative rounded-2xl aspect-square overflow-hidden shadow-xl">
          {/* Coastal Background - Simplified */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: '#78c8e3',
              background: 'linear-gradient(to bottom, #78c8e3 0%, #49b0d3 100%)'
            }}
          />
          
          {/* Product Display */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="text-center">
              {/* Actual Product Image */}
              <div>
                <Image
                  src="/images/seasun-product-image.png"
                  alt="SEASUN Organic Tanning Oil - 250ml amber bottle"
                  width={320}
                  height={480}
                  className="mx-auto drop-shadow-xl"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* SPF reference removed */}
          
          <div className="absolute bottom-5 left-5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
            <span className="text-white text-xs font-medium tracking-wide">🌿 Natural</span>
          </div>
        </div>
      </div>

      {/* Product Information & Purchase */}
      <div className="order-1 lg:order-2 text-center lg:text-left px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light mb-6 leading-tight" 
            style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
          Meet{" "}
          <span 
            className="inline-block px-3 py-1 rounded-lg font-semibold text-sm sm:text-base lg:text-lg" 
            style={{ 
              color: 'white', 
              backgroundColor: 'var(--seasun-golden-tan)',
              boxShadow: '0 3px 12px rgba(247, 138, 21, 0.25)'
            }}
            aria-label="SEASUN brand name"
          >
            SEASUN
          </span>{" "}
          Organic<br className="hidden sm:block"/> Tanning Oil
        </h2>
        
        <div className="mb-6 max-w-2xl mx-auto lg:mx-0">
          <p className="text-base sm:text-lg leading-relaxed font-medium mb-3" 
             style={{ color: 'var(--seasun-deep-black)', opacity: 0.9, fontFamily: 'var(--seasun-font-body)' }}>
            Your natural beauty deserves to be enhanced, not masked.
          </p>
          <p className="text-base sm:text-lg leading-relaxed font-normal mb-3" 
             style={{ color: 'var(--seasun-deep-black)', opacity: 0.85, fontFamily: 'var(--seasun-font-body)' }}>
            The secret lies in what's NOT in the bottle: no artificial chemicals, no synthetic dyes, no empty promises - just coconut oil, cinnamon, and annatto working together as nature intended.
          </p>
          <div>
            <p className="text-base sm:text-lg leading-relaxed font-medium" 
               style={{ color: 'var(--seasun-golden-tan)', fontFamily: 'var(--seasun-font-body)' }}>
              Any reason not to glow?
            </p>
          </div>
        </div>

        {/* Size Selection and Pricing */}
        <div className="mb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 mb-2">
            {/* Size Selection */}
            <div className="flex items-center">
              <p className="text-sm font-medium mr-3" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                Size:
              </p>
              <div className="flex">
                <button
                  onClick={() => setSelectedSize('100ml')}
                  className={`
                    rounded-l-lg px-4 py-2 transition-all duration-200 text-sm
                    ${selectedSize === '100ml' 
                      ? 'bg-[#f78a15] text-white font-medium' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={{ fontFamily: 'var(--seasun-font-body)' }}
                >
                  100ml
                </button>
                <button
                  onClick={() => setSelectedSize('250ml')}
                  className={`
                    rounded-r-lg px-4 py-2 transition-all duration-200 text-sm
                    ${selectedSize === '250ml' 
                      ? 'bg-[#f78a15] text-white font-medium' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={{ fontFamily: 'var(--seasun-font-body)' }}
                >
                  250ml
                </button>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="flex items-center">
              <div className="text-2xl font-light" 
                   style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
                {displayPrice}
              </div>
            </div>
          </div>
          <p className="text-xs opacity-70 text-left mb-3" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
            Free shipping on orders over $50
          </p>
          
          {/* Buy Now Button - Separate Row */}
          <div className="flex justify-center sm:justify-start mb-3">
            <Button
              onClick={handleBuyNow}
              disabled={!inStock || !selectedVariant || isAdding}
              className="group relative text-white px-8 py-3 text-base rounded-lg font-semibold overflow-hidden transform transition-all duration-300 ease-out hover:scale-[1.02] shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              style={{
                backgroundColor: 'var(--seasun-golden-tan)',
                boxShadow: '0 4px 16px rgba(247, 138, 21, 0.35), 0 2px 8px rgba(247, 138, 21, 0.2)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: 'var(--seasun-font-body)',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                if (!isAdding && inStock && selectedVariant) {
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 138, 21, 0.5), 0 4px 12px rgba(247, 138, 21, 0.25)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isAdding && inStock && selectedVariant) {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(247, 138, 21, 0.35), 0 2px 8px rgba(247, 138, 21, 0.2)'
                }
              }}
            >
              <span className="relative z-10 tracking-wide">
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

        {/* Product Features - Enhanced */}
        <div className="border-t border-gray-100 pt-3 mt-1">
          <div className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-6">
            {/* SPF reference removed */}
            <div className="flex items-center">
              <span className="text-base flex-shrink-0" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
              <span className="text-xs font-medium tracking-wide ml-2" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                Coconut, cinnamon, annatto
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-base flex-shrink-0" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
              <span className="text-xs font-medium tracking-wide ml-2" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                Evens skin tone
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmbeddedProductDisplay