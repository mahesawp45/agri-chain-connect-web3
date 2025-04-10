
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  DollarSign, 
  User, 
  ShoppingCart,
  Package,
  Truck,
  Check,
  X,
  MessageCircle,
  Calendar,
  MapPin,
  Phone
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Transaction, TransactionStatus } from "@/lib/data/types";

// Mock transaction data for the demo
const transactionsData = [
  {
    id: "TRX-2023-001",
    type: "regular",
    commodityId: "KM001",
    commodityName: "Beras Putih",
    quantity: 1000,
    unit: "kg",
    price: null, // Not yet set
    totalPrice: null, // Not yet set
    status: "menunggu_konfirmasi",
    buyerId: "BUY-001",
    buyerName: "PT Agrimax Food",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: new Date("2023-12-10T08:30:00Z"),
    updatedAt: new Date("2023-12-15T14:25:00Z"),
    termsDocUrl: null,
    signatureUrl: null,
    shippingStatus: null,
    buyerLocation: "Jakarta Timur",
    buyerPhone: "+6281234567890",
    notes: "Membutuhkan beras kualitas premium untuk restoran kami.",
    history: [
      { date: new Date("2023-12-10T08:30:00Z"), status: "menunggu_konfirmasi", description: "Pesanan dibuat oleh pembeli" }
    ]
  },
  {
    id: "TRX-2023-002",
    type: "order_book",
    commodityId: "KM002",
    commodityName: "Jagung Manis",
    quantity: 500,
    unit: "kg",
    price: null, // Not yet set
    totalPrice: null,
    status: "dikonfirmasi",
    buyerId: "BUY-002",
    buyerName: "Restoran Padang Jaya",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: new Date("2023-12-08T10:45:00Z"),
    updatedAt: new Date("2023-12-14T11:30:00Z"),
    termsDocUrl: "/placeholder.svg",
    signatureUrl: null,
    shippingStatus: null,
    buyerLocation: "Jakarta Selatan",
    buyerPhone: "+6287654321098",
    notes: "Dari order book untuk kebutuhan restoran. Butuh pengiriman dalam 1 minggu.",
    history: [
      { date: new Date("2023-12-08T10:45:00Z"), status: "menunggu_konfirmasi", description: "Pesanan dari Order Book" },
      { date: new Date("2023-12-09T09:20:00Z"), status: "dikonfirmasi", description: "Pesanan dikonfirmasi penjual" }
    ]
  }
];

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // For demo, use setTimeout to simulate API call
      setTimeout(() => {
        console.log("Fetching transaction with ID:", id);
        const found = transactionsData.find(item => item.id === id);
        console.log("Found transaction:", found);
        setTransaction(found || null);
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, [id]);

  const handleConfirmTransaction = () => {
    // In a real app, this would be an API call
    setTransaction(prev => {
      if (!prev) return null;
      
      const updated = {
        ...prev,
        status: "dikonfirmasi",
        updatedAt: new Date(),
        history: [
          ...prev.history,
          {
            date: new Date(),
            status: "dikonfirmasi",
            description: "Transaksi dikonfirmasi oleh penjual"
          }
        ]
      };
      
      console.log("Transaction updated:", updated);
      return updated;
    });
    
    toast({
      title: "Transaction confirmed",
      description: "The transaction has been confirmed",
    });

    // Redirect to the transaction management page where price can be set
    navigate(`/farmer/transaction/${id}`);
  };

  const handleDeclineTransaction = () => {
    // In a real app, this would be an API call
    setTransaction(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        status: "dibatalkan",
        updatedAt: new Date(),
        history: [
          ...prev.history,
          {
            date: new Date(),
            status: "dibatalkan",
            description: "Transaksi ditolak oleh penjual"
          }
        ]
      };
    });
    
    toast({
      title: "Transaction declined",
      description: "The transaction has been declined",
    });
  };

  const handleProceedToNegotiation = () => {
    // Redirect to the transaction management page where price can be set
    navigate(`/farmer/transaction/${id}`);
  };

  const openWhatsAppChat = () => {
    if (!transaction) return;
    
    // Format WhatsApp message
    const message = `Halo ${transaction.buyerName}, saya dari ${transaction.sellerName}. Mari bicarakan detail lebih lanjut tentang ${transaction.commodityName} yang Anda pesan. Terima kasih.`;
    
    // Create WhatsApp URL with phone number and message
    const whatsappUrl = `https://wa.me/${transaction.buyerPhone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
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
        className: "bg-earth-wheat text-earth-brown font-medium",
      },
      dikonfirmasi: {
        label: t("status.confirmed"),
        className: "bg-earth-light-brown text-earth-brown font-medium",
      },
      negosiasi: {
        label: t("status.negotiating"),
        className: "bg-earth-clay text-earth-brown font-medium",
      },
      dibayar: {
        label: t("status.paid"),
        className: "bg-earth-light-green text-earth-dark-green font-medium",
      },
      persiapan_pengiriman: {
        label: t("status.processing"),
        className: "bg-earth-light-green/70 text-earth-dark-green font-medium",
      },
      sedang_dikirim: {
        label: t("status.shipping"),
        className: "bg-earth-medium-green/30 text-earth-dark-green font-medium",
      },
      sudah_dikirim: {
        label: t("status.shipped"),
        className: "bg-earth-medium-green/60 text-earth-dark-green font-medium",
      },
      diterima: {
        label: t("status.received"),
        className: "bg-earth-medium-green/90 text-white font-medium",
      },
      selesai: {
        label: t("status.completed"),
        className: "bg-earth-dark-green text-white font-medium",
      },
      dibatalkan: {
        label: t("status.canceled"),
        className: "bg-red-100 text-red-800 font-medium",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status,
      className: "bg-gray-100 text-gray-800 font-medium",
    };

    return (
      <Badge className={`${statusInfo.className} px-3 py-1 rounded-full`}>
        {statusInfo.label}
      </Badge>
    );
  };

  // Calculate progress percentage based on status
  const calculateProgress = () => {
    const statusOrder = [
      "menunggu_konfirmasi",
      "dikonfirmasi",
      "negosiasi",
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
          <h1 className="text-2xl font-bold text-earth-dark-green">{t("transactions.detail")}</h1>
          <p className="text-earth-medium-green font-medium">{transaction.id}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {transaction.status === "menunggu_konfirmasi" && (
            <>
              <Button 
                variant="farmer" 
                onClick={handleConfirmTransaction}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Confirm Transaction
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeclineTransaction}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Decline Transaction
              </Button>
            </>
          )}

          {transaction.status === "dikonfirmasi" && (
            <Button 
              variant="farmer" 
              onClick={handleProceedToNegotiation}
              className="gap-2"
            >
              <DollarSign className="h-4 w-4" />
              Set Price & Negotiate
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="gap-2 border-earth-light-brown/70 text-earth-dark-green hover:bg-earth-pale-green"
          >
            <FileText className="h-4 w-4" />
            Print Details
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="earth-card-forest overflow-hidden">
            <CardHeader className="earth-header-forest pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">{t("transactions.detail")}</CardTitle>
                {getStatusBadge(transaction.status)}
              </div>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="mb-6">
                <Progress value={calculateProgress()} className="h-2 bg-earth-pale-green" />
                <div className="flex justify-between text-xs text-earth-medium-green mt-1">
                  <span>{t("status.pending")}</span>
                  <span>{t("status.negotiating")}</span>
                  <span>{t("status.shipping")}</span>
                  <span>{t("status.completed")}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-earth-pale-green/50">
                    <h3 className="text-sm font-medium text-earth-medium-green mb-1">{t("transactions.commodity")}</h3>
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-earth-medium-green/20 flex items-center justify-center mr-3">
                        <Package className="h-6 w-6 text-earth-medium-green" />
                      </div>
                      <div>
                        <p className="font-bold text-earth-dark-green">{transaction.commodityName}</p>
                        <p className="text-sm text-earth-medium-green">{transaction.quantity.toLocaleString()} {transaction.unit}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-earth-wheat/30">
                    <h3 className="text-sm font-medium text-earth-brown mb-1">{t("transactions.total")}</h3>
                    {transaction.price ? (
                      <>
                        <p className="text-xl font-bold text-earth-dark-green">
                          {formatCurrency(transaction.totalPrice)}
                        </p>
                        <p className="text-sm text-earth-medium-green">
                          @{formatCurrency(transaction.price)}/{transaction.unit}
                        </p>
                      </>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-earth-medium-green italic">Price not set yet</p>
                        {transaction.status === "dikonfirmasi" && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleProceedToNegotiation}
                            className="gap-1 border-earth-light-brown/70 text-earth-dark-green hover:bg-earth-pale-green"
                          >
                            <DollarSign className="h-3 w-3" />
                            Set Price
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="bg-earth-light-brown/30" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-earth-clay/20">
                    <h3 className="text-sm font-medium text-earth-brown mb-2">Buyer Information</h3>
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-earth-clay/30 flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-earth-brown" />
                      </div>
                      <div>
                        <p className="font-bold text-earth-dark-green">{transaction.buyerName}</p>
                        <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" /> {transaction.buyerLocation}
                        </p>
                        <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-1">
                          <Phone className="h-3 w-3" /> {transaction.buyerPhone}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 gap-1 border-earth-light-brown/70 text-earth-dark-green hover:bg-earth-pale-green"
                          onClick={openWhatsAppChat}
                        >
                          <MessageCircle className="h-3 w-3" />
                          Chat via WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-earth-light-green/20">
                    <h3 className="text-sm font-medium text-earth-medium-green mb-2">Transaction Type</h3>
                    <div>
                      <Badge variant="outline" className="capitalize border-earth-dark-green text-earth-dark-green mb-2">
                        {transaction.type === "order_book" ? "Order Book" : "Regular"}
                      </Badge>
                      <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-2">
                        <Calendar className="h-3 w-3" /> Created: {formatDate(transaction.createdAt)}
                      </p>
                      <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" /> Updated: {formatDate(transaction.updatedAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-earth-light-brown/30" />

                <div className="p-4 rounded-lg bg-earth-light-brown/20">
                  <h3 className="text-sm font-medium text-earth-brown mb-2">Notes</h3>
                  <p className="text-earth-dark-green mb-4">{transaction.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {transaction.status === "menunggu_konfirmasi" && (
            <Card className="earth-card-wheat overflow-hidden">
              <CardHeader className="earth-header-wheat pb-3">
                <CardTitle className="text-white">Action Required</CardTitle>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 bg-earth-wheat/30 rounded-lg">
                    <h3 className="font-medium text-earth-dark-green mb-2">Transaction Awaiting Confirmation</h3>
                    <p className="text-earth-medium-green mb-4">
                      This transaction is waiting for your confirmation. Please review the details and decide whether to accept or decline this order.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <Button 
                        variant="farmer" 
                        onClick={handleConfirmTransaction}
                        className="gap-2 w-full sm:w-auto"
                      >
                        <Check className="h-4 w-4" />
                        Confirm Transaction
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={handleDeclineTransaction}
                        className="gap-2 w-full sm:w-auto"
                      >
                        <X className="h-4 w-4" />
                        Decline Transaction
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {transaction.status === "dikonfirmasi" && (
            <Card className="earth-card-wheat overflow-hidden">
              <CardHeader className="earth-header-wheat pb-3">
                <CardTitle className="text-white">Action Required</CardTitle>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="space-y-4">
                  <div className="p-4 bg-earth-wheat/30 rounded-lg">
                    <h3 className="font-medium text-earth-dark-green mb-2">Transaction Confirmed - Set Price</h3>
                    <p className="text-earth-medium-green mb-4">
                      You have confirmed this transaction. The next step is to set a price and begin negotiation with the buyer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <Button 
                        variant="farmer" 
                        onClick={handleProceedToNegotiation}
                        className="gap-2 w-full sm:w-auto"
                      >
                        <DollarSign className="h-4 w-4" />
                        Set Price & Negotiate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card className="earth-card-brown overflow-hidden">
            <CardHeader className="earth-header-brown pb-3">
              <CardTitle className="text-white">Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 rounded bg-earth-light-brown/20">
                  <span className="text-earth-brown">Transaction Type</span>
                  <Badge variant="outline" className="capitalize border-earth-brown text-earth-brown">
                    {transaction.type === "order_book" ? "Order Book" : "Regular"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-earth-light-brown/10">
                  <span className="text-earth-brown">{t("transactions.date")}</span>
                  <span className="text-earth-dark-green">{formatDate(transaction.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-earth-light-brown/20">
                  <span className="text-earth-brown">Last Updated</span>
                  <span className="text-earth-dark-green">{formatDate(transaction.updatedAt)}</span>
                </div>

                <Separator className="bg-earth-light-brown/30" />

                <div className="flex justify-between items-center p-2 rounded bg-earth-light-brown/10">
                  <span className="text-earth-brown">Commodity</span>
                  <span className="text-earth-dark-green">{transaction.commodityName}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-earth-light-brown/20">
                  <span className="text-earth-brown">Quantity</span>
                  <span className="text-earth-dark-green">{transaction.quantity.toLocaleString()} {transaction.unit}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-earth-light-brown/10">
                  <span className="text-earth-brown">Unit Price</span>
                  <span className="text-earth-dark-green">{transaction.price ? `${formatCurrency(transaction.price)}/${transaction.unit}` : "Not set"}</span>
                </div>

                <Separator className="bg-earth-light-brown/30" />

                <div className="flex justify-between items-center p-3 rounded bg-earth-wheat/40 font-bold">
                  <span className="text-earth-dark-green">Total Amount</span>
                  <span className="text-earth-dark-green">{transaction.totalPrice ? formatCurrency(transaction.totalPrice) : "Not set"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="earth-card-clay overflow-hidden">
            <CardHeader className="earth-header-clay pb-3">
              <CardTitle className="text-white">Transaction Timeline</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4">
                {transaction.history.map((event: any, index: number) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-4 h-4 bg-earth-brown rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-earth-clay rounded-full"></div>
                      </div>
                      {index < transaction.history.length - 1 && (
                        <div className="w-0.5 bg-earth-light-brown h-full mt-1"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex flex-col">
                        <p className="font-medium text-earth-dark-green">{event.description}</p>
                        <p className="text-sm text-earth-brown">{formatDate(event.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="earth-card-wheat overflow-hidden">
            <CardHeader className="earth-header-wheat pb-3">
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2 border-earth-light-brown/50 text-earth-dark-green hover:bg-earth-pale-green/50">
                  <FileText className="h-4 w-4" />
                  View Invoice
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 border-earth-light-brown/50 text-earth-dark-green hover:bg-earth-pale-green/50"
                  onClick={openWhatsAppChat}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat with Buyer
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 border-earth-light-brown/50 text-earth-dark-green hover:bg-earth-pale-green/50"
                  onClick={() => navigate(`/komoditas/${transaction.commodityId}`)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Commodity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TransactionDetail;
