
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
import { TransactionGuideDialog } from "@/components/transaction/TransactionGuideDialog";
import { PriceInputForm } from "@/components/transaction/PriceInputForm";
import { transactions } from "@/lib/data/mockData";  // Import directly from mockData

const TransactionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [transaction, setTransaction] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demo, use setTimeout to simulate API call
        setTimeout(() => {
          console.log("Fetching transaction with ID:", id);
          // Use the imported transactions from mockData instead of the local array
          const found = transactions.find(item => item.id === id);
          console.log("Found transaction:", found);
          
          if (found) {
            setTransaction(found);
          } else {
            console.error("Transaction not found with ID:", id);
            // Log all available transaction IDs for debugging
            console.log("Available transaction IDs:", transactions.map(t => t.id));
          }
          
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        setLoading(false);
      }
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
            description: language === "id" ? "Transaksi dikonfirmasi oleh penjual" : "Transaction confirmed by seller"
          }
        ]
      };
      
      console.log("Transaction updated:", updated);
      return updated;
    });
    
    toast({
      title: language === "id" ? "Transaksi dikonfirmasi" : "Transaction confirmed",
      description: language === "id" ? "Transaksi telah dikonfirmasi" : "The transaction has been confirmed",
    });
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
            description: language === "id" ? "Transaksi ditolak oleh penjual" : "Transaction declined by seller"
          }
        ]
      };
    });
    
    toast({
      title: language === "id" ? "Transaksi ditolak" : "Transaction declined",
      description: language === "id" ? "Transaksi telah ditolak" : "The transaction has been declined",
    });
  };

  const handleSubmitPrice = (price: number) => {
    // In a real app, this would be an API call
    setTransaction(prev => {
      if (!prev) return null;
      
      const totalPrice = price * prev.quantity;
      
      return {
        ...prev,
        status: "negosiasi",
        price: price,
        totalPrice: totalPrice,
        updatedAt: new Date(),
        history: [
          ...prev.history,
          {
            date: new Date(),
            status: "negosiasi",
            description: language === "id" 
              ? `Harga ditetapkan: Rp ${price.toLocaleString()}/${prev.unit}` 
              : `Price set: Rp ${price.toLocaleString()}/${prev.unit}`
          }
        ]
      };
    });
  };

  const handleProceedToNegotiation = () => {
    // Scroll to the price input form if on the same page
    const priceFormElement = document.getElementById('price-input-form');
    if (priceFormElement) {
      priceFormElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Redirect to the transaction management page where price can be set
      navigate(`/farmer/transaction/${id}`);
    }
  };

  const openWhatsAppChat = () => {
    if (!transaction) return;
    
    // Format WhatsApp message
    const message = language === "id"
      ? `Halo ${transaction.buyerName}, saya dari ${transaction.sellerName}. Mari bicarakan detail lebih lanjut tentang ${transaction.commodityName} yang Anda pesan. Terima kasih.`
      : `Hello ${transaction.buyerName}, I'm from ${transaction.sellerName}. Let's discuss the details of the ${transaction.commodityName} you ordered. Thank you.`;
    
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
          <p className="text-gray-600 mb-6">{language === "id" ? "Transaksi yang diminta tidak dapat ditemukan." : "The requested transaction could not be found."}</p>
          <button 
            onClick={() => navigate('/transaksi')}
            className="bg-earth-dark-green text-white px-4 py-2 rounded hover:bg-earth-medium-green transition-colors"
          >
            {language === "id" ? "Kembali ke Transaksi" : "Back to Transactions"}
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

  // Determine whether to show the price input form
  const shouldShowPriceInput = transaction?.status === "dikonfirmasi" || transaction?.status === "negosiasi";

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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-earth-dark-green">
              {language === "id" ? "Detail Transaksi" : "Transaction Details"}
            </h2>
            {/* Moved Transaction Guide button here for better accessibility */}
            <TransactionGuideDialog currentStep={transaction.status} />
          </div>
          
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

          {shouldShowPriceInput && (
            <div id="price-input-form">
              <PriceInputForm 
                transaction={transaction}
                onPriceSubmit={handleSubmitPrice}
                openWhatsAppChat={openWhatsAppChat}
              />
            </div>
          )}
        </div>

        <div className="space-y-6">
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
