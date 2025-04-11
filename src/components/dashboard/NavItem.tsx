"use client"
import Link from "next/link";
import { ReactNode, useState } from "react";
 
import { BarChart4, Calendar, ChefHat, Home, LogOut, MenuIcon, Settings, Users, X } from "lucide-react";

interface NavItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  expanded?: boolean;
}
// Componente para los elementos de navegación
export const NavItem: React.FC<NavItemProps> = ({ icon, text, active = false, expanded = true }) => {

   

  return (
    <div className={`p-4 flex items-center ${active ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'} cursor-pointer`}>
      <div className={`${expanded ? '' : 'mx-auto'}`}>{icon}</div>
      {expanded && 
        <Link href={`/dashboard/${text}`}> 
        <span className="ml-4 text-sm font-medium">{text}</span>
        </Link>
}
    </div>
  );
};

 
const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  return (
    <section className="dashboard-container ">
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col h-full`}>
     <div>
       <div className="p-4 flex items-center justify-between">
         {sidebarOpen && <h2 className="text-xl font-bold text-gray-800">Restaurante Diana</h2>}
         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-full hover:bg-gray-100">
           {sidebarOpen ? <X size={18} /> : <MenuIcon size={18} />}
         </button>
       </div>
       <div className="mt-6">
         <NavItem icon={<Home size={20} />} text="Dashboard" active={true} expanded={sidebarOpen} />
         <NavItem icon={<ChefHat size={20} />} text="Cocina" expanded={sidebarOpen} />
         <NavItem icon={<Calendar size={20} />} text="Reservas" expanded={sidebarOpen} />
         <NavItem icon={<Users size={20} />} text="Clientes" expanded={sidebarOpen} />
         <NavItem icon={<BarChart4 size={20} />} text="report" expanded={sidebarOpen} />
         <NavItem icon={<Settings size={20} />} text="Configuración" expanded={sidebarOpen} />
       </div>
     </div>
     <div className="mb-4">
       <NavItem icon={<LogOut size={20} />} text="Cerrar Sesión" expanded={sidebarOpen} />
     </div>
   </div>

 
 </section>
  )
}

export default Sidebar
