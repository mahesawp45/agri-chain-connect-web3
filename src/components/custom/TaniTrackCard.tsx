
import React from "react";
import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";

interface TaniTrackCardProps {
  type: "farmer" | "buyer";
  name: string;
  id: string;
  location?: string;
  expiryDate?: string;
  className?: string;
}

export function TaniTrackCard({
  type,
  name,
  id,
  location,
  expiryDate,
  className,
}: TaniTrackCardProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "w-72 h-44 rounded-xl shadow-lg p-5 relative overflow-hidden transform transition-transform hover:scale-105",
          type === "farmer" 
            ? "bg-earth-dark-green text-white" 
            : "bg-yellow-500 text-white"
        )}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-xs font-medium uppercase opacity-80">
              {type === "farmer" ? "FARMER ID" : "BUYER ID"}
            </p>
            <h2 className="text-lg font-bold mt-1">TANITRACK</h2>
          </div>
          {type === "buyer" && (
            <div className="bg-yellow-400/50 w-10 h-10 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Card Chip/Stripe (visual element) */}
        <div
          className={cn(
            "w-full h-10 rounded-md bg-opacity-20 mb-3",
            type === "farmer" ? "bg-white/10" : "bg-black/10"
          )}
        ></div>

        {/* Card Info */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium uppercase opacity-80">NAMA</p>
            <p className="text-sm font-bold mt-0.5">{name}</p>
          </div>

          {location && type === "buyer" && (
            <div className="absolute right-5 top-[107px]">
              <p className="text-xs font-medium uppercase opacity-80">LOKASI</p>
              <p className="text-sm font-bold mt-0.5">{location}</p>
            </div>
          )}

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase opacity-80">ID</p>
              <p className="text-sm font-bold mt-0.5">{id}</p>
            </div>

            {expiryDate && type === "buyer" && (
              <div>
                <p className="text-xs font-medium uppercase opacity-80">AKTIF HINGGA</p>
                <p className="text-sm font-bold mt-0.5">{expiryDate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Background pattern for visual effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white rounded-full" />
          <div className="absolute -left-16 -bottom-16 w-56 h-56 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
