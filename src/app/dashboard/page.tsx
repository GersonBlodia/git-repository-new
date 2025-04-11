"use client"
import { redirect } from "next/navigation";
import Cookies from 'js-cookie';
import { PageDashboardDesing } from "@/components/dashboard/DashboardComponent";
import { useEffect } from "react";
 const PageDashboard = () => {
 
  
    useEffect(() => {
      const token = Cookies.get('authToken');
      if (!token) {
        redirect('auth//login');
      }
    }, []);
 // Se ejecuta solo cuando el componente está montado

  return (
    <div>
      {/* Aquí puedes incluir el contenido del Dashboard o lo que desees */}
       <PageDashboardDesing/>
    </div>
  );
}

export default PageDashboard;
