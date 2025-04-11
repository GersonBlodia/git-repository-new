"use client"
import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  ChartOptions,
  ChartData,
   
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { ChevronDown, FileText } from 'lucide-react';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Tipos para los filtros y datos
type ChartType = 'line' | 'bar' | 'pie';
type CategoryFilter = 'ventas-por-mes' | 'productos-mas-vendidos' | 'ingresos-por-categoria' | 'comparacion-anual';

// Tipado correcto para los datos del gráfico
interface DatasetProps {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
}

// Tipado para los datos del gráfico según Chart.js v4
interface ChartDataProps {
  labels: string[];
  datasets: DatasetProps[];
}

// Tipado para las tarjetas de estadísticas
interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  description: string;
}

// Funciones para generar datos ficticios
const generateMonthlySalesData = (): ChartDataProps => {
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  
  return {
    labels: months,
    datasets: [
      {
        label: `Ventas ${currentYear}`,
        data: [12500, 14200, 16800, 15300, 17900, 19500, 21200, 22100, 20500, 19800, 21500, 23500],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      },
      {
        label: `Ventas ${lastYear}`,
        data: [10800, 12500, 14100, 13200, 15600, 17300, 18400, 19200, 18100, 17400, 18900, 20100],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false
      }
    ]
  };
};

const generateTopProductsData = (): ChartDataProps => {
  return {
    labels: ['Filete Mignon', 'Pasta Carbonara', 'Risotto de Mariscos', 'Salmón a la Parrilla', 'Hamburguesa Gourmet', 'Ensalada César', 'Pizza Artesanal', 'Paella Valenciana'],
    datasets: [{
      label: 'Unidades Vendidas',
      data: [427, 389, 342, 325, 301, 286, 254, 218],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
        'rgba(199, 199, 199, 0.7)',
        'rgba(83, 102, 255, 0.7)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
      ],
      borderWidth: 1
    }]
  };
};

const generateCategoryIncomeData = (): ChartDataProps => {
  return {
    labels: ['Platos Principales', 'Entradas', 'Postres', 'Bebidas', 'Vinos', 'Cócteles'],
    datasets: [{
      label: 'Ingresos por Categoría',
      data: [34500, 12400, 9800, 14200, 18600, 7500],
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };
};

const generateYearlyComparisonData = (): ChartDataProps => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear];
  
  return {
    labels: years.map(year => year.toString()),
    datasets: [{
      label: 'Ventas Anuales',
      data: [156000, 182000, 210000, 235000, 267000],
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2
    }]
  };
};

