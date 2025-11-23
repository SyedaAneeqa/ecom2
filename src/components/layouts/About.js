'use client';
import React from 'react';

export default function AboutUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 px-4">
        
        {/* Image */}
        <div className="lg:w-1/2 w-full">
          <img
            src="https://www.everlane.com/cdn/shop/files/5056feb8_6bab.jpg?v=1763424022&width=823"
            alt="Style Corner Clothing"
            className="rounded-lg shadow-lg w-full h-180 object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="lg:w-1/2 w-full space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">About Style Corner</h2>
          <p className="text-gray-700 text-lg">
            Welcome to <span className="font-semibold">Style Corner</span>! We are your go-to destination for trendy and stylish clothing for men and women. Our collection is carefully curated to suit every occasion, mood, and personality.
          </p>
          <p className="text-gray-700 text-lg">
            Our mission is to bring fashion and comfort together, offering clothing that not only looks good but feels amazing to wear. At Style Corner, we believe everyone deserves to express themselves through their style.
          </p>
          <p className="text-gray-700 text-lg">
            Explore our range of casual wear, formal outfits, and unique accessories, and let Style Corner be your fashion companion every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
}
