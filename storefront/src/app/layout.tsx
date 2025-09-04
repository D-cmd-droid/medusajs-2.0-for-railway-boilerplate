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

                // 2025 Fix for mobile browser address bar hiding/showing causing jumps
                // Set the mobile browser height CSS variable based on actual viewport
                function updateMobileHeight() {
                  let vh = window.innerHeight * 0.01;
                  document.documentElement.style.setProperty('--seasun-vh', \`\${vh}px\`);
                }
                
                // Initialize height on load
                updateMobileHeight();
                
                // Update on resize and orientation change
                window.addEventListener('resize', updateMobileHeight);
                window.addEventListener('orientationchange', updateMobileHeight);
                window.addEventListener('scroll', function() {
                  // Delay update to ensure address bar is fully shown/hidden
                  setTimeout(updateMobileHeight, 100);
                });
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
