
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1 border border-primary/30 hover:bg-primary/10">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{language === "id" ? "Indonesia" : "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => setLanguage("id")} className="cursor-pointer">
          <span className={language === "id" ? "font-bold" : ""}>Indonesia (ID)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
          <span className={language === "en" ? "font-bold" : ""}>English (EN)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
