
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatCurrency } from "@/lib/utils";

interface TransactionInfoProps {
  transaction: any;
  handleProceedToNegotiation: () => void;
  getStatusBadge: (status: string) => JSX.Element;
  calculateProgress: () => number;
}

export const TransactionInfo = ({
  transaction,
  handleProceedToNegotiation,
  getStatusBadge,
  calculateProgress,
}: TransactionInfoProps) => {
  const { t } = useLanguage();

  return (
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

          <BuyerInfo transaction={transaction} openWhatsAppChat={() => {}} />

          <Separator className="bg-earth-light-brown/30" />

          <div className="p-4 rounded-lg bg-earth-light-brown/20">
            <h3 className="text-sm font-medium text-earth-brown mb-2">Notes</h3>
            <p className="text-earth-dark-green mb-4">{transaction.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface BuyerInfoProps {
  transaction: any;
  openWhatsAppChat: () => void;
}

export const BuyerInfo = ({ transaction, openWhatsAppChat }: BuyerInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 rounded-lg bg-earth-clay/20">
        <h3 className="text-sm font-medium text-earth-brown mb-2">Buyer Information</h3>
        <div className="flex items-start">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-earth-clay/30 flex items-center justify-center mr-3">
            <span className="h-6 w-6 text-earth-brown" />
          </div>
          <div>
            <p className="font-bold text-earth-dark-green">{transaction.buyerName}</p>
            <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-1">
              <span className="h-3 w-3" /> {transaction.buyerLocation}
            </p>
            <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-1">
              <span className="h-3 w-3" /> {transaction.buyerPhone}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 gap-1 border-earth-light-brown/70 text-earth-dark-green hover:bg-earth-pale-green"
              onClick={openWhatsAppChat}
            >
              <span className="h-3 w-3" />
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
            <span className="h-3 w-3" /> Created: {new Date(transaction.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-earth-medium-green flex items-center gap-1 mt-1">
            <span className="h-3 w-3" /> Updated: {new Date(transaction.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;
