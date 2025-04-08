
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart,
  Wallet,
  ClipboardList,
  TrendingUp,
  History,
  Truck,
  User,
  Plus,
  Package,
  Store
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon: Icon, label, active }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-earth-pale-green text-earth-dark-green"
          : "text-earth-dark-green/80 hover:bg-earth-pale-green/50 hover:text-earth-dark-green"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export function BuyerNavigation() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => location.pathname === path;

  // Updated navigation structure with sections
  const navGroups = [
    {
      id: "marketplace",
      label: t("buyer.marketplace.title"),
      items: [
        { to: "/buyer/marketplace", icon: Store, label: t("buyer.marketplace.browse") },
        { to: "/buyer/transactions", icon: ShoppingCart, label: t("buyer.transactions.title") },
      ]
    },
    {
      id: "orderbook",
      label: t("buyer.orderbook.title"),
      items: [
        { to: "/buyer/order-book", icon: ClipboardList, label: t("buyer.orderbook.browse") },
        { to: "/buyer/order-book/create", icon: Plus, label: t("buyer.orderbook.create") },
        { to: "/buyer/order-book/review", icon: ClipboardList, label: t("buyer.orderbook.review") },
      ]
    },
    {
      id: "finance",
      label: t("buyer.finance.title"),
      items: [
        { to: "/buyer/balance", icon: Wallet, label: t("buyer.finance.balance") },
        { to: "/buyer/history", icon: History, label: t("buyer.finance.history") },
      ]
    },
    {
      id: "market",
      label: t("buyer.market.title"),
      items: [
        { to: "/buyer/prices", icon: TrendingUp, label: t("buyer.market.prices") },
      ]
    },
    {
      id: "shipping",
      label: t("buyer.shipping.title"),
      items: [
        { to: "/buyer/shipping", icon: Truck, label: t("buyer.shipping.manage") },
      ]
    },
    {
      id: "account",
      label: t("buyer.account.title"),
      items: [
        { to: "/buyer/profile", icon: User, label: t("buyer.account.profile") },
      ]
    }
  ];

  return (
    <div className="px-2 py-4">
      <div className="space-y-6">
        {navGroups.map((group) => (
          <div key={group.id} className="space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-earth-dark-green/70 font-semibold px-4">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={isActive(item.to)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
