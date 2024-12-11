export type MenuItem = {
  id: number;
  image: string;
  title: string;
  price: string;
  stock: number;
  categoria: string;
  description: string;
  ingredients: string[];
};

export const menuItems: MenuItem[] = [
  {
    id: 1,
    image: "/product/ceviche.jpg",
    title: "Ceviche",
    price: "15.00",
    stock: 20,
    categoria: "Mariscos",
    description: "Un plato fresco de pescado marinado con limón y ají.",
    ingredients: ["Pescado fresco", "Cebolla", "Limón", "Ají", "Culantro"],
  },
  {
    id: 2,
    image: "/product/lomo-saltado.jpg",
    title: "Lomo Saltado",
    price: "18.00",
    stock: 15,
    categoria: "Carnes",
    description: "Carne salteada con vegetales y papas fritas.",
    ingredients: ["Carne de res", "Cebolla", "Tomate", "Salsa de soya", "Papas"],
  },
  {
    id: 3,
    image: "/product/aji-de-gallina.jpg",
    title: "Ají de Gallina",
    price: "12.50",
    stock: 10,
    categoria: "Platos Tradicionales",
    description: "Crema de ají amarillo con pollo deshilachado.",
    ingredients: ["Pollo", "Ají amarillo", "Leche evaporada", "Pan", "Queso"],
  },
  {
    id: 4,
    image: "/product/sopa-seca.jpg",
    title: "Carapulcra",
    price: "10.00",
    stock: 25,
    categoria: "Entradas",
    description: "Brochetas de corazón de res marinadas.",
    ingredients: ["Corazón de res", "Ají panca", "Vinagre", "Ajo", "Comino"],
  },
];
