
import { MainLayout } from "@/components/layout/MainLayout";
import { formatCurrency } from "@/lib/utils";
import { Wallet, ArrowDownToLine, BarChart3, AlertCircle, CreditCard, Clock, ArrowUpRight, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Saldo = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const balance = 24650000; // In IDR, example value
  const solBalance = 98.6; // Example SOL balance
  const conversionRate = 250000; // Example rate: 1 SOL = 250,000 IDR

  const handleWithdraw = () => {
    toast({
      title: language === 'id' ? "Fitur dalam pengembangan" : "Feature in development",
      description: language === 'id' 
        ? "Penarikan saldo akan segera tersedia dalam waktu dekat." 
        : "Withdrawal functionality will be available soon.",
      variant: "default",
    });
    setWithdrawOpen(false);
    setWithdrawAmount("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { 
      day: 'numeric', 
      month: language === 'id' ? 'long' : 'short', 
      year: 'numeric' 
    });
  };

  const transactionHistory = [
    { type: 'masuk', date: '2025-04-25', amount: 5000000, desc: 'Pembayaran Transaksi #TX7821' },
    { type: 'masuk', date: '2025-04-18', amount: 3250000, desc: 'Pembayaran Transaksi #TX7643' },
    { type: 'keluar', date: '2025-04-10', amount: 1500000, desc: 'Penarikan ke BCA ****6789' },
    { type: 'masuk', date: '2025-04-05', amount: 7450000, desc: 'Pembayaran Order Book #OB221' },
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{t("balance.title")}</h1>
        <p className="text-gray-600">{t("balance.title") === "Balance" ? "Manage your account balance" : "Kelola saldo akun Anda"}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-md border-none overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <CardTitle className="flex items-center text-purple-800">
              <Wallet className="h-5 w-5 mr-2 text-purple-600" />
              {t("balance.available")}
            </CardTitle>
            <CardDescription>{t("balance.title") === "Balance" ? "Available balance in IDR and SOL" : "Saldo tersedia dalam IDR dan SOL"}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 p-6 rounded-lg border bg-gradient-to-br from-green-100 to-teal-50 shadow-sm">
                <div className="text-sm font-medium text-gray-600 mb-1">{language === 'id' ? 'Saldo IDR' : 'IDR Balance'}</div>
                <div className="text-3xl font-bold text-teal-700 mb-4">{formatCurrency(balance)}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {language === 'id' ? 'Terakhir diperbarui: ' : 'Last updated: '}
                  {new Date().toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { 
                    day: 'numeric', 
                    month: language === 'id' ? 'long' : 'short', 
                    year: 'numeric' 
                  })}
                </div>
              </div>
              
              <div className="flex-1 p-6 rounded-lg border bg-gradient-to-br from-blue-100 to-indigo-50 shadow-sm">
                <div className="text-sm font-medium text-gray-600 mb-1">{language === 'id' ? 'Saldo SOL' : 'SOL Balance'}</div>
                <div className="text-3xl font-bold text-blue-700 mb-4">{solBalance} SOL</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <RefreshCcw className="h-3 w-3 mr-1" />
                  {language === 'id' ? 'Setara dengan ' : 'Equivalent to '}
                  {formatCurrency(solBalance * conversionRate)}
                </div>
              </div>
            </div>
            
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("info.processing") === "Processing your request" ? "Information" : "Informasi"}</AlertTitle>
              <AlertDescription>
                {language === 'id' 
                  ? `Saldo SOL bisa digunakan untuk transaksi pada platform TaniTrack. Nilai tukar 1 SOL = ${formatCurrency(conversionRate)}`
                  : `SOL balance can be used for transactions on the TaniTrack platform. Exchange rate: 1 SOL = ${formatCurrency(conversionRate)}`
                }
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 p-6 bg-gray-50">
            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50">
                  <ArrowDownToLine className="h-4 w-4" />
                  {language === 'id' ? 'Tarik Saldo' : 'Withdraw'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{language === 'id' ? 'Tarik Saldo' : 'Withdraw Funds'}</DialogTitle>
                  <DialogDescription>
                    {language === 'id' 
                      ? 'Tarik saldo Anda ke rekening bank yang terdaftar'
                      : 'Withdraw your funds to your registered bank account'
                    }
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">{language === 'id' ? 'Jumlah Penarikan (IDR)' : 'Withdrawal Amount (IDR)'}</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder={language === 'id' ? 'Masukkan jumlah' : 'Enter amount'}
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      {language === 'id' 
                        ? 'Fitur penarikan saldo sedang dalam pengembangan dan akan segera tersedia.'
                        : 'Withdrawal feature is under development and will be available soon.'
                      }
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setWithdrawOpen(false)}>
                    {language === 'id' ? 'Batal' : 'Cancel'}
                  </Button>
                  <Button onClick={handleWithdraw}>
                    {language === 'id' ? 'Tarik Saldo' : 'Withdraw'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card className="shadow-md border-none overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <CardTitle className="flex items-center text-blue-800">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              {language === 'id' ? 'Aktivitas Saldo' : 'Balance Activity'}
            </CardTitle>
            <CardDescription>{language === 'id' ? 'Riwayat mutasi saldo terakhir' : 'Recent balance transaction history'}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {transactionHistory.map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b hover:bg-gray-50 p-2 rounded transition-colors">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      item.type === 'masuk' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {item.type === 'masuk' ? <ArrowDownToLine className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{item.desc}</div>
                      <div className="text-xs text-gray-500">{formatDate(item.date)}</div>
                    </div>
                  </div>
                  <div className={`font-medium ${item.type === 'masuk' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'masuk' ? '+' : '-'} {formatCurrency(item.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50">
            <Button variant="link" className="mx-auto text-blue-600">
              {language === 'id' ? 'Lihat Semua Aktivitas' : 'View All Activities'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Saldo;
