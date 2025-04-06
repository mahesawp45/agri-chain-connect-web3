
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Komoditas from "./pages/Komoditas";
import Saldo from "./pages/Saldo";
import Transaksi from "./pages/Transaksi";
import OrderBook from "./pages/OrderBook";
import Harga from "./pages/Harga";
import Pengiriman from "./pages/Pengiriman";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/komoditas" element={<Komoditas />} />
          <Route path="/saldo" element={<Saldo />} />
          <Route path="/transaksi" element={<Transaksi />} />
          <Route path="/order-book" element={<OrderBook />} />
          <Route path="/harga" element={<Harga />} />
          <Route path="/pengiriman" element={<Pengiriman />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
