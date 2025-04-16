import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Add function to navigate to Order Book page
  const handleOrderBookNavigate = () => {
    navigate("/buyer/order-book");
  };
  
  return (
    <MainLayout>
      {/* Add a button section near the top of the dashboard */}
      <div className="mb-6 flex flex-wrap gap-4">
        <Button 
          onClick={handleOrderBookNavigate}
          className="gap-2 bg-gradient-to-r from-earth-dark-green to-earth-medium-green hover:from-earth-medium-green hover:to-earth-dark-green"
        >
          <ClipboardList className="h-4 w-4" />
          {language === "id" ? "Buka Order Book" : "Open Order Book"}
        </Button>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
