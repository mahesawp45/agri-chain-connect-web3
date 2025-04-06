
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // In a real app, this would validate against a real backend
      if (email && password) {
        toast({
          title: "Login berhasil!",
          description: "Selamat datang kembali di AgriChain Connect",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Gagal masuk",
          description: "Email atau kata sandi tidak valid",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-agriGreen-500 rounded-full mb-4">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">AgriChain Connect</h1>
          <p className="text-gray-500 mt-1">Platform Web3 untuk transaksi pertanian</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Masuk ke Akun</CardTitle>
            <CardDescription>
              Masukkan email dan kata sandi Anda untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <a
                    href="#"
                    className="text-sm font-medium text-agriGreen-600 hover:text-agriGreen-700"
                  >
                    Lupa kata sandi?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-agriGreen-600 hover:bg-agriGreen-700"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
              <p className="text-sm text-center text-gray-500">
                Belum punya akun?{" "}
                <a
                  href="#"
                  className="font-medium text-agriGreen-600 hover:text-agriGreen-700"
                >
                  Daftar sekarang
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
