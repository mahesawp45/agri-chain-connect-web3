
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

interface TopNavProps {
  onMenuButtonClick: () => void;
}

export function TopNav({ onMenuButtonClick }: TopNavProps) {
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 z-30">
      <div className="flex h-16 items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuButtonClick}
          className="md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex-1 md:ml-16">
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder={t("action.search") + "..."}
              className="w-full bg-gray-50 pl-8 focus-visible:ring-agriGreen-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-agriWarn-500">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>{t("nav.notifications")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">{t("language") === "id" ? "Pesanan Baru Diterima" : "New Order Received"}</p>
                  <p className="text-sm text-gray-500">
                    {t("language") === "id" ? "PT Agrimax memesan 500kg beras." : "PT Agrimax ordered 500kg of rice."}
                  </p>
                  <p className="text-xs text-gray-400">{t("language") === "id" ? "2 menit yang lalu" : "2 minutes ago"}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">{t("language") === "id" ? "Pembayaran Diterima" : "Payment Received"}</p>
                  <p className="text-sm text-gray-500">
                    {t("language") === "id" ? "Pembayaran sebesar Rp. 5.000.000 telah masuk." : "Payment of Rp. 5,000,000 has been received."}
                  </p>
                  <p className="text-xs text-gray-400">{t("language") === "id" ? "1 jam yang lalu" : "1 hour ago"}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-sm">{t("language") === "id" ? "Harga Beras Naik" : "Rice Price Increased"}</p>
                  <p className="text-sm text-gray-500">
                    {t("language") === "id" ? "Harga beras naik 5% dari minggu lalu." : "Rice price increased by 5% from last week."}
                  </p>
                  <p className="text-xs text-gray-400">{t("language") === "id" ? "1 hari yang lalu" : "1 day ago"}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center">
                <span className="text-agriGreen-600 font-medium text-sm">
                  {t("language") === "id" ? "Lihat Semua Notifikasi" : "View All Notifications"}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
