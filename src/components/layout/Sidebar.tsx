
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
  User,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Leaf,
  Wheat,
  Sprout
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
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Komoditas", href: "/komoditas", icon: Wheat },
  { name: "Saldo", href: "/saldo", icon: Wallet },
  { name: "Transaksi", href: "/transaksi", icon: ShoppingCart },
  { name: "Order Book", href: "/order-book", icon: ClipboardList },
  { name: "Harga Komoditas", href: "/harga", icon: TrendingUp },
  { name: "Pengiriman", href: "/pengiriman", icon: Truck },
  { name: "Profil", href: "/profile", icon: User },
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
          "fixed top-0 left-0 h-full bg-gradient-to-b from-tani-green-dark/95 to-tani-green-dark border-r border-tani-green-light/20 z-50 transition-all duration-300 flex flex-col",
          open ? "w-64" : "w-20",
          isMobile && !open && "-translate-x-full",
          isMobile && open && "translate-x-0 w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-tani-green-light/20">
          {open && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-md overflow-hidden flex items-center justify-center bg-white/90">
                <img 
                  src="/lovable-uploads/f7fb75ca-ee07-4d12-a8ab-4e5152e13679.png" 
                  alt="TaniTrack Logo" 
                  className="h-full w-full object-contain"
                />
              </div>
              <h1 className="text-lg font-bold text-white">TaniTrack</h1>
            </Link>
          )}
          {!open && !isMobile && (
            <div className="h-10 w-10 mx-auto rounded-md overflow-hidden flex items-center justify-center bg-white/90">
              <img 
                src="/lovable-uploads/f7fb75ca-ee07-4d12-a8ab-4e5152e13679.png" 
                alt="TaniTrack Logo" 
                className="h-full w-full object-contain"
              />
            </div>
          )}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-white hover:bg-tani-green-light/20"
              onClick={() => setOpen(!open)}
            >
              {open ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.href || 
                (link.href === "/dashboard" && location.pathname === "/");
              
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "sidebar-link",
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-tani-green-light/30 text-white" 
                      : "text-tani-green-light/80 hover:bg-tani-green-light/10 hover:text-white"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {open && <span>{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-tani-green-light/20">
          {open ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2 px-2 text-white hover:bg-tani-green-light/20">
                  <Avatar className="h-8 w-8 border border-tani-green-light/30">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-tani-green-light/30 text-white">PT</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">Pak Tani</span>
                    <span className="text-tani-green-light/80 text-xs">Petani</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-tani-green-light/20">
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center w-full">
                    <User className="h-4 w-4 mr-2" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center w-full">
                    <Sprout className="h-4 w-4 mr-2" />
                    <span>Pengaturan</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/login" className="flex items-center w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Keluar</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full mx-auto flex justify-center items-center hover:bg-tani-green-light/20">
                  <Avatar className="h-8 w-8 border border-tani-green-light/30">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-tani-green-light/30 text-white">PT</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-tani-green-light/20">
                <DropdownMenuItem>
                  <Link to="/profile" className="flex items-center w-full">
                    <User className="h-4 w-4 mr-2" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center w-full">
                    <Sprout className="h-4 w-4 mr-2" />
                    <span>Pengaturan</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/login" className="flex items-center w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Keluar</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>
    </>
  );
}
