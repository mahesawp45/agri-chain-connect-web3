
import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart, 
  Package, 
  Truck, 
  Wallet
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainLayout } from "@/components/layout/MainLayout";
import { transactions, commodities, commodityPrices, currentUser } from "@/lib/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<"day" | "week" | "month" | "year">("week");
  
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
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Tabs
            value={timeframe}
            onValueChange={(value) => setTimeframe(value as any)}
            className="w-auto"
          >
            <TabsList className="grid grid-cols-4 w-[300px]">
              <TabsTrigger value="day">Hari</TabsTrigger>
              <TabsTrigger value="week">Minggu</TabsTrigger>
              <TabsTrigger value="month">Bulan</TabsTrigger>
              <TabsTrigger value="year">Tahun</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Penjualan</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
              <p className="text-xs text-muted-foreground">
                {completedTransactions.length} transaksi selesai
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Komoditas</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCommodities} kg</div>
              <p className="text-xs text-muted-foreground">
                {commodities.length} jenis komoditas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaksi Tertunda</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTransactions.length}</div>
              <p className="text-xs text-muted-foreground">
                {pendingTransactions.filter(t => t.status === 'negosiasi').length} dalam negosiasi
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(currentUser.balance)}</div>
              <p className="text-xs text-muted-foreground">
                5 SOL (≈ {formatCurrency(currentUser.balance)})
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Transaksi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Komoditas
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Pembeli
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Tanggal
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Status
                      </th>
                      <th className="h-12 px-4 text-right align-middle font-medium">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {transactions.slice(0, 5).map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b transition-colors hover:bg-muted/50"
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
                              {transaction.status.replace("_", " ")}
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
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Tren Harga Komoditas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingCommodities.map((commodity) => (
                  <div key={commodity.id} className="flex items-center">
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
                  className="inline-flex items-center gap-1 text-sm font-medium text-agriGreen-600 hover:text-agriGreen-700"
                >
                  <span>Lihat semua harga</span>
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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Stok Komoditas</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commodities.map((commodity) => (
                  <div key={commodity.id} className="flex items-center">
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
                  className="inline-flex items-center gap-1 text-sm font-medium text-agriGreen-600 hover:text-agriGreen-700"
                >
                  <span>Kelola komoditas</span>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Transaksi Aktif</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTransactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="flex items-center">
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
                      {transaction.status.replace('_', ' ')}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-3 border-t">
                <a 
                  href="/transaksi"
                  className="inline-flex items-center gap-1 text-sm font-medium text-agriGreen-600 hover:text-agriGreen-700"
                >
                  <span>Lihat semua transaksi</span>
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
