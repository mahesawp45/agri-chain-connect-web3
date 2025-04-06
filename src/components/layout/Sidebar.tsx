
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Home, 
  Package, 
  Wallet, 
  ShoppingCart, 
  ClipboardList, 
  TrendingUp, 
  Truck,
  ChevronRight,
  ChevronLeft,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const links = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Komoditas", href: "/komoditas", icon: Package },
  { name: "Saldo", href: "/saldo", icon: Wallet },
  { name: "Transaksi", href: "/transaksi", icon: ShoppingCart },
  { name: "Order Book", href: "/order-book", icon: ClipboardList },
  { name: "Harga Komoditas", href: "/harga", icon: TrendingUp },
  { name: "Pengiriman", href: "/pengiriman", icon: Truck },
  { name: "Statistik", href: "/statistik", icon: BarChart3 },
];

export function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", checkIfMobile);
    checkIfMobile();

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [setOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 flex flex-col",
          open ? "w-64" : "w-20",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0 w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {open && (
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-agriGreen-500 flex items-center justify-center">
                <Package className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">AgriChain</h1>
            </Link>
          )}
          {!open && !isMobile && (
            <div className="h-8 w-8 mx-auto rounded-full bg-agriGreen-500 flex items-center justify-center">
              <Package className="h-4 w-4 text-white" />
            </div>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setOpen(!open)}
            >
              {open ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "sidebar-link",
                  location.pathname === link.href && "active"
                )}
              >
                <link.icon className="h-5 w-5" />
                {open && <span>{link.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          {open ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>PF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">Pak Tani</span>
                    <span className="text-gray-500 text-xs">Petani</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>PF</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>
    </>
  );
}
