
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Package,
  User,
  Clock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock order book data
const orderBooks = [
  {
    id: "OB-2023-001",
    buyerId: "BUY-001",
    buyerName: "PT Agrimax",
    buyerDetails: {
      email: "procurement@agrimax.co.id",
      phone: "+62811234567",
      address: "Jl. Industri No. 123, Kawasan Industri Pulogadung, Jakarta Timur"
    },
    commodityType: "Padi",
    quantity: 1000,
    unit: "kg",
    requestedGrade: "A",
    requestedDeliveryDate: new Date("2023-12-15"),
    offerExpiryDate: new Date("2023-11-30"),
    status: "open",
    termsConditions: "Kualitas premium, kadar air maksimal 14%, bebas hama dan penyakit. Pengiriman dilakukan sesuai jadwal yang telah disepakati. Pembayaran akan dilakukan dalam 7 hari kerja setelah barang diterima.",
    createdAt: new Date("2023-11-05"),
    updatedAt: new Date("2023-11-05"),
    priceOffer: 12000, // Price per unit
    totalValue: 12000000,
    requirementDetails: [
      "Kadar air maksimal 14%",
      "Bebas hama dan penyakit",
      "Kebersihan minimum 98%",
      "Butir utuh minimal 85%"
    ],
    history: [
      { date: "2023-11-05T09:30:00Z", action: "Created", notes: "Order book created by PT Agrimax" }
    ]
  },
  {
    id: "OB-2023-002",
    buyerId: "BUY-002",
    buyerName: "Restoran Padang Jaya",
    buyerDetails: {
      email: "order@padangjaya.com",
      phone: "+62822987654",
      address: "Jl. Merdeka No. 45, Kebayoran Baru, Jakarta Selatan"
    },
    commodityType: "Kedelai",
    quantity: 500,
    unit: "kg",
    requestedGrade: "Premium",
    requestedDeliveryDate: new Date("2023-12-10"),
    offerExpiryDate: new Date("2023-11-25"),
    status: "accepted",
    termsConditions: "Ukuran biji seragam, bebas kotoran. Pengiriman dilakukan sekaligus. Pembayaran akan dilakukan di muka.",
    createdAt: new Date("2023-11-08"),
    updatedAt: new Date("2023-11-15"),
    priceOffer: 15000, // Price per unit
    totalValue: 7500000,
    requirementDetails: [
      "Ukuran biji seragam",
      "Bebas kotoran dan benda asing",
      "Kadar air maksimal 12%",
      "Biji rusak maksimal 2%"
    ],
    history: [
      { date: "2023-11-08T10:45:00Z", action: "Created", notes: "Order book created by Restoran Padang Jaya" },
      { date: "2023-11-15T14:20:00Z", action: "Accepted", notes: "Order accepted by seller" }
    ]
  },
  {
    id: "OB-2023-003",
    buyerId: "BUY-003",
    buyerName: "Pabrik Tepung Makmur",
    buyerDetails: {
      email: "supply@tepungmakmur.id",
      phone: "+62833456789",
      address: "Jl. Industri Kecil No. 88, Cibitung, Bekasi"
    },
    commodityType: "Jagung",
    quantity: 2000,
    unit: "kg",
    requestedGrade: "B",
    requestedDeliveryDate: new Date("2023-12-20"),
    offerExpiryDate: new Date("2023-12-05"),
    status: "open",
    termsConditions: "Jagung kering, tidak berjamur. Pengiriman dapat dilakukan dalam beberapa tahap. Pembayaran sesuai jumlah yang dikirim.",
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-10"),
    priceOffer: 8000, // Price per unit
    totalValue: 16000000,
    requirementDetails: [
      "Jagung kering",
      "Tidak berjamur",
      "Kadar air maksimal 15%",
      "Butir rusak maksimal 5%"
    ],
    history: [
      { date: "2023-11-10T16:30:00Z", action: "Created", notes: "Order book created by Pabrik Tepung Makmur" }
    ]
  }
];

const OrderBookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [orderBook, setOrderBook] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      const found = orderBooks.find(item => item.id === id);
      setOrderBook(found || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAccept = () => {
    toast({
      title: "Order Accepted",
      description: `You have accepted the order ${orderBook.id} from ${orderBook.buyerName}`,
    });
    // Here you would normally update the status via API
    setOrderBook({
      ...orderBook,
      status: "accepted",
      history: [
        ...orderBook.history,
        { 
          date: new Date().toISOString(), 
          action: "Accepted", 
          notes: "Order accepted by seller" 
        }
      ]
    });
  };

  const handleReject = () => {
    toast({
      title: "Order Rejected",
      description: `You have rejected the order ${orderBook.id} from ${orderBook.buyerName}`,
      variant: "destructive"
    });
    // Here you would normally update the status via API
    setOrderBook({
      ...orderBook,
      status: "cancelled",
      history: [
        ...orderBook.history,
        { 
          date: new Date().toISOString(), 
          action: "Rejected", 
          notes: "Order rejected by seller" 
        }
      ]
    });
  };

  // Render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      open: {
        label: t("status.open"),
        className: "bg-blue-100 text-blue-800",
      },
      accepted: {
        label: t("status.accepted"),
        className: "bg-green-100 text-green-800",
      },
      completed: {
        label: t("status.completed"),
        className: "bg-teal-100 text-teal-800",
      },
      expired: {
        label: t("status.expired"),
        className: "bg-gray-100 text-gray-800",
      },
      cancelled: {
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

  if (!orderBook) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">{t("orderbook.notfound")}</h2>
          <p className="text-gray-600 mb-6">The requested order book entry could not be found.</p>
          <Button onClick={() => navigate('/order-book')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("action.back")}
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4" 
            onClick={() => navigate('/order-book')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("action.back")}
          </Button>
          <h1 className="text-2xl font-bold">{t("orderbook.detail")}</h1>
          <p className="text-gray-600">{orderBook.id}</p>
        </div>
        {orderBook.status === "open" && (
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              className="gap-2 text-red-600" 
              onClick={handleReject}
            >
              <XCircle className="h-4 w-4" />
              Reject Order
            </Button>
            <Button 
              className="gap-2 bg-tani-green-dark hover:bg-tani-green-dark/90" 
              onClick={handleAccept}
            >
              <CheckCircle className="h-4 w-4" />
              Accept Order
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>{t("orderbook.detail")}</CardTitle>
                {getStatusBadge(orderBook.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{t("orderbook.commodity")}</h3>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">{orderBook.commodityType}</p>
                      <p className="text-sm text-gray-500">
                        {orderBook.quantity.toLocaleString()} {orderBook.unit}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Requested Grade</h3>
                  <Badge 
                    variant="outline" 
                    className={
                      orderBook.requestedGrade === "Premium" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : orderBook.requestedGrade === "A" 
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-orange-50 text-orange-700 border-orange-200"
                    }
                  >
                    {orderBook.requestedGrade}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Price Offer</h3>
                  <p className="text-xl font-bold text-tani-green-dark">
                    Rp {orderBook.priceOffer.toLocaleString()}/{orderBook.unit}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total: Rp {orderBook.totalValue.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Important Dates</h3>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">Delivery: {formatDate(orderBook.requestedDeliveryDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm">Expires: {formatDate(orderBook.offerExpiryDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Buyer Information</h3>
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">{orderBook.buyerName}</p>
                    <p className="text-sm text-gray-500">{orderBook.buyerDetails.email}</p>
                    <p className="text-sm text-gray-500">{orderBook.buyerDetails.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">{orderBook.buyerDetails.address}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Requirements</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-6">
                  {orderBook.requirementDetails.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h3 className="text-sm font-medium text-gray-500 mb-2">{t("orderbook.terms")}</h3>
                <p className="text-gray-700 mb-4">{orderBook.termsConditions}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderBook.history.map((event: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-3 h-3 bg-tani-green-dark rounded-full"></div>
                      {index < orderBook.history.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-full mt-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex flex-col">
                        <p className="font-medium">{event.action}</p>
                        <p className="text-sm text-gray-500">{formatDate(new Date(event.date))}</p>
                        <p className="text-gray-600 mt-1">{event.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono">{orderBook.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Created Date</span>
                <span>{formatDate(orderBook.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                {getStatusBadge(orderBook.status)}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Commodity</span>
                <span>{orderBook.commodityType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Quantity</span>
                <span>{orderBook.quantity.toLocaleString()} {orderBook.unit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Grade</span>
                <span>{orderBook.requestedGrade}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Unit Price</span>
                <span>Rp {orderBook.priceOffer.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center font-bold">
                <span>Total Value</span>
                <span className="text-tani-green-dark">Rp {orderBook.totalValue.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Requested Delivery Date</h3>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{formatDate(orderBook.requestedDeliveryDate)}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Delivery Address</h3>
                  <p className="text-gray-700">{orderBook.buyerDetails.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Person</h3>
                  <div className="flex flex-col">
                    <p className="text-gray-700">{orderBook.buyerName}</p>
                    <p className="text-sm text-gray-500">{orderBook.buyerDetails.phone}</p>
                    <p className="text-sm text-gray-500">{orderBook.buyerDetails.email}</p>
                  </div>
                </div>
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
                  View Terms
                </Button>
                {orderBook.status === "open" && (
                  <>
                    <Button 
                      className="w-full justify-start gap-2 bg-tani-green-dark hover:bg-tani-green-dark/90"
                      onClick={handleAccept}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Accept Order
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 text-red-600"
                      onClick={handleReject}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject Order
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderBookDetail;
