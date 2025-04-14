
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { CheckCircle, Star, Award, Package, Calendar, FileText } from "lucide-react";

interface TransactionCompleteProps {
  transaction: any;
  handlePrintReceipt: () => void;
}

export const TransactionComplete = ({ transaction, handlePrintReceipt }: TransactionCompleteProps) => {
  const { language } = useLanguage();
  
  return (
    <Card className="earth-card-forest overflow-hidden border-2 border-earth-dark-green/30">
      <CardHeader className="earth-header-forest pb-3">
        <CardTitle className="text-white flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          {language === "id" ? "Transaksi Selesai" : "Transaction Completed"}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 space-y-6">
        {/* Success message */}
        <div className="bg-green-50 p-4 rounded-lg border border-earth-dark-green/20">
          <div className="flex items-center mb-3">
            <Award className="h-6 w-6 text-earth-dark-green mr-3" />
            <h3 className="font-medium text-earth-dark-green text-lg">
              {language === "id" 
                ? "Transaksi telah berhasil diselesaikan!" 
                : "Transaction has been successfully completed!"}
            </h3>
          </div>
          <p className="text-earth-medium-green mb-4">
            {language === "id" 
              ? "Terima kasih atas kerja sama Anda. Pembayaran telah diproses dan transaksi telah selesai." 
              : "Thank you for your cooperation. Payment has been processed and the transaction is complete."}
          </p>
        </div>
        
        {/* Transaction details summary */}
        <div className="bg-earth-pale-green/30 p-4 rounded-lg">
          <h3 className="font-semibold text-earth-dark-green mb-3 border-b border-earth-light-green pb-2">
            {language === "id" ? "Ringkasan Transaksi" : "Transaction Summary"}
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-earth-medium-green">{language === "id" ? "Komoditas" : "Commodity"}</p>
              <p className="font-medium text-earth-dark-green">{transaction.commodityName}</p>
            </div>
            <div>
              <p className="text-sm text-earth-medium-green">{language === "id" ? "Jumlah" : "Quantity"}</p>
              <p className="font-medium text-earth-dark-green">{transaction.quantity.toLocaleString()} {transaction.unit}</p>
            </div>
            <div>
              <p className="text-sm text-earth-medium-green">{language === "id" ? "Harga per Unit" : "Price per Unit"}</p>
              <p className="font-medium text-earth-dark-green">{formatCurrency(transaction.price)}/{transaction.unit}</p>
            </div>
            <div>
              <p className="text-sm text-earth-medium-green">{language === "id" ? "Total" : "Total"}</p>
              <p className="font-bold text-earth-dark-green">{formatCurrency(transaction.totalPrice)}</p>
            </div>
          </div>
        </div>
        
        {/* Key dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-earth-light-green/10 p-3 rounded-lg flex items-start">
            <div className="bg-earth-light-green/20 p-2 rounded-full mr-3">
              <Calendar className="h-5 w-5 text-earth-dark-green" />
            </div>
            <div>
              <p className="text-xs text-earth-medium-green">{language === "id" ? "Tanggal Mulai" : "Start Date"}</p>
              <p className="text-sm font-medium text-earth-dark-green">{formatDate(transaction.createdAt)}</p>
            </div>
          </div>
          
          <div className="bg-earth-light-green/10 p-3 rounded-lg flex items-start">
            <div className="bg-earth-light-green/20 p-2 rounded-full mr-3">
              <Package className="h-5 w-5 text-earth-dark-green" />
            </div>
            <div>
              <p className="text-xs text-earth-medium-green">{language === "id" ? "Tanggal Pengiriman" : "Delivery Date"}</p>
              <p className="text-sm font-medium text-earth-dark-green">
                {transaction.actualDeliveryDate ? formatDate(transaction.actualDeliveryDate) : "-"}
              </p>
            </div>
          </div>
          
          <div className="bg-earth-light-green/10 p-3 rounded-lg flex items-start">
            <div className="bg-earth-light-green/20 p-2 rounded-full mr-3">
              <CheckCircle className="h-5 w-5 text-earth-dark-green" />
            </div>
            <div>
              <p className="text-xs text-earth-medium-green">{language === "id" ? "Tanggal Selesai" : "Completion Date"}</p>
              <p className="text-sm font-medium text-earth-dark-green">{formatDate(transaction.updatedAt)}</p>
            </div>
          </div>
        </div>
        
        {/* Rating section */}
        {transaction.rating && (
          <div className="bg-earth-wheat/30 p-4 rounded-lg">
            <h3 className="font-medium text-earth-brown mb-2 flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              {language === "id" ? "Penilaian Pembeli" : "Buyer Rating"}
            </h3>
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-5 w-5 ${i < (transaction.rating || 0) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                />
              ))}
              <span className="ml-2 font-medium text-earth-dark-green">{transaction.rating}/5</span>
            </div>
            {transaction.review && (
              <div className="bg-white/70 p-3 rounded-lg mt-2">
                <p className="text-earth-dark-green italic">{transaction.review}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="farmer"
            className="gap-2"
            onClick={handlePrintReceipt}
          >
            <FileText className="h-4 w-4" />
            {language === "id" ? "Cetak Bukti Transaksi" : "Print Transaction Receipt"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionComplete;
