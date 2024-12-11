"use client";
import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from 'next/image';

const comments = [
  { 
    name: 'Carlos López', 
    rating: 5, 
    comment: '¡Increíble sabor y excelente atención!', 
    image: '/commentary/jimmy01.jpg' 
  },
  { 
    name: 'Ana Pérez', 
    rating: 4, 
    comment: 'Un ambiente muy acogedor, los platos deliciosos.', 
    image: '/commentary/jimmy02.jpg' 
  },
  { 
    name: 'Jorge Ramírez', 
    rating: 5, 
    comment: 'El mejor lugar para disfrutar de comida peruana.', 
    image: '/commentary/jimmy03.jpg' 
  },
];

export const CommentSlider = () => {
  return (
    <div className="bg-[#131212] w-full mx-auto py-8 px-4 sm:px-6 lg:px-8 cursor-pointer">
      <h2 className="text-3xl font-bold text-center mb-8 text-amber-600">
        Opiniones de Nuestros Clientes
      </h2>
      <Swiper
        slidesPerView={1}
        pagination={{
          el: ".comment-slider-pagination",
          clickable: true,
        }}
        modules={[Pagination]}
        spaceBetween={20}
      >
        {comments.map((comment, index) => (
          <SwiperSlide key={index}>
            <div className="border border-amber-400 p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-[50%] mx-auto">
              <div className="mb-4">
                <Image
                width={350}
                height={350} 
                  src={comment.image} 
                  alt={comment.name} 
                  className="w-20 h-20 rounded-full object-cover shadow-md" 
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">{comment.name}</h3>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-500 ${i < comment.rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-center text-gray-700">{comment.comment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="comment-slider-pagination mt-4 md:w-[40%] mx-auto text-center flex gap-8 justify-center"></div>
    </div>
  );
};
