import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Herosection() {
  return (
    <div>
        <main className="grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Your Financial
              <br />
              <span className="relative inline-block">
                Command Center
                
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Track stocks in real-time with live market prices, P/E ratios, and latest earnings. 
              Make informed investment decisions with dynamic data at your fingertips.
            </p>

            <div className="flex justify-center mb-16">
              <Link 
                href="/dashboard" 
                className="group relative px-12 py-5 bg-black text-white rounded-lg font-bold text-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-2xl flex items-center space-x-3"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
