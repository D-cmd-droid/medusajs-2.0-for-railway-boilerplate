import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <head>
        {/* Script to prevent animation flash during initial load */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Add a class to control animation visibility
                document.documentElement.classList.add('animation-loading');
                
                // Show animations only after DOM is fully loaded
                window.addEventListener('DOMContentLoaded', function() {
                  // First allow elements to render in their initial state
                  requestAnimationFrame(function() {
                    // Then remove the animation-loading class after a frame has rendered
                    requestAnimationFrame(function() {
                      // Longer delay ensures all styles are applied before animations start
                      setTimeout(function() {
                        document.documentElement.classList.remove('animation-loading');
                      }, 100);
                    });
                  });
                });

                // 2025 Production-ready Fix for mobile browser address bar issues
                // Optimize for browsers that don't support svh/lvh units
                function updateMobileViewport() {
                  // Use RAF to ensure smooth updates
                  requestAnimationFrame(() => {
                    // Calculate viewport heights
                    const vh = window.innerHeight * 0.01;
                    
                    // Set fallback custom properties
                    document.documentElement.style.setProperty('--seasun-vh', \`\${vh}px\`);
                    
                    // No need to update svh/lvh variables as browsers handle those natively
                    // This is just a fallback for older browsers
                  });
                }
                
                // Initialize once on page load
                updateMobileViewport();
                
                // Use a debounced approach to prevent excessive updates
                let resizeTimeout;
                const handleResize = () => {
                  clearTimeout(resizeTimeout);
                  resizeTimeout = setTimeout(updateMobileViewport, 150);
                };
                
                // Better event handling with passive option for better performance
                window.addEventListener('resize', handleResize, { passive: true });
                window.addEventListener('orientationchange', handleResize, { passive: true });
              })();
            `,
          }}
        />
      </head>
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
