import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div 
        className="h-16 border-b shadow-sm"
        style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
      >
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-white flex items-center gap-x-2 uppercase flex-1 basis-0 hover:text-white/80 transition-colors duration-200"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus hover:text-white/80">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus hover:text-white/80">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="text-white hover:text-white/80 uppercase transition-colors duration-200 text-2xl font-light tracking-wide"
            style={{ fontFamily: 'var(--seasun-font-heading)' }}
            data-testid="store-link"
          >
            SEASUN
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div 
        className="py-6 w-full border-t"
        style={{ backgroundColor: 'var(--seasun-golden-tan)' }}
      >
        <div className="content-container flex justify-center">
          <div className="text-center">
            <p className="text-white text-sm font-light" style={{ fontFamily: 'var(--seasun-font-body)' }}>
              © {new Date().getFullYear()} SEASUN. All rights reserved.
            </p>
            <p className="text-white/80 text-xs mt-1" style={{ fontFamily: 'var(--seasun-font-body)' }}>
              Caribbean Beauty Secret
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
