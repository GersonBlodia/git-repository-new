"use client"
export const NoOrdersMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-md shadow-sm">
      
      <h2 className="text-lg font-semibold text-gray-800">No hay órdenes disponibles</h2>
      <p className="text-sm text-gray-500 mt-2">
        Aún no has realizado ninguna orden. ¡Empieza explorando nuestros productos!
      </p>
      <button
        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => window.location.href = "/shop"} // Cambia el enlace según tu proyecto
      >
        Ver Productos
      </button>
    </div>
  );
};

 
