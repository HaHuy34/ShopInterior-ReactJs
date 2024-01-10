import React from "react";
import "../assetss/style/LoadingProduct.css";

const LoadingProduct = () => {
  return (
      <section>
        <div class="container">
          <div class="card-skeleton">
            <div class="animated-background">
              <div class="card-skeleton-img"></div>
              <div class="skel-mask-container">
                <div class="skel-mask skel-mask-1"></div>
                <div class="skel-mask skel-mask-2"></div>
                <div class="skel-mask skel-mask-3"></div>
                <div class="skel-mask skel-mask-4"></div>
                <div class="skel-mask skel-mask-5"></div>
                <div class="skel-mask skel-mask-6"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default LoadingProduct;
