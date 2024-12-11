"use client";

import React, { useEffect, useState } from "react";
import { MenuItem } from "@/data/food";

export const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  // Recuperar el carrito desde el localStorage al cargar el componente
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleConfirmOrder = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de confirmar el pedido.");
      return;
    }

    // Guardar el pedido confirmado en el localStorage
    localStorage.setItem("order", JSON.stringify(cart));

    // Limpiar el carrito
    localStorage.removeItem("cart");
    setCart([]);
    setOrderConfirmed(true);
  };

  return (
    <div className="w-[100%] p-8 mx-auto my-8  bg-gray-800 text-white  shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cesta de Compras</h2>

      {cart.length > 0 ? (
        <div>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b border-gray-700"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-400">
                    {new Intl.NumberFormat("es-PE", {
                      style: "currency",
                      currency: "PEN",
                    }).format(+item.price)}
                  </p>
                  <p className="text-sm text-gray-400">Cantidad: {item.stock}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <p className="font-bold text-lg">
              Total: {new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "PEN",
              }).format(
                cart.reduce((acc, item) => acc + +item.price * item.stock, 0)
              )}
            </p>
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-2 bg-amber-500 text-white font-bold rounded-md hover:bg-amber-600"
            >
              Confirmar Pedido
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Tu carrito está vacío.</p>
      )}

      {orderConfirmed && (
        <p className="mt-4 text-green-500 font-semibold">Pedido confirmado con éxito. ¡Gracias por tu compra!</p>
      )}
    </div>
  );
};