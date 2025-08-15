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
    <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center max-w-6xl mx-auto pb-8 sm:pb-12 lg:pb-16">
      {/* Product Image Display */}
      <div className="order-2 lg:order-1">
        <div className="relative rounded-3xl aspect-square overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-blue-200">
          {/* Coastal Background */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-200 via-blue-300 to-blue-500"
            style={{
              backgroundImage: `linear-gradient(135deg, 
                var(--seasun-ocean-blue) 0%, 
                var(--seasun-deeper-blue) 50%, 
                rgba(58, 166, 185, 0.8) 100%)`
            }}
          />
          
          {/* Glass morphism overlay */}
          <div className="absolute inset-0 bg-white/15 backdrop-blur-sm border border-white/25" />
          
          {/* Product Display */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="text-center">
              {/* Actual Product Image */}
              <div>
                <Image
                  src="/images/seasun-product-hero.png"
                  alt="SEASUN Organic Tanning Oil - 250ml amber bottle"
                  width={300}
                  height={450}
                  className="mx-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
            <span className="text-white text-xs font-medium">SPF 30</span>
          </div>
          
          <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
            <span className="text-white text-xs font-medium">🌿 Natural</span>
          </div>
        </div>
      </div>

      {/* Product Information & Purchase */}
      <div className="order-1 lg:order-2 text-center lg:text-left">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-8 leading-tight" 
            style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
          Meet{" "}
          <span 
            className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold text-sm sm:text-base lg:text-lg xl:text-xl" 
            style={{ 
              color: 'white', 
              backgroundColor: 'var(--seasun-golden-tan)',
              transform: 'rotate(-1deg)',
              boxShadow: '0 4px 16px rgba(247, 138, 21, 0.3)'
            }}
            aria-label="SEASUN brand name"
          >
            SEASUN
          </span>{" "}
          Organic Tanning Oil
        </h2>
        
        <div className="mb-12 max-w-3xl mx-auto lg:mx-0">
          <p className="text-lg sm:text-xl leading-relaxed font-light" 
             style={{ color: 'var(--seasun-deep-black)', opacity: 0.8, fontFamily: 'var(--seasun-font-body)' }}>
            Your new secret weapon for effortlessly radiant, even-toned skin. Inspired by 
            Caribbean beauty rituals and powered by nature's most effective ingredients.
          </p>
        </div>

        {/* Size Selection */}
        <div className="mb-8">
          <p className="text-lg font-medium mb-6" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
            Choose your size:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => setSelectedSize('100ml')}
              className={`
                px-8 py-4 rounded-2xl border-2 transition-all duration-300 font-medium w-full sm:w-auto min-w-[120px]
                ${selectedSize === '100ml' 
                  ? 'border-black bg-black text-white shadow-lg' 
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }
              `}
              style={{ 
                fontFamily: 'var(--seasun-font-body)',
                ...(selectedSize === '100ml' && {
                  backgroundColor: 'var(--seasun-golden-tan)',
                  borderColor: 'var(--seasun-golden-tan)'
                })
              }}
            >
              100ml
            </button>
            <button
              onClick={() => setSelectedSize('250ml')}
              className={`
                px-8 py-4 rounded-2xl border-2 transition-all duration-300 font-medium w-full sm:w-auto min-w-[120px]
                ${selectedSize === '250ml' 
                  ? 'border-black bg-black text-white shadow-lg' 
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }
              `}
              style={{ 
                fontFamily: 'var(--seasun-font-body)',
                ...(selectedSize === '250ml' && {
                  backgroundColor: 'var(--seasun-golden-tan)',
                  borderColor: 'var(--seasun-golden-tan)'
                })
              }}
            >
              250ml
            </button>
          </div>
        </div>

        {/* Dynamic Pricing */}
        <div className="mb-12">
          <div className="text-4xl font-light mb-2" 
               style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}>
            {displayPrice}
          </div>
          <p className="text-sm opacity-70" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
            Free shipping on orders over $50
          </p>
        </div>

        {/* Buy Now Button */}
        <div className="mb-12">
          <Button
            onClick={handleBuyNow}
            disabled={!inStock || !selectedVariant || isAdding}
            className="group relative text-white px-12 py-5 text-xl rounded-2xl font-semibold overflow-hidden transform transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-1 shadow-2xl active:scale-95 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto min-h-[68px]"
            style={{
              backgroundColor: 'var(--seasun-golden-tan)',
              boxShadow: '0 12px 48px rgba(247, 138, 21, 0.4), 0 4px 16px rgba(247, 138, 21, 0.2)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              minWidth: '280px',
              fontFamily: 'var(--seasun-font-body)'
            }}
            onMouseEnter={(e) => {
              if (!isAdding && inStock && selectedVariant) {
                e.currentTarget.style.boxShadow = '0 20px 64px rgba(247, 138, 21, 0.6), 0 8px 24px rgba(247, 138, 21, 0.3)'
                e.currentTarget.style.backgroundColor = '#cc7a00'
              }
            }}
            onMouseLeave={(e) => {
              if (!isAdding && inStock && selectedVariant) {
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(247, 138, 21, 0.4), 0 4px 16px rgba(247, 138, 21, 0.2)'
                e.currentTarget.style.backgroundColor = 'var(--seasun-golden-tan)'
              }
            }}
          >
            <span className="relative z-10 tracking-wide">
              {!selectedVariant
                ? "Select size"
                : !inStock
                ? "Out of stock"
                : isAdding
                ? "Adding to cart..."
                : "Buy Now"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          </Button>
        </div>

        {/* Product Features */}
        <div className="mb-8 sm:mb-12">
          <ul className="space-y-5 sm:space-y-6 list-none max-w-md mx-auto lg:mx-0">
            <li className="flex items-start gap-4 py-1">
              <span className="text-xl flex-shrink-0 mt-0.5" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
              <span className="text-base sm:text-lg font-medium leading-relaxed" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                SPF 30 broad spectrum protection
              </span>
            </li>
            <li className="flex items-start gap-4 py-1">
              <span className="text-xl flex-shrink-0 mt-0.5" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
              <span className="text-base sm:text-lg font-medium leading-relaxed" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                Coconut oil, aloe vera, sea minerals
              </span>
            </li>
            <li className="flex items-start gap-4 py-1">
              <span className="text-xl flex-shrink-0 mt-0.5" style={{ color: 'var(--seasun-golden-tan)' }}>✓</span>
              <span className="text-base sm:text-lg font-medium leading-relaxed" style={{ color: 'var(--seasun-deep-black)', fontFamily: 'var(--seasun-font-body)' }}>
                Reduces dark spots & hyperpigmentation
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmbeddedProductDisplay