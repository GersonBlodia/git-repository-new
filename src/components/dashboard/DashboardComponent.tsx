 
import React, {   ReactNode } from "react";
import { 
 
  Calendar, 
  Users, 
  
  Bell, 
  DollarSign,
   
  ShoppingCart,
  Clock 
} from "lucide-react";
 
// Tipos para los componentes
interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
}

interface RecentOrderProps {
  table: string;
  time: string;
  items: number;
  status: "Completada" | "En proceso" | "Pendiente" | "Cancelada";
  total: string;
}

interface CategorySalesProps {
  category: string;
  percentage: number;
  amount: string;
}



 
// Componente para las tarjetas de estadísticas
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center">
      <div className={`p-3 rounded-full ${color} mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

// Componente para órdenes recientes
const RecentOrder: React.FC<RecentOrderProps> = ({ table, time, items, status, total }) => {
  const getStatusColor = (): string => {
    switch(status) {
      case "Completada": return "bg-green-100 text-green-800";
      case "En proceso": return "bg-blue-100 text-blue-800";
      case "Pendiente": return "bg-yellow-100 text-yellow-800";
      case "Cancelada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center mr-3">
          <ShoppingCart size={18} />
        </div>
        <div>
          <p className="font-medium">Mesa {table}</p>
          <p className="text-gray-500 text-sm flex items-center">
            <Clock size={14} className="mr-1" /> {time}
          </p>
        </div>
      </div>
      <div>
        <p className="font-medium text-right">${total}</p>
        <p className="text-sm">{items} items</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {status}
      </div>
    </div>
  );
};

// Componente para ventas por categoría
const CategorySales: React.FC<CategorySalesProps> = ({ category, percentage, amount }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="font-medium">{category}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${amount}</p>
        <p className="text-xs text-gray-500">{percentage}%</p>
      </div>
    </div>
  );
};


 
// Componente principal del Dashboard
export const PageDashboardDesing: React.FC = () => {

  // Datos de ejemplo
  const stats: StatCardProps[] = [
    { title: "Ventas Hoy", value: "$1,452", icon: <DollarSign size={20} color="white" />, color: "bg-blue-500" },
    { title: "Órdenes", value: "32", icon: <ShoppingCart size={20} color="white" />, color: "bg-orange-500" },
    { title: "Clientes", value: "128", icon: <Users size={20} color="white" />, color: "bg-green-500" },
    { title: "Reservas", value: "15", icon: <Calendar size={20} color="white" />, color: "bg-purple-500" },
  ];

  const recentOrders: RecentOrderProps[] = [
    { table: "12", time: "12:30 PM", items: 4, status: "Completada", total: "86.50" },
    { table: "8", time: "12:45 PM", items: 2, status: "En proceso", total: "42.25" },
    { table: "5", time: "1:00 PM", items: 3, status: "Pendiente", total: "58.75" },
    { table: "3", time: "1:15 PM", items: 1, status: "Cancelada", total: "24.00" },
  ];

  const categorySales: CategorySalesProps[] = [
    { category: "Platos principales", percentage: 42, amount: "605.84" },
    { category: "Bebidas", percentage: 28, amount: "406.56" },
    { category: "Postres", percentage: 18, amount: "261.36" },
    { category: "Entradas", percentage: 12, amount: "174.24" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
     
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Panel de Control</h1>
            <div className="flex items-center">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="ml-4 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Admin</p>
                  <p className="text-xs text-gray-500">Gerente</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Órdenes Recientes</h2>
                <button className="text-blue-500 text-sm font-medium">Ver todas</button>
              </div>
              <div>
                {recentOrders.map((order, index) => (
                  <RecentOrder 
                    key={index}
                    table={order.table}
                    time={order.time}
                    items={order.items}
                    status={order.status}
                    total={order.total}
                  />
                ))}
              </div>
            </div>

            {/* Category Sales */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Ventas por Categoría</h2>
                <button className="text-blue-500 text-sm font-medium">Este Mes</button>
              </div>
              <div>
                {categorySales.map((category, index) => (
                  <CategorySales 
                    key={index}
                    category={category.category}
                    percentage={category.percentage}
                    amount={category.amount}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

 