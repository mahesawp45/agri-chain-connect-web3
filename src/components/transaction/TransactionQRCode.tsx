
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, ExternalLink, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";

interface TransactionQRCodeProps {
  transactionId: string;
  status: string;
  timestamp: Date;
}

export const TransactionQRCode = ({ transactionId, status, timestamp }: TransactionQRCodeProps) => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Create blockchain verification URL
  const blockchainVerificationUrl = `https://tanichain-verify.example.com/transaction/${transactionId}`;
  
  // Generate QR code data containing transaction information
  const qrData = JSON.stringify({
    id: transactionId,
    status,
    timestamp: timestamp.toISOString(),
    url: blockchainVerificationUrl
  });

  const handleViewVerification = () => {
    navigate(`/blockchain-verification?id=${transactionId}`);
  };

  return (
    <Card className="border-earth-light-green/70 bg-earth-pale-green/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-earth-dark-green">
          <QrCode className="h-4 w-4 mr-2" />
          {language === "id" ? "Verifikasi Blockchain" : "Blockchain Verification"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 w-full border-earth-medium-green/50 text-earth-dark-green hover:bg-earth-pale-green"
            >
              <QrCode className="h-4 w-4" />
              {language === "id" ? "Lihat QR Code" : "View QR Code"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {language === "id" ? "QR Code Transaksi" : "Transaction QR Code"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex flex-col items-center justify-center p-4">
              <div className="bg-white p-2 rounded-lg mb-4">
                <QRCodeSVG 
                  value={qrData}
                  size={200}
                  level="H"
                  includeMargin={true}
                  imageSettings={{
                    src: "/placeholder.svg",
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>
              
              <p className="text-sm text-earth-medium-green mb-4">
                {language === "id" 
                  ? "Scan QR code ini untuk melihat detail verifikasi transaksi di blockchain." 
                  : "Scan this QR code to view transaction verification details on the blockchain."}
              </p>
              
              <div className="flex flex-col w-full gap-2">
                <Button
                  variant="outline" 
                  size="sm"
                  className="gap-2 w-full"
                  onClick={handleViewVerification}
                >
                  <ExternalLink className="h-4 w-4" />
                  {language === "id" ? "Lihat Verifikasi" : "View Verification"}
                </Button>
                
                <Badge className="bg-earth-light-green/30 text-earth-dark-green hover:bg-earth-light-green/50 px-2 py-1">
                  <Info className="h-3 w-3 mr-1" />
                  {language === "id" ? "Data Terverifikasi" : "Data Verified"}
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <p className="text-xs text-earth-medium-green mt-2">
          {language === "id" 
            ? "Transaksi ini telah dicatat di blockchain" 
            : "This transaction is recorded on blockchain"}
        </p>
      </CardContent>
    </Card>
  );
};
