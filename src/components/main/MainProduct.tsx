
 "use client";

import React, { useState } from "react";
import { ModalMneu } from "./Modal";
import { MenuItem, menuItems } from "@/data/food";
import Image from "next/image";

 
 
export const FoodMenu: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleViewItem = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="bg-[#131212] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-amber-400">Nuestro Menú</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#131212] shadow-[#1a1919] text-white rounded-lg shadow-lg overflow-hidden"
            >
              <Image
              width={350}
              height={350}
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-300">{item.title}</h3>
                <p className="text-sm text-gray-400 truncate">{item.description}</p>
                <p className="text-amber-500 font-semibold text-lg mt-2">
                  {new Intl.NumberFormat("es-PE", {
                    style: "currency",
                    currency: "PEN",
                  }).format(+item.price)}
                </p>
                <button
                  className="mt-4 border border-amber-600 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  onClick={() => {
                    handleViewItem(item);
                    openModal();
                  }}
                >
                  Ver detalles
                </button>
              </div>
              {item.stock <= 5 && (
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  ¡Pocas unidades!
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <ModalMneu
            product={selectedItem}
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
          />
        )}
      </div>
    </div>
  );
};

