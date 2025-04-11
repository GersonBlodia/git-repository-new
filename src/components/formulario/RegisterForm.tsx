"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerPost } from "@/service/register";

interface FormData {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  direccion: string;
  fecha_nacimiento: string;
  username: string;
  password: string;
  email: string;
}

export const RegistrationForm = () => {
  const router = useRouter();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>();

  const password = watch("password");

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const onSubmit = async (data: FormData) => {
    try {
      await registerPost(data);
      reset();
      router.push("/auth/log");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  // Actualizar fuerza de contraseña cada vez que cambie
  useState(() => {
    setPasswordStrength(calculatePasswordStrength(password || ""));
  });

  const renderPasswordStrength = () => {
    if (!password) return null;

    const strength = calculatePasswordStrength(password);
    const strengthText = ["Muy débil", "Débil", "Media", "Fuerte", "Muy fuerte"];
    const strengthColor = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];

    return (
      <div className="mt-1">
        <p className="text-sm text-gray-500">Fortaleza: {strengthText[strength]}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className={`h-2.5 rounded-full ${strengthColor[strength]}`}
            style={{ width: `${strength * 25}%` }}
          />
        </div>
        {passwordStrength}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Registro de Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombres */}
          <div>
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
              Nombres *
            </label>
            <input
              {...register("nombres", { required: "Nombres es requerido", maxLength: 100 })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.nombres ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.nombres && <p className="text-red-600 text-sm mt-1">{errors.nombres.message}</p>}
          </div>

          {/* Apellidos */}
          <div>
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
              Apellidos *
            </label>
            <input
              {...register("apellidos", { required: "Apellidos es requerido", maxLength: 100 })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.apellidos ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.apellidos && <p className="text-red-600 text-sm mt-1">{errors.apellidos.message}</p>}
          </div>

          {/* DNI */}
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
              DNI *
            </label>
            <input
              {...register("dni", {
                required: "DNI es requerido",
                maxLength: 15,
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: "Solo caracteres alfanuméricos",
                },
              })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.dni ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.dni && <p className="text-red-600 text-sm mt-1">{errors.dni.message}</p>}
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              {...register("telefono", { maxLength: { value: 20, message: "Máximo 20 caracteres" } })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.telefono ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>}
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              {...register("direccion", { maxLength: { value: 255, message: "Máximo 255 caracteres" } })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.direccion ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.direccion && <p className="text-red-600 text-sm mt-1">{errors.direccion.message}</p>}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">
              Fecha de nacimiento *
            </label>
            <input
              type="date"
              {...register("fecha_nacimiento", { required: "Fecha de nacimiento es requerida" })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.fecha_nacimiento ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.fecha_nacimiento && (
              <p className="text-red-600 text-sm mt-1">{errors.fecha_nacimiento.message}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de usuario *
            </label>
            <input
              {...register("username", { required: "Nombre de usuario es requerido" })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña *
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Contraseña es requerida",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            {renderPasswordStrength()}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email es requerido",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido" },
              })}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm sm:text-sm`}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
