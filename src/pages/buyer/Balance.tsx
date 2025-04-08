
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, formatCurrency } from "@/lib/utils";

// Mock transaction data
const transactions = [
  {
    id: "TRX-BAL-001",
    type: "top-up",
    amount: 5000000,
    status: "completed",
    date: new Date("2023-11-28"),
    description: "Top Up via Bank Transfer"
  },
  {
    id: "TRX-BAL-002",
    type: "withdraw",
    amount: 2000000,
    status: "completed",
    date: new Date("2023-11-20"),
    description: "Withdraw to Bank Account"
  },
  {
    id: "TRX-BAL-003",
    type: "top-up",
    amount: 3000000,
    status: "pending",
    date: new Date("2023-11-15"),
    description: "Top Up via Bank Transfer"
  },
];

export default function BuyerBalance() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("balance");
  
  // Mock balance data
  const balanceData = {
    balance: 6000000,
    balanceSol: 150,
    solPrice: 40000,
  };
  
  const handleTopUp = () => {
    toast({
      title: t("buyer.finance.comingSoon"),
      description: t("buyer.finance.topUpDescription"),
    });
  };
  
  const handleWithdraw = () => {
    toast({
      title: t("buyer.finance.comingSoon"),
      description: t("buyer.finance.withdrawDescription"),
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-earth-dark-green">{t("buyer.finance.balanceTitle")}</h1>
        <p className="text-earth-dark-green/70">{t("buyer.finance.balanceDescription")}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-earth-dark-green text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                {t("buyer.finance.idrBalance")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-earth-dark-green">
              {formatCurrency(balanceData.balance)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-2">
            <Button variant="outline" className="flex-1 gap-2" onClick={handleTopUp}>
              <ArrowDownToLine className="h-4 w-4" />
              {t("buyer.finance.topUp")}
            </Button>
            <Button variant="outline" className="flex-1 gap-2" onClick={handleWithdraw}>
              <ArrowUpFromLine className="h-4 w-4" />
              {t("buyer.finance.withdraw")}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="bg-amber-600 text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {t("buyer.finance.solBalance")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-amber-700">
              {balanceData.balanceSol} SOL
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ≈ {formatCurrency(balanceData.balanceSol * balanceData.solPrice)}
            </p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500 w-full text-center">
              1 SOL = {formatCurrency(balanceData.solPrice)}
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t("buyer.finance.recentTransactions")}</CardTitle>
          <CardDescription>{t("buyer.finance.recentTransactionsDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">{t("buyer.finance.allTransactions")}</TabsTrigger>
              <TabsTrigger value="topup">{t("buyer.finance.topUps")}</TabsTrigger>
              <TabsTrigger value="withdraw">{t("buyer.finance.withdrawals")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <div 
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'top-up' 
                            ? 'bg-green-100' 
                            : 'bg-amber-100'
                        }`}>
                          {transaction.type === 'top-up' ? (
                            <ArrowDownToLine className={`h-5 w-5 ${
                              transaction.type === 'top-up' 
                                ? 'text-green-600' 
                                : 'text-amber-600'
                            }`} />
                          ) : (
                            <ArrowUpFromLine className={`h-5 w-5 ${
                              transaction.type === 'top-up' 
                                ? 'text-green-600' 
                                : 'text-amber-600'
                            }`} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {transaction.type === 'top-up' 
                              ? t("buyer.finance.topUp") 
                              : t("buyer.finance.withdraw")
                            }
                          </div>
                          <div className="text-sm text-gray-500">
                            {transaction.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${
                          transaction.type === 'top-up' 
                            ? 'text-green-600' 
                            : 'text-amber-600'
                        }`}>
                          {transaction.type === 'top-up' ? '+' : '-'} 
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>{t("buyer.finance.noTransactions")}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="topup" className="mt-4">
              <div className="space-y-4">
                {transactions.filter(t => t.type === 'top-up').length > 0 ? (
                  transactions
                    .filter(t => t.type === 'top-up')
                    .map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-100">
                            <ArrowDownToLine className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {t("buyer.finance.topUp")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">
                            + {formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(transaction.date)}
                          </div>
                        </div>
                      </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>{t("buyer.finance.noTopUps")}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="withdraw" className="mt-4">
              <div className="space-y-4">
                {transactions.filter(t => t.type === 'withdraw').length > 0 ? (
                  transactions
                    .filter(t => t.type === 'withdraw')
                    .map((transaction) => (
                      <div 
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-amber-100">
                            <ArrowUpFromLine className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {t("buyer.finance.withdraw")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.description}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-amber-600">
                            - {formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center justify-end gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(transaction.date)}
                          </div>
                        </div>
                      </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>{t("buyer.finance.noWithdrawals")}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
