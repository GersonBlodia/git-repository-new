import Sidebar from "@/components/dashboard/NavItem"

interface Props{
  children:React.ReactNode
}
export default function DashboardLayout({ children}:Props) {
  return (
    <div className="flex">
    <Sidebar /> {/* Este estará en el lado izquierdo */}
    <main className="flex-1 p-4"> {/* Este se ajustará al lado derecho */}
      {children}
    </main>
  </div>

  );
}
