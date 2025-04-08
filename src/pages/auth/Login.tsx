
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { TaniTrackCard } from "@/components/custom/TaniTrackCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, User, ArrowRight, QrCode, LockKeyhole, SmartphoneNfc } from "lucide-react";
import { buyerEnTranslations, buyerIdTranslations } from "@/contexts/BuyerLanguageExtension";

// Update the schema to include validation rules
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  }),
  otp: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, currentLanguage, setLanguage, addTranslations } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("farmer");
  const [showOTP, setShowOTP] = useState(false);

  // Add buyer translations
  addTranslations('en', buyerEnTranslations);
  addTranslations('id', buyerIdTranslations);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setLoading(false);
      
      if (activeTab === "farmer") {
        navigate("/dashboard");
      } else if (activeTab === "buyer") {
        navigate("/buyer/marketplace");
      }
      
      toast({
        title: "Login Successful",
        description: "Welcome back to TaniTrack!",
      });
    }, 1500);
  };

  const handleScanCard = () => {
    // Show OTP input after "scanning"
    toast({
      title: "Card Scanned",
      description: "Please enter the OTP sent to your TaniTrack Mobile Auth App",
    });
    setShowOTP(true);
  };

  return (
    <div className="min-h-screen bg-earth-pale-green/20 flex flex-col justify-center items-center p-4 md:p-8 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
        style={{ backgroundImage: "url('/lovable-uploads/dea4ed3d-edc5-4e93-be76-2a87b3ea5476.png')" }}
      />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-xl overflow-hidden bg-white/90 mx-auto mb-4 flex items-center justify-center shadow-md">
            <img 
              src="/lovable-uploads/f7fb75ca-ee07-4d12-a8ab-4e5152e13679.png" 
              alt="TaniTrack Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
          <h1 className="text-3xl font-bold text-earth-dark-green">TaniTrack</h1>
          <p className="text-earth-dark-green/70">
            {t("auth.loginDesc")}
          </p>
        </div>

        <Tabs defaultValue="farmer" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="farmer" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              {t("auth.farmer")}
            </TabsTrigger>
            <TabsTrigger value="buyer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t("auth.buyer")}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="farmer" className="mt-0">
            <Card className="bg-white/95 border-earth-light-brown/30 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-earth-dark-green">
                  {t("auth.farmerLogin")}
                </CardTitle>
                <CardDescription>
                  {t("auth.enterCredentials")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="you@example.com" 
                      {...form.register("email")}
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      <Link to="/forgot-password" className="text-xs text-earth-dark-green hover:underline">
                        {t("auth.forgotPassword")}
                      </Link>
                    </div>
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••" 
                      {...form.register("password")}
                    />
                    {form.formState.errors.password && (
                      <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-earth-dark-green hover:bg-earth-dark-green/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t("auth.loggingIn")}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        {t("auth.login")}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="text-sm text-center w-full">
                  {t("auth.noAccount")}{" "}
                  <Link to="/register" className="text-earth-dark-green font-medium hover:underline">
                    {t("auth.registerNow")}
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="buyer" className="mt-0">
            <Card className="bg-white/95 border-earth-light-brown/30 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-earth-dark-green">
                  {t("auth.buyerLogin")}
                </CardTitle>
                <CardDescription>
                  {t("auth.scanTaniTrackCard")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-full max-w-[18rem] mx-auto">
                    <TaniTrackCard
                      type="buyer"
                      name="PT Agrimax Food"
                      id="BYR-2023-001"
                      location="Jakarta, Indonesia"
                      expiryDate="12/25"
                      isStacked={true}
                      stackPosition="back"
                    />
                    <TaniTrackCard
                      type="farmer"
                      name="Koperasi Tani Makmur"
                      id="FMR-2023-001"
                      location="Karawang, Indonesia"
                      expiryDate="12/25"
                      isStacked={true}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-t border-dashed border-earth-light-brown/30 pt-4">
                    <h3 className="text-sm font-medium text-earth-dark-green mb-3">
                      {t("auth.loginInstructions")}:
                    </h3>
                    <ol className="space-y-3 text-sm text-earth-dark-green/80">
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-earth-pale-green flex items-center justify-center text-earth-dark-green font-medium">1</div>
                        <div>
                          <p>{t("auth.scanInstruction")}</p>
                          <div className="flex items-center gap-1 text-xs text-earth-dark-green/60 mt-1">
                            <SmartphoneNfc className="h-3 w-3" />
                            <span>TaniTrack Mobile Auth App</span>
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-earth-pale-green flex items-center justify-center text-earth-dark-green font-medium">2</div>
                        <div>
                          <p>{t("auth.otpInstruction")}</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                  
                  {!showOTP ? (
                    <Button 
                      onClick={handleScanCard} 
                      className="w-full gap-2 bg-earth-dark-green hover:bg-earth-dark-green/90"
                    >
                      <QrCode className="h-4 w-4" />
                      {t("auth.scanCard")}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="otp">{t("auth.enterOTP")}</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="otp"
                            type="text" 
                            placeholder="000000" 
                            {...form.register("otp")}
                            className="font-mono text-center tracking-widest"
                          />
                          <Button 
                            type="button"
                            onClick={() => form.handleSubmit(onSubmit)()}
                            className="bg-earth-dark-green hover:bg-earth-dark-green/90"
                            disabled={loading}
                          >
                            <LockKeyhole className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <div className="text-sm text-center w-full">
                  {t("auth.needHelp")}{" "}
                  <a href="#" className="text-earth-dark-green font-medium hover:underline">
                    {t("auth.contactSupport")}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="absolute bottom-4 right-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/80 border-earth-light-brown/30"
          onClick={() => setLanguage(currentLanguage === 'en' ? 'id' : 'en')}
        >
          {currentLanguage === 'en' ? '🇮🇩 Bahasa Indonesia' : '🇺🇸 English'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
