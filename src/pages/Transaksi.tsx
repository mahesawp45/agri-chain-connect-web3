
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, formatCurrency } from "@/lib/utils";
import { transactions } from "@/lib/data/mockData"; // Import transactions from mockData

const TransaksiPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on active tab
  const filteredTransactions = transactions.filter(transaction => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return ["menunggu_konfirmasi", "dikonfirmasi", "negosiasi"].includes(transaction.status);
    if (activeTab === "processed") return ["dibayar", "persiapan_pengiriman", "sedang_dikirim"].includes(transaction.status);
    if (activeTab === "completed") return ["sudah_dikirim", "diterima", "selesai"].includes(transaction.status);
    if (activeTab === "cancelled") return transaction.status === "dibatalkan";
    return true;
  });

  // Get status badge style based on status
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      menunggu_konfirmasi: {
        label: t("status.pending"),
        className: "bg-earth-wheat text-earth-brown",
      },
      dikonfirmasi: {
        label: t("status.confirmed"),
        className: "bg-earth-light-brown text-earth-brown",
      },
      negosiasi: {
        label: t("status.negotiating"),
        className: "bg-earth-clay text-earth-brown",
      },
      dibayar: {
        label: t("status.paid"),
        className: "bg-earth-light-green text-earth-dark-green",
      },
      persiapan_pengiriman: {
        label: t("status.processing"),
        className: "bg-earth-light-green/70 text-earth-dark-green",
      },
      sedang_dikirim: {
        label: t("status.shipping"),
        className: "bg-earth-medium-green/30 text-earth-dark-green",
      },
      sudah_dikirim: {
        label: t("status.shipped"),
        className: "bg-earth-medium-green/60 text-earth-dark-green",
      },
      diterima: {
        label: t("status.received"),
        className: "bg-earth-medium-green/90 text-white",
      },
      selesai: {
        label: t("status.completed"),
        className: "bg-earth-dark-green text-white",
      },
      dibatalkan: {
        label: t("status.canceled"),
        className: "bg-red-100 text-red-800",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      className: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={`${statusInfo.className} px-2 py-1 rounded-full text-xs`}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-earth-dark-green">{t("transactions.title")}</h1>
          <p className="text-earth-medium-green">{t("transactions.subtitle")}</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-earth-dark-green hover:bg-earth-medium-green">
          <Plus className="mr-2 h-4 w-4" />
          {t("transactions.new")}
        </Button>
      </div>

      <Card className="mb-6 overflow-hidden border-2 border-earth-light-green/70 shadow-md">
        <CardHeader className="pb-3 bg-gradient-to-r from-earth-dark-green to-earth-medium-green">
          <CardTitle className="text-white">{t("transactions.filter")}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="all">{t("transactions.all")}</TabsTrigger>
              <TabsTrigger value="pending">{t("transactions.pending")}</TabsTrigger>
              <TabsTrigger value="processed">{t("transactions.processed")}</TabsTrigger>
              <TabsTrigger value="completed">{t("transactions.completed")}</TabsTrigger>
              <TabsTrigger value="cancelled">{t("transactions.canceled")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {filteredTransactions.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("transactions.commodity")}</TableHead>
                  <TableHead>{t("transactions.quantity")}</TableHead>
                  <TableHead>{t("transactions.buyer")}</TableHead>
                  <TableHead>{t("transactions.status")}</TableHead>
                  <TableHead>{t("transactions.date")}</TableHead>
                  <TableHead className="text-right">{t("transactions.total")}</TableHead>
                  <TableHead className="text-right">{t("action.details")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.commodityName}
                      <div className="text-xs text-earth-medium-green mt-1">
                        {transaction.type === "order_book" ? "Order Book" : "Regular"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.quantity.toLocaleString()} {transaction.unit}
                    </TableCell>
                    <TableCell>{transaction.buyerName}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>{formatDate(new Date(transaction.createdAt))}</TableCell>
                    <TableCell className="text-right">
                      {transaction.totalPrice
                        ? formatCurrency(transaction.totalPrice)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to={`/transaction/${transaction.id}`}
                        className="inline-flex items-center text-earth-dark-green hover:text-earth-medium-green"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {t("action.details")}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-8 text-center">
            <p className="text-earth-medium-green mb-4">{t("transactions.empty")}</p>
            <Button className="bg-earth-dark-green hover:bg-earth-medium-green">
              <Plus className="mr-2 h-4 w-4" />
              {t("transactions.new")}
            </Button>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
};

export default TransaksiPage;