// Componente principal de Reportes
const ReportsComponent: React.FC = () => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ventas-por-mes');
  const [chartData, setChartData] = useState<ChartDataProps | null>(null);
  const [isChartTypeDropdownOpen, setIsChartTypeDropdownOpen] = useState<boolean>(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);

  // Obtener los datos según el filtro seleccionado
  useEffect(() => {
    switch (categoryFilter) {
      case 'ventas-por-mes':
        setChartData(generateMonthlySalesData());
        break;
      case 'productos-mas-vendidos':
        setChartData(generateTopProductsData());
        break;
      case 'ingresos-por-categoria':
        setChartData(generateCategoryIncomeData());
        break;
      case 'comparacion-anual':
        setChartData(generateYearlyComparisonData());
        break;
      default:
        setChartData(generateMonthlySalesData());
    }
  }, [categoryFilter]);

  // Validar si ciertos tipos de gráficos son apropiados para ciertos datos
  useEffect(() => {
    // Si cambiamos a un filtro que no sea adecuado para gráficos de tipo pie, cambiamos a barras
    if (chartType === 'pie' && categoryFilter === 'ventas-por-mes') {
      setChartType('line');
    }
    // Para comparación anual, el gráfico de barras es más adecuado
    if (categoryFilter === 'comparacion-anual' && chartType === 'pie') {
      setChartType('bar');
    }
  }, [categoryFilter, chartType]);

  // Función para obtener el título según la categoría
  const getTitleByCategory = (category: CategoryFilter): string => {
    switch(category) {
      case 'ventas-por-mes': return 'Ventas Mensuales';
      case 'productos-mas-vendidos': return 'Productos Más Vendidos';
      case 'ingresos-por-categoria': return 'Ingresos por Categoría';
      case 'comparacion-anual': return 'Comparación de Ventas Anuales';
      default: return 'Reporte de Ventas';
    }
  };

  // Opciones del gráfico dependiendo del tipo
  const lineAndBarOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: getTitleByCategory(categoryFilter),
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: getTitleByCategory(categoryFilter),
        font: {
          size: 16
        }
      },
    }
  };

  // Renderizar el gráfico según el tipo seleccionado con tipado correcto
  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case 'line':
        return <Line 
          data={chartData as ChartData<'line'>} 
          options={lineAndBarOptions} 
        />;
      case 'bar':
        return <Bar 
          data={chartData as ChartData<'bar'>} 
          options={lineAndBarOptions} 
        />;
      case 'pie':
        return <Pie 
          data={chartData as ChartData<'pie'>} 
          options={pieOptions} 
        />;
      default:
        return <Line 
          data={chartData as ChartData<'line'>} 
          options={lineAndBarOptions} 
        />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileText className="mr-2" size={24} />
          Reportes y Estadísticas
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* Dropdown para tipos de gráfico */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full sm:w-48 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsChartTypeDropdownOpen(!isChartTypeDropdownOpen)}
              type="button"
            >
              <span>
                {chartType === 'line' ? 'Gráfico de Líneas' : 
                 chartType === 'bar' ? 'Gráfico de Barras' : 
                 'Gráfico Circular'}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {isChartTypeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setChartType('line');
                      setIsChartTypeDropdownOpen(false);
                    }}
                  >
                    Gráfico de Líneas
                  </li>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setChartType('bar');
                      setIsChartTypeDropdownOpen(false);
                    }}
                  >
                    Gráfico de Barras
                  </li>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setChartType('pie');
                      setIsChartTypeDropdownOpen(false);
                    }}
                  >
                    Gráfico Circular
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Dropdown para categorías */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-full sm:w-64 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              type="button"
            >
              <span>
                {categoryFilter === 'ventas-por-mes' ? 'Ventas por Mes' :
                 categoryFilter === 'productos-mas-vendidos' ? 'Productos Más Vendidos' :
                 categoryFilter === 'ingresos-por-categoria' ? 'Ingresos por Categoría' :
                 'Comparación Anual'}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {isCategoryDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <ul>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter('ventas-por-mes');
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    Ventas por Mes
                  </li>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter('productos-mas-vendidos');
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    Productos Más Vendidos
                  </li>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter('ingresos-por-categoria');
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    Ingresos por Categoría
                  </li>
                  <li 
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setCategoryFilter('comparacion-anual');
                      setIsCategoryDropdownOpen(false);
                    }}
                  >
                    Comparación Anual
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Panel de estadísticas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Ventas Totales" 
          value="$267,125" 
          trend={12.5} 
          description="vs. año anterior" 
        />
        <StatCard 
          title="Ticket Promedio" 
          value="$42.85" 
          trend={5.3} 
          description="vs. mes anterior" 
        />
        <StatCard 
          title="Clientes Mensuales" 
          value="6,240" 
          trend={8.7} 
          description="vs. mes anterior" 
        />
        <StatCard 
          title="Platos Vendidos" 
          value="15,382" 
          trend={9.2} 
          description="vs. mes anterior" 
        />
      </div>
      
      {/* Panel del gráfico */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="h-96">
          {renderChart()}
        </div>
      </div>
      
      {/* Información adicional o leyenda */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Información del Reporte</h3>
          <p className="text-sm text-gray-600">
            Este reporte muestra datos {
              categoryFilter === 'ventas-por-mes' ? 'de ventas mensuales para el año actual y el anterior.' :
              categoryFilter === 'productos-mas-vendidos' ? 'de los productos más vendidos en los últimos 30 días.' :
              categoryFilter === 'ingresos-por-categoria' ? 'de ingresos por categoría de producto en el último trimestre.' :
              'de ventas anuales para comparar el rendimiento a lo largo de los años.'
            }
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Acciones Disponibles</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
              type="button"
            >
              Exportar PDF
            </button>
            <button 
              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
              type="button"
            >
              Exportar Excel
            </button>
            <button 
              className="px-3 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
              type="button"
            >
              Programar Informe
            </button>
            <button 
              className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700"
              type="button"
            >
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de tarjeta de estadísticas
const StatCard: React.FC<StatCardProps> = ({ title, value, trend, description }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <div className="flex items-center mt-2">
        <span className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
        <span className="text-xs text-gray-500 ml-2">{description}</span>
      </div>
    </div>
  );
};

export default ReportsComponent;