
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleLogin = () => {
    if (!otp) {
      toast({
        title: t("error.validation"),
        description: t("auth.otpRequired"),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setLoading(false);
      navigate("/buyer/marketplace");
      
      toast({
        title: t("success.login"),
        description: t("auth.welcomeBack"),
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-earth-pale-green/20 flex flex-col justify-center items-center p-4 md:p-8 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" 
        style={{ backgroundImage: "url('/lovable-uploads/dea4ed3d-edc5-4e93-be76-2a87b3ea5476.png')" }}
      />
      
      <div className="w-full max-w-5xl overflow-hidden rounded-lg shadow-lg relative z-10">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left side - Explanation */}
          <div className="bg-gray-200 p-6 md:p-10 md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-earth-dark-green mb-4">
              {t("auth.loginInstructions")}
            </h2>
            <p className="text-earth-dark-green/80">
              {t("auth.scanInstruction")}
            </p>
          </div>
          
          {/* Right side - Login form */}
          <div className="bg-white p-6 md:p-10 md:w-1/2">
            <div className="flex flex-col h-full justify-center max-w-md mx-auto">
              <CardHeader className="pb-4 text-center">
                <CardTitle className="text-2xl text-earth-dark-green">
                  {t("auth.login")}
                </CardTitle>
                <CardDescription>
                  {t("auth.enterOTP")}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Input 
                      type="text" 
                      placeholder={t("auth.otpPlaceholder")}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="font-mono text-center tracking-widest"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleLogin} 
                    className="w-full bg-earth-dark-green hover:bg-earth-dark-green/90"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t("auth.loggingIn")}
                      </div>
                    ) : (
                      t("auth.login")
                    )}
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pt-0">
                <div className="text-sm text-center">
                  {t("auth.needHelp")}{" "}
                  <a href="#" className="text-earth-dark-green font-medium hover:underline">
                    {t("auth.contactSupport")}
                  </a>
                </div>
              </CardFooter>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/80 border-earth-light-brown/30"
          onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
        >
          {language === 'en' ? '🇮🇩 Bahasa Indonesia' : '🇺🇸 English'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
