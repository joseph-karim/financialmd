import { useEffect, useRef } from 'react';

export function RVUCalculatorWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only add the script if it doesn't already exist
    if (!window.rvuCalculatorWidgetLoaded && containerRef.current) {
      // Set a flag to prevent duplicate loading
      window.rvuCalculatorWidgetLoaded = true;
      
      // Create the widget script
      const script = document.createElement('script');
      script.id = 'aapc-rvu-calculator-script';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        !function () { 
          var a = document.createElement("script"); 
          a.type = "text/javascript"; 
          a.async = !0; 
          a.src = "//aapcperfect.s3.amazonaws.com/aapc/js/rvu-calculator-widget-new.js"; 
          var b = document.getElementsByTagName("script")[0]; 
          b.parentNode.insertBefore(a, b) 
        }();
      `;
      
      // Append to document head
      document.head.appendChild(script);
    }
  }, []);
  
  return (
    <div ref={containerRef} className="w-full flex justify-center">
      <div className="rvuCalculatorWidget" style={{ maxWidth: "480px" }} data-link="true">
        <a href="https://www.aapc.com/tools/rvu-calculator.aspx" id="rvuCalculatorWidgetLinkAAPC">
          AAPC RVU Calculator
        </a>
        <noscript>
          <a href="https://www.aapc.com/tools/rvu-calculator.aspx">AAPC RVU Calculator</a>
        </noscript>
      </div>
    </div>
  );
}