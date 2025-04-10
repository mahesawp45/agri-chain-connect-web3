
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { TransactionHeader } from "@/components/transaction/TransactionHeader";
import { TransactionInfo } from "@/components/transaction/TransactionInfo";
import { StatusCard } from "@/components/transaction/StatusCard";
import { TransactionTimeline } from "@/components/transaction/TransactionTimeline";
import { TransactionSummary } from "@/components/transaction/TransactionSummary";

// Mock transaction data for the demo - updated to have a clear "menunggu_konfirmasi" transaction
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
    updatedAt: new Date("2023-12-10T08:30:00Z"),
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
    updatedAt: new Date("2023-12-09T09:20:00Z"),
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
    createdAt: new Date("2023-12-01T14:20:00Z"),
    updatedAt: new Date("2023-12-12T09:15:00Z"),
    termsDocUrl: "/placeholder.svg",
    signatureUrl: "/placeholder.svg",
    shippingStatus: "sudah_dikirim",
    buyerLocation: "Bekasi",
    buyerPhone: "+6285678901234",
    notes: "Transaksi selesai. Barang telah diterima dengan kondisi baik.",
    history: [
      { date: new Date("2023-12-01T14:20:00Z"), status: "menunggu_konfirmasi", description: "Pesanan dibuat" },
      { date: new Date("2023-12-02T08:45:00Z"), status: "dikonfirmasi", description: "Pesanan dikonfirmasi penjual" },
      { date: new Date("2023-12-03T10:30:00Z"), status: "dibayar", description: "Pembayaran diterima" },
      { date: new Date("2023-12-12T09:15:00Z"), status: "selesai", description: "Transaksi selesai" }
    ]
  },
  // Added a transaction with ID TRX-2023-005 for the specific route
  {
    id: "TRX-2023-005",
    type: "regular",
    commodityId: "KM005",
    commodityName: "Padi Organik",
    quantity: 2000,
    unit: "kg",
    price: null, // Not yet set
    totalPrice: null, // Not yet set
    status: "menunggu_konfirmasi",
    buyerId: "BUY-005",
    buyerName: "PT Beras Sejahtera",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: new Date("2023-12-15T11:15:00Z"),
    updatedAt: new Date("2023-12-15T11:15:00Z"),
    termsDocUrl: null,
    signatureUrl: null,
    shippingStatus: null,
    buyerLocation: "Surabaya, Jawa Timur",
    buyerPhone: "+628123456789",
    notes: "Membutuhkan padi organik untuk produksi beras premium.",
    history: [
      { date: new Date("2023-12-15T11:15:00Z"), status: "menunggu_konfirmasi", description: "Pesanan dibuat oleh pembeli" }
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
          <button onClick={() => navigate('/transaksi')}>
            Back to Transactions
          </button>
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
      <TransactionHeader 
        id={transaction.id}
        status={transaction.status}
        onProceedToNegotiation={handleProceedToNegotiation}
        onConfirmTransaction={handleConfirmTransaction}
        onDeclineTransaction={handleDeclineTransaction}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <TransactionInfo 
            transaction={transaction}
            handleProceedToNegotiation={handleProceedToNegotiation}
            getStatusBadge={getStatusBadge}
            calculateProgress={calculateProgress}
          />

          {(transaction.status === "menunggu_konfirmasi" || transaction.status === "dikonfirmasi") && (
            <StatusCard 
              status={transaction.status} 
              onConfirmTransaction={handleConfirmTransaction}
              onDeclineTransaction={handleDeclineTransaction}
              onProceedToNegotiation={handleProceedToNegotiation}
            />
          )}
        </div>

        <div>
          <TransactionSummary
            transaction={transaction}
            openWhatsAppChat={openWhatsAppChat}
          />

          <div className="mt-6">
            <TransactionTimeline history={transaction.history} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TransactionDetail;
