import { OrderComponentsComponent } from "@/components/main/OrderComponent";

 

const OrdersPage = async () => {
  // Pedido ficticio para pruebas
  

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Historial de pedidos</h1>

        <OrderComponentsComponent/>
    </main>
  );
};

export default OrdersPage;