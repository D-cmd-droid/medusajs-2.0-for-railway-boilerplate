import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 px-2 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline mb-6"
        style={{ fontFamily: 'var(--seasun-font-heading)', color: 'var(--seasun-deep-black)' }}
      >
        Your Cart is Empty
      </Heading>
      <Text 
        className="text-base-regular mb-8 max-w-[32rem] leading-relaxed" 
        style={{ fontFamily: 'var(--seasun-font-body)', color: 'var(--seasun-deep-black)', opacity: 0.8 }}
      >
        You don&apos;t have anything in your cart yet. Let&apos;s change that and discover our Caribbean beauty collection.
      </Text>
      {process.env.NEXT_PUBLIC_ENABLE_STORE_LINKS && (
        <div>
          <InteractiveLink href="/store">Explore products</InteractiveLink>
        </div>
      )}
    </div>
  )
}

export default EmptyCartMessage
