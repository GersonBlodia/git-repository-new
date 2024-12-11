export const formatCurrency = (saldo: number): string => {
    const formatter = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    });
    return formatter.format(saldo);
  };
  

  export const isStatus=(valor: boolean)=>{
    const isValor=valor? "Pagado" : "Pendiente";
    return isValor; 
}