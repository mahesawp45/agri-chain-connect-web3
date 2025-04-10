
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Plus } from "lucide-react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, formatCurrency } from "@/lib/utils";
import { transactions } from "@/lib/data/mockData"; // Import transactions from mockData

// Mock data for the demo
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
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="all">{t("transactions.all")}</TabsTrigger>
              <TabsTrigger value="pending">{t("transactions.pending")}</TabsTrigger>
              <TabsTrigger value="processed">{t("transactions.processed")}</TabsTrigger>
              <TabsTrigger value="completed">{t("transactions.completed")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="overflow-hidden hover:border-earth-medium-green transition-colors duration-200">
              <CardContent className="p-0">
                <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="font-medium text-earth-dark-green">{transaction.commodityName}</span>
                        <span className="mx-2 text-earth-medium-green">•</span>
                        <span className="text-sm text-earth-medium-green">{transaction.type === "order_book" ? "Order Book" : "Regular"}</span>
                      </div>
                      <div className="text-sm text-earth-medium-green mt-1">
                        {transaction.quantity.toLocaleString()} {transaction.unit} - {formatDate(new Date(transaction.createdAt))}
                      </div>
                      <div className="mt-2">
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm text-earth-medium-green">Buyer</div>
                    <div className="font-medium text-earth-dark-green">{transaction.buyerName}</div>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm text-earth-medium-green">Amount</div>
                    <div className="font-medium text-earth-dark-green">
                      {transaction.totalPrice
                        ? formatCurrency(transaction.totalPrice)
                        : "-"}
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    {/* Use Link component with to prop instead of <a> for navigation */}
                    <Link
                      to={`/transaction/${transaction.id}`}
                      className="flex items-center text-earth-dark-green hover:text-earth-medium-green"
                    >
                      <span className="mr-1">{t("action.details")}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
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
      </div>
    </MainLayout>
  );
};

export default TransaksiPage;
