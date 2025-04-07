
import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={cn("flex-1 flex flex-col", sidebarOpen ? "md:ml-64" : "md:ml-20")}>
        <TopNav onMenuButtonClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 md:p-8 pt-20 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <footer className="p-4 text-center text-sm text-gray-500 border-t bg-white">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <p>© 2025 TaniTrack. All rights reserved.</p>
            <LanguageSwitcher />
          </div>
        </footer>
      </div>
    </div>
  );
}
