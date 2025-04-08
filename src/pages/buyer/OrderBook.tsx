
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Plus, Search, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/utils";

// Mock order book data
const orderBooks = [
  {
    id: "OB-2023-001",
    commodityType: "Padi",
    quantity: 10000,
    unit: "kg",
    requestedGrade: "Premium",
    requestedDeliveryDate: new Date("2023-12-30"),
    offerExpiryDate: new Date("2023-12-15"),
    status: "open",
    createdAt: new Date("2023-11-25"),
  },
  {
    id: "OB-2023-002",
    commodityType: "Jagung",
    quantity: 5000,
    unit: "kg",
    requestedGrade: "A",
    requestedDeliveryDate: new Date("2024-01-15"),
    offerExpiryDate: new Date("2023-12-20"),
    status: "accepted",
    createdAt: new Date("2023-11-28"),
  },
  {
    id: "OB-2023-003",
    commodityType: "Kedelai",
    quantity: 3000,
    unit: "kg",
    requestedGrade: "B",
    requestedDeliveryDate: new Date("2024-01-05"),
    offerExpiryDate: new Date("2023-12-10"),
    status: "completed",
    createdAt: new Date("2023-11-15"),
  },
];

export default function BuyerOrderBook() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrderBooks = orderBooks.filter(orderBook => 
    orderBook.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orderBook.commodityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get status badge style based on status
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      open: {
        label: t("status.open"),
        className: "bg-blue-100 text-blue-800",
      },
      accepted: {
        label: t("status.accepted"),
        className: "bg-amber-100 text-amber-800",
      },
      completed: {
        label: t("status.completed"),
        className: "bg-green-100 text-green-800",
      },
      expired: {
        label: t("status.expired"),
        className: "bg-gray-100 text-gray-800",
      },
      cancelled: {
        label: t("status.cancelled"),
        className: "bg-red-100 text-red-800",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      className: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={statusInfo.className}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-earth-dark-green">{t("buyer.orderbook.title")}</h1>
          <p className="text-earth-dark-green/70">{t("buyer.orderbook.description")}</p>
        </div>
        <Button onClick={() => navigate("/buyer/order-book/create")} className="gap-2">
          <Plus className="h-4 w-4" />
          {t("buyer.orderbook.create")}
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              {t("buyer.orderbook.list")}
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-earth-dark-green/50" />
              <Input
                placeholder={t("buyer.orderbook.search")}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("buyer.orderbook.id")}</TableHead>
                <TableHead>{t("buyer.orderbook.commodityType")}</TableHead>
                <TableHead>{t("buyer.orderbook.quantity")}</TableHead>
                <TableHead>{t("buyer.orderbook.grade")}</TableHead>
                <TableHead>{t("buyer.orderbook.deliveryDate")}</TableHead>
                <TableHead>{t("buyer.orderbook.status")}</TableHead>
                <TableHead className="text-right">{t("action.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrderBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-earth-dark-green/70">
                      <ClipboardList className="h-10 w-10 mb-2" />
                      <p>{t("buyer.orderbook.noData")}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrderBooks.map((orderBook) => (
                  <TableRow key={orderBook.id}>
                    <TableCell className="font-medium">{orderBook.id}</TableCell>
                    <TableCell>{orderBook.commodityType}</TableCell>
                    <TableCell>
                      {orderBook.quantity.toLocaleString()} {orderBook.unit}
                    </TableCell>
                    <TableCell>{orderBook.requestedGrade}</TableCell>
                    <TableCell>{formatDate(orderBook.requestedDeliveryDate)}</TableCell>
                    <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => navigate(`/buyer/order-book/${orderBook.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
