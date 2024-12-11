'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/helpers/formantCurrency";

// Tipado de Producto
interface Producto {
  id: number;
  image: string;
  title: string;
  price: string;
  stock: number;
  categoria: string;
  description: string;
  ingredients: string[];
}

export const OrderComponentsComponent = () => {
  const [orders, setOrders] = useState<Producto[]>([]); // Cambiar el tipo de los pedidos a Producto
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  // Recuperar productos del localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("order");
    if (savedOrders) {
      const parsedOrders: Producto[] = JSON.parse(savedOrders);
      setOrders(parsedOrders);
    }
  }, []);

  const toggleOrder = (orderId: number) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  return (
    <main className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Historial de productos</h1>

      {orders.length > 0 ? (
        orders.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleOrder(item.id)}
              className="w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {openOrder === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                  <span className="font-medium text-gray-900">
                    Producto #{item.id}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    item.stock > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.stock > 0 ? "Disponible" : "Agotado"}
                </span>
              </div>
            </button>

            <motion.div
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={openOrder === item.id ? { maxHeight: "600px", opacity: 1 } : { maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre del producto</p>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Precio</p>
                    <p className="text-lg font-bold">{formatCurrency(+item.price * item.stock)}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Categoría</p>
                  <p className="text-sm">{item.categoria}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Ingredientes</p>
                  <ul className="list-disc pl-5 text-sm">
                    {item.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/shop/productos/${item.id}`}
                  className="ml-4 w-[15%] mx-auto p-1 bg-gray-800 text-white rounded"
                >
                  Ver Pedido #{item.id}
                </Link>
              </div>
            </motion.div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay productos disponibles.</p>
      )}
    </main>
  );
};
