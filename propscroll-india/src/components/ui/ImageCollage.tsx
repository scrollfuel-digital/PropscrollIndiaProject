// components/ImageCollage.tsx
import React from "react";

type ImageCollageProps = {
  images: string[];
};

const ImageCollage: React.FC<ImageCollageProps> = ({ images }) => {
  return (
    <div className="w-full grid grid-cols-4 gap-3 h-[420px]">
      {/* Large Left Image */}
      <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
        <img
          src={images[0]}
          alt="main"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side Images */}
      {images.slice(1, 5).map((img, index) => (
        <div key={index} className="overflow-hidden rounded-2xl">
          <img
            src={img}
            alt={`img-${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollage;
