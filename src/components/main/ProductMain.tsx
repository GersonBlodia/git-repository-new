"use client";

import React, { useEffect, useState } from "react";
import { ModalMneu } from "./Modal";
import { MenuItem, menuItems } from "@/data/food";
import Image from "next/image";

export const FoodMenuComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [cart, setCart] = useState<MenuItem[]>([]);

  // Recuperar el carrito del localStorage al cargar el componente
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Actualizar el localStorage cuando el carrito cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleViewItem = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => setModalIsOpen(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, stock: cartItem.stock + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, stock: 1 }];
    });
  };

  const filteredItems =
    selectedCategory === "Todos"
      ? menuItems
      : menuItems.filter((item) => item.categoria === selectedCategory);

  const uniqueCategories = ["Todos", ...new Set(menuItems.map((item) => item.categoria))];

  return (
    <div className="bg-[#131212] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-amber-400">Nuestro Menú</h2>

        {/* Botones de categorías */}
        <div className="flex justify-center space-x-4 mb-8">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md border ${
                selectedCategory === category
                  ? "bg-amber-500 text-white"
                  : "bg-gray-800 text-gray-300"
              } hover:bg-amber-400`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menú filtrado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
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
                  onClick={() => handleAddToCart(item)}
                >
                  Agregar al carrito
                </button>
                <button
                  className="mt-2 border border-amber-600 text-white px-4 py-2 rounded-md hover:bg-orange-600"
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
