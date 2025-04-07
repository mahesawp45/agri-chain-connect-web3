
import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  Truck, 
  Wallet,
  Leaf,
  Sun,
  CloudRain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { transactions, commodities, commodityPrices, currentUser } from "@/lib/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "year">("week");
  const { t, language } = useLanguage();
  
  // Get completed transactions
  const completedTransactions = transactions.filter(
    (transaction) => transaction.status === "selesai"
  );
  
  // Calculate total sales
  const totalSales = completedTransactions.reduce(
    (sum, transaction) => sum + (transaction.totalPrice || 0),
    0
  );
  
  // Get pending transactions
  const pendingTransactions = transactions.filter(
    (transaction) => transaction.status !== "selesai" && transaction.status !== "dibatalkan"
  );
  
  // Calculate total commodities
  const totalCommodities = commodities.reduce(
    (sum, commodity) => sum + commodity.quantity,
    0
  );
  
  // Get trending commodities
  const trendingCommodities = [...commodityPrices]
    .sort((a, b) => b.predictedChange - a.predictedChange)
    .slice(0, 3);

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{t("dashboard.title")}</h1>
          <Tabs
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as any)}
            className="w-auto"
          >
            <TabsList className="grid grid-cols-4 w-[300px]">
              <TabsTrigger value="day">{t("time.today")}</TabsTrigger>
              <TabsTrigger value="week">{t("time.thisWeek")}</TabsTrigger>
              <TabsTrigger value="month">{t("time.thisMonth")}</TabsTrigger>
              <TabsTrigger value="year">{t("time.thisYear")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <div className="absolute top-0 right-0 p-3">
              <ShoppingCart className="h-6 w-6 text-green-600 opacity-30" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">{t("dashboard.summary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{formatCurrency(totalSales)}</div>
              <p className="text-xs text-green-600 mt-1">
                {completedTransactions.length} {t("transactions.completed").toLowerCase()}
              </p>
              <div className="h-1 w-full bg-green-200 mt-3 rounded-full">
                <div className="h-1 bg-green-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="absolute top-0 right-0 p-3">
              <Leaf className="h-6 w-6 text-blue-600 opacity-30" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">{t("commodities.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{totalCommodities} kg</div>
              <p className="text-xs text-blue-600 mt-1">
                {commodities.length} {t("commodities.type").toLowerCase()}
              </p>
              <div className="h-1 w-full bg-blue-200 mt-3 rounded-full">
                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-amber-50 to-amber-100">
            <div className="absolute top-0 right-0 p-3">
              <Sun className="h-6 w-6 text-amber-600 opacity-30" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-800">{t("transactions.pending")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700">{pendingTransactions.length}</div>
              <p className="text-xs text-amber-600 mt-1">
                {pendingTransactions.filter(t => t.status === 'negosiasi').length} {language === 'id' ? 'dalam negosiasi' : 'in negotiation'}
              </p>
              <div className="h-1 w-full bg-amber-200 mt-3 rounded-full">
                <div className="h-1 bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="absolute top-0 right-0 p-3">
              <Wallet className="h-6 w-6 text-purple-600 opacity-30" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">{t("balance.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{formatCurrency(currentUser.balance)}</div>
              <p className="text-xs text-purple-600 mt-1">
                5 SOL (≈ {formatCurrency(currentUser.balance)})
              </p>
              <div className="h-1 w-full bg-purple-200 mt-3 rounded-full">
                <div className="h-1 bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-none shadow-md bg-white">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-t-lg border-b">
              <CardTitle className="text-teal-800 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-teal-600" />
                {t("dashboard.recentTransactions")}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b bg-gray-50">
                    <tr className="border-b transition-colors">
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                        {t("transactions.commodity")}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                        {t("transactions.buyer")}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                        {t("transactions.date")}
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                        {t("transactions.status")}
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">
                        {t("transactions.total")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.slice(0, 5).map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-gray-50"
                      >
                        <td className="p-4 align-middle">
                          {transaction.commodityName}
                        </td>
                        <td className="p-4 align-middle">{transaction.buyerName}</td>
                        <td className="p-4 align-middle">
                          {formatDate(transaction.createdAt)}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                transaction.status === "selesai"
                                  ? "bg-green-500"
                                  : transaction.status === "dibatalkan"
                                  ? "bg-red-500"
                                  : "bg-yellow-500"
                              }`}
                            />
                            <span className="capitalize">
                              {language === 'id' ? transaction.status.replace("_", " ") : 
                                transaction.status === "selesai" ? "completed" :
                                transaction.status === "dibatalkan" ? "cancelled" :
                                transaction.status === "negosiasi" ? "negotiation" :
                                transaction.status === "proses" ? "processing" : transaction.status
                              }
                            </span>
                          </div>
                        </td>
                        <td className="p-4 align-middle text-right">
                          {formatCurrency(transaction.totalPrice || 0)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3 border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-lg border-b">
              <CardTitle className="text-indigo-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                {t("prices.trends")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {trendingCommodities.map((commodity) => (
                  <div key={commodity.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {commodity.name} ({commodity.grade})
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {commodity.region}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(commodity.price)}/{commodity.unit}
                    </div>
                    <div
                      className={`ml-4 flex items-center ${
                        commodity.predictedChange >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {commodity.predictedChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>{Math.abs(commodity.predictedChange)}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-3 border-t">
                <a 
                  href="/harga"
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <span>{language === 'id' ? 'Lihat semua harga' : 'View all prices'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Card className="border-none shadow-md bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg border-b">
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                {t("dashboard.commodityStatus")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {commodities.map((commodity) => (
                  <div key={commodity.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600 mr-3">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {commodity.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {commodity.type} - Grade {commodity.grade}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {commodity.quantity} {commodity.unit}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-3 border-t">
                <a 
                  href="/komoditas"
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  <span>{language === 'id' ? 'Kelola komoditas' : 'Manage commodities'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-t-lg border-b">
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-amber-600" />
                {t("dashboard.pendingOrders")}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {pendingTransactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600 mr-3">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {transaction.commodityName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.buyerName}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {transaction.quantity} {transaction.unit}
                    </div>
                    <div className="ml-4 text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      {language === 'id' 
                        ? transaction.status.replace('_', ' ') 
                        : transaction.status === 'negosiasi' 
                          ? 'negotiation' 
                          : transaction.status === 'proses' 
                            ? 'processing' 
                            : transaction.status
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-3 border-t">
                <a 
                  href="/transaksi"
                  className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700"
                >
                  <span>{language === 'id' ? 'Lihat semua transaksi' : 'View all transactions'}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
