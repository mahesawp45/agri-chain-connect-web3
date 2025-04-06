
import { MainLayout } from "@/components/layout/MainLayout";
import { formatCurrency } from "@/lib/utils";
import { Wallet, ArrowDownToLine, BarChart3, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Saldo = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const { toast } = useToast();

  const balance = 24650000; // In IDR, example value
  const solBalance = 98.6; // Example SOL balance
  const conversionRate = 250000; // Example rate: 1 SOL = 250,000 IDR

  const handleWithdraw = () => {
    toast({
      title: "Fitur dalam pengembangan",
      description: "Penarikan saldo akan segera tersedia dalam waktu dekat.",
      variant: "default",
    });
    setWithdrawOpen(false);
    setWithdrawAmount("");
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Saldo</h1>
        <p className="text-gray-600">Kelola saldo akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-tani-green-dark" />
              Saldo Akun
            </CardTitle>
            <CardDescription>Saldo tersedia dalam IDR dan SOL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 p-6 rounded-lg border bg-gradient-to-br from-tani-green-light/10 to-tani-green-dark/10">
                <div className="text-sm font-medium text-gray-500 mb-1">Saldo IDR</div>
                <div className="text-3xl font-bold text-tani-green-dark mb-4">{formatCurrency(balance)}</div>
                <div className="text-xs text-gray-500">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
              
              <div className="flex-1 p-6 rounded-lg border bg-gradient-to-br from-tani-yellow/10 to-tani-yellow/20">
                <div className="text-sm font-medium text-gray-500 mb-1">Saldo SOL</div>
                <div className="text-3xl font-bold text-tani-blue mb-4">{solBalance} SOL</div>
                <div className="text-xs text-gray-500">Setara dengan {formatCurrency(solBalance * conversionRate)}</div>
              </div>
            </div>
            
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Informasi</AlertTitle>
              <AlertDescription>
                Saldo SOL bisa digunakan untuk transaksi pada platform TaniTrack. Nilai tukar 1 SOL = {formatCurrency(conversionRate)}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowDownToLine className="h-4 w-4" />
                  Tarik Saldo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tarik Saldo</DialogTitle>
                  <DialogDescription>
                    Tarik saldo Anda ke rekening bank yang terdaftar
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah Penarikan (IDR)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Masukkan jumlah"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Fitur penarikan saldo sedang dalam pengembangan dan akan segera tersedia.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setWithdrawOpen(false)}>Batal</Button>
                  <Button onClick={handleWithdraw}>Tarik Saldo</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-tani-green-dark" />
              Aktivitas Saldo
            </CardTitle>
            <CardDescription>Riwayat mutasi saldo terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'masuk', date: '25 Apr 2025', amount: 5000000, desc: 'Pembayaran Transaksi #TX7821' },
                { type: 'masuk', date: '18 Apr 2025', amount: 3250000, desc: 'Pembayaran Transaksi #TX7643' },
                { type: 'keluar', date: '10 Apr 2025', amount: 1500000, desc: 'Penarikan ke BCA ****6789' },
                { type: 'masuk', date: '05 Apr 2025', amount: 7450000, desc: 'Pembayaran Order Book #OB221' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium text-sm">{item.desc}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                  <div className={`font-medium ${item.type === 'masuk' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'masuk' ? '+' : '-'} {formatCurrency(item.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="mx-auto">Lihat Semua Aktivitas</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Saldo;
