"use client";
import React, { useEffect, useState, useRef } from "react"; // Importar useEffect y useState
import CountUp from "react-countup"; // Importar react-countup
import { motion } from "framer-motion"; // Importar framer-motion

export const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false); // Estado para determinar la visibilidad
  const sectionRef = useRef<HTMLDivElement | null>(null); // Tipar el ref como HTMLDivElement

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Verificar si la sección está en el viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true); // Cambiar el estado a visible
          window.removeEventListener("scroll", handleScroll);  
        }
      }
    };

    window.addEventListener("scroll", handleScroll); // Añadir el listener de scroll
    return () => {
      window.removeEventListener("scroll", handleScroll); // Limpiar el listener en caso de desmontar
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {/* Carreras Disponibles */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {isVisible ? <CountUp end={20} duration={3} suffix="+" /> : "0+"}
            </div>
            <p className="text-gray-600">Carreras Disponibles</p>
          </motion.div>

          {/* Estudiantes Satisfechos */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {isVisible ? <CountUp end={5000} duration={4} suffix="+" /> : "0+"}
            </div>
            <p className="text-gray-600">Ciudadanos Satisfechos</p>
          </motion.div>

          {/* Diseños Exclusivos */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {isVisible ? <CountUp end={100} duration={2} suffix="+" /> : "0+"}
            </div>
            <p className="text-gray-600">PLatillos Exclusivos</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
