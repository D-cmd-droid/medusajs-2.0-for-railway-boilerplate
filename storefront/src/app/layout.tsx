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
