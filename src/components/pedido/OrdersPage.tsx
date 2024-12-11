"use client" 
import { formatCurrency } from '@/helpers/formantCurrency';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from "framer-motion"; // Importa Framer Motion
import Image from 'next/image';
// Tipos de datos
interface User {
    id: number;
    name: string;
    email: string;
  }
  
  interface Venta {
    id: number;
    description: string;
  }
  
  interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
    size?: string; // Si el producto tiene una talla
    product: {
      id: number;
      name_products: string;
      description: string;
      image: string[];
      price: number;
    };
  }
  
  interface Pedido {
    id: number;
    total: number;
    userId: number;
    user: User;
    ventaId?: number;
    venta?: Venta;
    items: OrderItem[];
    create_at: Date;
    status:boolean
  }

export const OrderComponent = ({ items }: { items: Pedido }) => {
  const [openOrder, setOpenOrder] = useState<number | null>(null);

  // Función para mostrar el estado
  const toggleOrder = (orderId: number) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Botón para expandir o contraer la orden */}
        <button
          onClick={() => toggleOrder(items.id)}
          className="w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {openOrder === items.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
              <span className="font-medium text-gray-900">
                Pedido #{items.id}
              </span>
            </div>
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                items.status
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {items.status ? "Completado" : "Pendiente"}
            </span>
          </div>
        </button>

        {/* Detalles del pedido con animación de transición */}
        <motion.div
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={openOrder === items.id ? { maxHeight: "600px", opacity: 1 } : { maxHeight: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="font-medium">{items.user.name}</p>
                <p className="text-sm text-gray-500">{items.user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-lg font-bold">
                  {formatCurrency(items.total)}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="text-sm">{formatDate(items.create_at)}</p>
            </div>

            {/* Productos con scroll */}
            <div className="h-48 overflow-y-auto space-y-4 border-t border-gray-200 pt-4">
              {items.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow"
                >
                  <Image
                  width={350}
                  height={350}
                    src={`${item.product.image[0]}`}
                    alt={item.product.name_products}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.product.name_products}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.product.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cantidad: {item.quantity}
                    </p>
                    {item.size && (
                      <p className="text-sm text-gray-600">Tamaño: {item.size}</p>
                    )}
                  </div>
                  <p className="font-bold text-gray-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={`/shop/orders/${items.id}`}
              className="ml-4 w-[15%] mx-auto p-1 bg-gray-800 text-white rounded"
            >
              Ver pedido #{items.id}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
