import Footer from "@/components/Footer";
import Herosection from "@/components/Herosection";
// import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Herosection />
      </div>
      <Footer/>
    </div>
  );
}
