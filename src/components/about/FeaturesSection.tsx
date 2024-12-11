"use client"
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { IconType } from "react-icons";
import { FaUtensils } from "react-icons/fa";
import { RiRestaurantLine } from "react-icons/ri";
import { BsShieldCheck } from "react-icons/bs";

// Tipado para los datos de las tarjetas
interface CardData {
  icon: IconType;
  title: string;
  description: string;
  color: string;
}

// Datos enfocados en los servicios del restaurante
const cardsData: CardData[] = [
  {
    icon: FaUtensils,
    title: "Menús Personalizados",
    description: "Ofrecemos menús diseñados a medida para satisfacer todos los gustos y necesidades.",
    color: "bg-red-100 text-red-600",
  },
  {
    icon: RiRestaurantLine,
    title: "Ambiente Acogedor",
    description: "Disfruta de una experiencia única en un ambiente cálido y familiar.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: BsShieldCheck,
    title: "Calidad Garantizada",
    description: "Ingredientes frescos y recetas tradicionales para una experiencia gastronómica inolvidable.",
    color: "bg-green-100 text-green-600",
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 md:w-[95%] w-full mx-auto py-8">
      {cardsData.map((card, index) => (
        <FeatureCard key={index} {...card} />
      ))}
    </div>
  );
};

const FeatureCard: React.FC<CardData> = ({ icon: Icon, title, description, color }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animaciones para mostrar/ocultar el contenido
  const { height, opacity } = useSpring({
    height: isOpen ? "120px" : "0px",
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 20 },
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-center">
      {/* Icono circular */}
      <div
        onClick={handleClick}
        className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-4 cursor-pointer transition-transform transform ${
          isOpen ? "scale-110" : ""
        }`}
      >
        <Icon className="text-3xl" />
      </div>

      {/* Contenido expandible */}
      <animated.div
        style={{ height, opacity }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </animated.div>
    </div>
  );
};
