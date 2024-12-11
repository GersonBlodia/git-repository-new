'use client';

import React from 'react';
import Link from 'next/link';
 
import { motion } from 'framer-motion';
import { FaHome, FaUsers, FaShoppingCart, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
 
import { useStoreState } from '@/store/useAppstore';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  
  const router = usePathname()
  console.log(router)
  const isActive = useStoreState((state) => state.isActive);
  const onClickMenuBurguer = useStoreState((state) => state.onClickMenuBurguer);
  const toggleDropdown = useStoreState((state) => state.toggleDropdown);
  const isDropdownOpen = useStoreState((state) => state.isDropdownOpen);

  return (
    <nav className="w-full flex-1 flex-col xl:flex-row items-center">
      {/* Menú hamburguesa */}
      <div className="block xl:hidden fixed top-[0.4rem] right-4 z-50">
        <button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          onClick={() => {
            onClickMenuBurguer(!isActive);
            toggleDropdown();
          }}
          aria-label={isActive ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isActive ? (
            <FaTimes className="w-6 h-6 text-gray-800" />
          ) : (
            <FaBars className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Menú de navegación */}
      <ul
        className={`
          w-full h-screen xl:h-fit
          fixed top-0 
          transition-all duration-500 ease-in-out
          ${isActive ? 'left-0 opacity-100' : 'left-[-100%] xl:left-0 opacity-0 xl:opacity-100'}
          xl:relative
          bg-white xl:bg-transparent
          flex flex-col xl:flex-row
          items-center xl:justify-center
          gap-8
          pt-24 xl:pt-0
          px-8 xl:px-0
          backdrop-blur-lg bg-white/90
          z-40
        `}
      >
        {/* Elementos de navegación */}
        {[
          { path: '/', label: 'Home', icon: <FaHome /> },
          { path: '/Nosotros', label: 'Nosotros', icon: <FaUsers /> },
          { path: '/shop/orders', label: 'Carrito', icon: <FaShoppingCart /> },
        ].map((item) => (
          <li key={item.path} className="w-full xl:w-auto relative">
            <Link
              href={item.path}
              onClick={() => {
                onClickMenuBurguer(!isActive);
                toggleDropdown();
              }}
              className={`flex items-center gap-2 text-lg hover:text-orange-500 transition-colors duration-300 group ${
                router === item.path ? 'text-orange-500' : ''
              }`}
            >
              <div
                className={`group-hover:scale-110 transition-transform duration-300 ${
                  router === item.path ? 'scale-110' : ''
                }`}
              >
                {item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
            {router === item.path && (
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[3px] bg-orange-500 rounded-full"
                layoutId="activeLink"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            )}
          </li>
        ))}

        {/* Dropdown */}
        <li className="relative w-full xl:w-auto">
          <button
            className="flex items-center gap-2 text-lg hover:text-orange-500 transition-colors duration-300 group"
            onClick={toggleDropdown}
          >
            <span>Servicios</span>
            <FaChevronDown
              className={`
                transition-transform duration-300
                group-hover:scale-110
                ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>

          <ul
            className={`
              z-10
              mt-2 xl:mt-4
              w-full xl:w-56
              bg-white
              rounded-lg
              shadow-lg
              border border-gray-100
              absolute left-0 xl:left-auto
              transition-all duration-300
              ${isDropdownOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-[-10px] pointer-events-none'}
            `}
          >
            <li>
              <Link
                href="/shop"
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors duration-300"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors duration-300"
              >
                Orders
              </Link>
            </li>
          </ul>
        </li>
 
      </ul>
    </nav>
  );
};
