"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import './style.css'
export const RestaurantShowcase: React.FC = () => {
  const dishes = [
    {
      name: "Ceviche de Pescado",
      specialty: "Mariscos",
      image: "/slider/Restaurante-wallpaper.jpg",
    },
    {
      name: "Lomo Saltado",
      specialty: "Carnes",
      image: "/slider/wallpaper-lomo.jpg",
    },
    {
      name: "Ají de Gallina",
      specialty: "Comida Criolla",
      image: "/slider/aji-de-gallina.webp",
    },
    {
      name: "Pachamanca",
      specialty: "Tradicional",
      image: "/slider/pachamanca.png",
    },
    {
      name: "Tiradito Nikkei",
      specialty: "Fusión",
      image: "/slider/tiradito.jpg",
    },
  ];

  return (
    <div>
      {/* Slider principal */}
      <div className="relative w-full h-[500px]">
        <Swiper
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} custom-pagination"></span>`,
          }}
          modules={[Navigation, Pagination]}
          className="w-full h-full"
        >
          {dishes.map((dish, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[500px]">
                {/* Imagen de fondo del plato */}
                <Image
                  src={dish.image}
                  alt={dish.name}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                  className="z-0"
                />
                {/* Degradado oscuro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10" />
                {/* Contenido superpuesto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-6">
                  <h1 className="text-4xl font-bold mb-4">{dish.name}</h1>
                  <p className="text-xl font-light">{dish.specialty}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flechas de navegación personalizadas */}
        <button
          className="custom-prev absolute top-1/2 left-4 -translate-y-1/2 text-4xl text-gold z-30 hover:text-white transition"
          aria-label="Previous slide"
        >
          <MdArrowBack />
        </button>
        <button
          className="custom-next absolute top-1/2 right-4 -translate-y-1/2 text-4xl text-gold z-30 hover:text-white transition"
          aria-label="Next slide"
        >
          <MdArrowForward />
        </button>
      </div>

     
    </div>
  );
};

 