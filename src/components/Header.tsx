import { TrendingUp} from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <div>
        <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-2xl font-bold">
                 <Link href="/"> FinanceHub</Link>
                </span>
            </div>
            
          </div>
        </div>
      </header>
    </div>
  )
}
