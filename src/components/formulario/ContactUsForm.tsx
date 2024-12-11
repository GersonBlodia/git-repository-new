"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import Image from "next/image";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactUsForm: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsModalOpen(true);
    reset();
    console.log("Formulario enviado:", data);
    setTimeout(() => setIsModalOpen(false), 2000);
  };

  return (
    <section className="bg-[#131212] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Formulario de Contacto */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold text-gray-400">Contáctanos</h2>
          <p className="text-lg text-gray-400">Si tienes alguna pregunta, no dudes en contactarnos.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400">Nombre</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Este campo es obligatorio" })}
                className={`mt-1 block w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md`}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            {/* Correo electrónico */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Este campo es obligatorio", pattern: { value: /^\S+@\S+\.\S+$/, message: "Correo inválido" } })}
                className={`mt-1 block w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Asunto */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400">Asunto</label>
              <input
                id="subject"
                type="text"
                {...register("subject", { required: "Este campo es obligatorio" })}
                className={`mt-1 block w-full p-3 border ${errors.subject ? "border-red-500" : "border-gray-300"} rounded-md`}
              />
              {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400">Mensaje</label>
              <textarea
                id="message"
                {...register("message", { required: "Este campo es obligatorio" })}
                className={`mt-1 block w-full p-3 border ${errors.message ? "border-red-500" : "border-gray-300"} rounded-md`}
                rows={4}
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
            </div>

            {/* Botón de Enviar */}
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Cuadro de Imágenes */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <div className="relative h-48 w-full">
            <Image
              src="/slider/Restaurante-wallpaper.jpg"
              alt="Servicio 1"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative h-48 w-full">
            <Image
              src="/coffe/coffe2.jpg"
              alt="Servicio 2"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative h-48 w-full">
            <Image
              src="/coffe/coffe2.jpg"
              alt="Servicio 3"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative h-48 w-full">
            <Image
              src="/slider/Restaurante-wallpaper.jpg"
              alt="Servicio 4"
              layout="fill"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Modal de mensaje enviado */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-900">¡Mensaje Enviado!</h3>
            <p className="text-gray-600 mt-2">Gracias por contactarnos. Nos pondremos en contacto contigo pronto.</p>
            <button
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setIsModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};
