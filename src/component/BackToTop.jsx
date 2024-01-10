import React, { useEffect, useState } from 'react'
import "../assetss/style/BackToTop.css"

const BackToTop = () => {
      const [isVisible, setIsVisible] = useState(false);

      const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      const scrollToTop = () => {
        const scrollStep = -window.scrollY / ((1 * 1000) / 60); // 2s để cuộn lên đầu, cập nhật mỗi frame (60fps)
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 16);
      };

      useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
          window.removeEventListener("scroll", toggleVisibility);
        };
      }, []);
  return (
    <div
      className={`back-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <i className="fas fa-chevron-up"></i>
    </div>
  );
}

export default BackToTop