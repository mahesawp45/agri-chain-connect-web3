
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  PackageCheck, 
  DollarSign, 
  User, 
  ShoppingCart,
  Package,
  Truck
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

// Mock transaction data for the demo
const transactionsData = [
  {
    id: "TRX-2023-001",
    type: "regular",
    commodityId: "KM001",
    commodityName: "Beras Putih",
    quantity: 1000,
    unit: "kg",
    price: 12000,
    totalPrice: 12000000,
    status: "sudah_dikirim",
    buyerId: "BUY-001",
    buyerName: "PT Agrimax Food",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: "2023-12-10T08:30:00Z",
    updatedAt: "2023-12-15T14:25:00Z",
    termsDocUrl: "/placeholder.svg",
    signatureUrl: "/placeholder.svg",
    shippingStatus: "sudah_dikirim",
    notes: "Pengiriman akan dilakukan dalam 2 batch. Pembayaran akan dilakukan setelah barang diterima.",
    shippingDetails: {
      address: "Jl. Industri No. 123, Kawasan Industri Pulogadung, Jakarta Timur",
      courier: "JNE",
      trackingNumber: "JNE12345678",
      estimatedArrival: "2023-12-20T00:00:00Z",
      shippedDate: "2023-12-15T09:00:00Z"
    },
    history: [
      { date: "2023-12-10T08:30:00Z", status: "menunggu_konfirmasi", description: "Pesanan dibuat" },
      { date: "2023-12-11T10:15:00Z", status: "dikonfirmasi", description: "Pesanan dikonfirmasi penjual" },
      { date: "2023-12-12T13:45:00Z", status: "dibayar", description: "Pembayaran diterima" },
      { date: "2023-12-15T09:00:00Z", status: "persiapan_pengiriman", description: "Barang sedang dipersiapkan" },
      { date: "2023-12-15T14:25:00Z", status: "sudah_dikirim", description: "Barang telah dikirim" }
    ]
  },
  {
    id: "TRX-2023-002",
    type: "order_book",
    commodityId: "KM002",
    commodityName: "Jagung Manis",
    quantity: 500,
    unit: "kg",
    price: 8000,
    totalPrice: 4000000,
    status: "dibayar",
    buyerId: "BUY-002",
    buyerName: "Restoran Padang Jaya",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: "2023-12-08T10:45:00Z",
    updatedAt: "2023-12-14T11:30:00Z",
    termsDocUrl: "/placeholder.svg",
    signatureUrl: "/placeholder.svg",
    shippingStatus: "belum_dikirim",
    notes: "Pembayaran telah dilakukan. Menunggu persiapan pengiriman.",
    shippingDetails: {
      address: "Jl. Merdeka No. 45, Kebayoran Baru, Jakarta Selatan",
      courier: "SiCepat",
      trackingNumber: "-",
      estimatedArrival: "2023-12-22T00:00:00Z",
      shippedDate: null
    },
    history: [
      { date: "2023-12-08T10:45:00Z", status: "menunggu_konfirmasi", description: "Pesanan dibuat dari Order Book" },
      { date: "2023-12-09T09:20:00Z", status: "dikonfirmasi", description: "Pesanan dikonfirmasi penjual" },
      { date: "2023-12-14T11:30:00Z", status: "dibayar", description: "Pembayaran diterima" }
    ]
  },
  {
    id: "TRX-2023-003",
    type: "regular",
    commodityId: "KM003",
    commodityName: "Kedelai",
    quantity: 800,
    unit: "kg",
    price: 15000,
    totalPrice: 12000000,
    status: "selesai",
    buyerId: "BUY-003",
    buyerName: "Pabrik Tahu Murni",
    sellerId: "SEL-002",
    sellerName: "PT Agro Nusantara",
    createdAt: "2023-12-01T14:20:00Z",
    updatedAt: "2023-12-12T09:15:00Z",
    termsDocUrl: "/placeholder.svg",
    signatureUrl: "/placeholder.svg",
    shippingStatus: "sudah_dikirim",
    notes: "Transaksi selesai. Barang telah diterima dengan kondisi baik.",
    shippingDetails: {
      address: "Jl. Industri Kecil No. 78, Cibitung, Bekasi",
      courier: "AnterAja",
      trackingNumber: "AA987654321",
      estimatedArrival: "2023-12-10T00:00:00Z",
      shippedDate: "2023-12-05T08:30:00Z"
    },
    history: [
      { date: "2023-12-01T14:20:00Z", status: "menunggu_konfirmasi", description: "Pesanan dibuat" },
      { date: "2023-12-02T08:45:00Z", status: "dikonfirmasi", description: "Pesanan dikonfirmasi penjual" },
      { date: "2023-12-03T10:30:00Z", status: "dibayar", description: "Pembayaran diterima" },
      { date: "2023-12-04T15:20:00Z", status: "persiapan_pengiriman", description: "Barang sedang dipersiapkan" },
      { date: "2023-12-05T08:30:00Z", status: "sedang_dikirim", description: "Barang sedang dalam pengiriman" },
      { date: "2023-12-10T11:45:00Z", status: "diterima", description: "Barang diterima pembeli" },
      { date: "2023-12-12T09:15:00Z", status: "selesai", description: "Transaksi selesai" }
    ]
  }
];

const TransaksiDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      const found = transactionsData.find(item => item.id === id);
      setTransaction(found || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-center">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!transaction) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">{t("transactions.notfound")}</h2>
          <p className="text-gray-600 mb-6">The requested transaction could not be found.</p>
          <Button onClick={() => navigate('/transaksi')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("action.back")}
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Get the status badge style based on the status
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      menunggu_konfirmasi: {
        label: t("status.pending"),
        className: "bg-blue-100 text-blue-800",
      },
      dikonfirmasi: {
        label: t("status.confirmed"),
        className: "bg-purple-100 text-purple-800",
      },
      negosiasi: {
        label: t("status.negotiating"),
        className: "bg-amber-100 text-amber-800",
      },
      dibayar: {
        label: t("status.paid"),
        className: "bg-emerald-100 text-emerald-800",
      },
      persiapan_pengiriman: {
        label: t("status.processing"),
        className: "bg-indigo-100 text-indigo-800",
      },
      sedang_dikirim: {
        label: t("status.shipping"),
        className: "bg-cyan-100 text-cyan-800",
      },
      sudah_dikirim: {
        label: t("status.shipped"),
        className: "bg-green-100 text-green-800",
      },
      diterima: {
        label: t("status.received"),
        className: "bg-teal-100 text-teal-800",
      },
      selesai: {
        label: t("status.completed"),
        className: "bg-green-100 text-green-800",
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
      <Badge className={`${statusInfo.className}`}>
        {statusInfo.label}
      </Badge>
    );
  };

  // Calculate progress percentage based on status
  const calculateProgress = () => {
    const statusOrder = [
      "menunggu_konfirmasi",
      "dikonfirmasi",
      "dibayar",
      "persiapan_pengiriman",
      "sedang_dikirim",
      "sudah_dikirim",
      "diterima",
      "selesai"
    ];
    
    const currentIndex = statusOrder.findIndex(status => status === transaction.status);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4" 
            onClick={() => navigate('/transaksi')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("action.back")}
          </Button>
          <h1 className="text-2xl font-bold">{t("transactions.detail")}</h1>
          <p className="text-gray-600">{transaction.id}</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            {t("action.print")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>{t("transactions.detail")}</CardTitle>
                {getStatusBadge(transaction.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Progress value={calculateProgress()} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{t("status.pending")}</span>
                  <span>{t("status.processing")}</span>
                  <span>{t("status.shipped")}</span>
                  <span>{t("status.completed")}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{t("transactions.commodity")}</h3>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.commodityName}</p>
                        <p className="text-sm text-gray-500">{transaction.quantity.toLocaleString()} {transaction.unit}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{t("transactions.total")}</h3>
                    <p className="text-xl font-bold text-tani-green-dark">
                      {formatCurrency(transaction.totalPrice)}
                    </p>
                    <p className="text-sm text-gray-500">
                      @{formatCurrency(transaction.price)}/{transaction.unit}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{t("transactions.buyer")}</h3>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.buyerName}</p>
                        <p className="text-sm text-gray-500">{transaction.buyerId}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{t("transactions.seller")}</h3>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.sellerName}</p>
                        <p className="text-sm text-gray-500">{transaction.sellerId}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{t("transactions.terms")}</h3>
                  <p className="text-gray-700 mb-4">{transaction.notes}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      View Agreement
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              {transaction.shippingStatus !== "belum_dikirim" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h3>
                      <p className="text-gray-700">{transaction.shippingDetails.address}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Courier</h3>
                      <p className="text-gray-700">{transaction.shippingDetails.courier}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Tracking Number</h3>
                      <p className="text-gray-700 font-mono">{transaction.shippingDetails.trackingNumber || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Arrival</h3>
                      <p className="text-gray-700">
                        {transaction.shippingDetails.estimatedArrival ? 
                          formatDate(new Date(transaction.shippingDetails.estimatedArrival)) : 
                          "-"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Shipped Date</h3>
                    <p className="text-gray-700">
                      {transaction.shippingDetails.shippedDate ? 
                        formatDate(new Date(transaction.shippingDetails.shippedDate)) : 
                        "Not shipped yet"}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="gap-2">
                      <Truck className="h-4 w-4" />
                      Track Shipment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Truck className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p className="mb-4">Shipping information not available yet</p>
                  <p className="text-sm">Shipping details will be updated once the order is processed for delivery.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction Type</span>
                  <Badge variant="outline" className="capitalize">
                    {transaction.type === "order_book" ? "Order Book" : "Regular"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("transactions.date")}</span>
                  <span>{formatDate(new Date(transaction.createdAt))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span>{formatDate(new Date(transaction.updatedAt))}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Commodity</span>
                  <span>{transaction.commodityName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <span>{transaction.quantity.toLocaleString()} {transaction.unit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Unit Price</span>
                  <span>{formatCurrency(transaction.price)}/{transaction.unit}</span>
                </div>

                <Separator />

                <div className="flex justify-between items-center font-bold">
                  <span>Total Amount</span>
                  <span className="text-tani-green-dark">{formatCurrency(transaction.totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Transaction Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transaction.history.map((event: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-3 h-3 bg-tani-green-dark rounded-full"></div>
                      {index < transaction.history.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-full mt-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex flex-col">
                        <p className="font-medium">{event.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(new Date(event.date))}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="h-4 w-4" />
                  View Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  View Commodity
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <PackageCheck className="h-4 w-4" />
                  Update Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TransaksiDetail;
