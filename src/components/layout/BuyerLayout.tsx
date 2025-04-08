
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/Sidebar";
import { BuyerNavigation } from "@/components/navigation/BuyerNavigation";
import { TopNav } from "@/components/layout/TopNav";

export function BuyerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-earth-pale-green/30">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <TopNav />
        
        <main className="container mx-auto p-4 md:p-6 pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
