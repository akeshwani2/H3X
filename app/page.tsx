import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, ChartBarIncreasing, Cpu, Globe, Network, Search, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Outfit } from "next/font/google";
import DeveloperTools from "@/components/DeveloperTools";

// Initialize the font
const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
    const features = [
      {
        icon: Globe,
        title: "Blockchain Hosting",
        description:
          "Host your website on the blockchain with permanent accessibility and zero ongoing costs.",
      },
      {
        icon: Zap,
        title: "Seamless Integration",
        description:
          "Connect your GitHub repository for automated deployments with instant preview environments.",
      },
      {
        icon: Cpu,
        title: "AI-Powered Creation",
        description:
          "Transform your ideas into websites using AI technology, with direct blockchain deployment.",
      },
      {
        icon: Search,
        title: "Web3 Discovery Engine",
        description:
          "Find and explore blockchain-hosted websites through our comprehensive search platform.",
      },
      {
        icon: BarChart,
        title: "Performance Insights",
        description:
          "Track your website's performance with detailed analytics and continuous availability monitoring.",
      },
      {
        icon: Network,
        title: "Distributed Edge Network",
        description:
          "Experience enhanced speed and reliability through our blockchain-based content delivery system.",
      },
    ];
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className={`min-h-screen p-8 pb-20 gap-16 sm:p-12 ${outfit.className} bg-background text-foreground`}>
        <header className="mb-12 text-center">
          <Image 
            className="mx-auto text-white mb-4"
            src="/svg/lock-square-rounded.svg"
            alt="HTTP3 Logo"
            width={110}
            height={48}
            priority
          />
          <h1 className="text-7xl max-w-5xl mx-auto font-bold mb-4">
            <span style={{ textShadow: '0 0 15px rgba(0, 149, 255, 0.8), 0 0 25px rgba(0, 149, 255, 0.8), 0 0 35px rgba(0, 149, 255, 0.6)' }}>Elevating Web3 Hosting with {" "}</span>
            <span className="text-blue-700">Smart Contracts</span>
          </h1>
          <p 
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            style={{ textShadow: '0 0 10px rgba(128, 128, 128, 0.8), 0 0 20px rgba(128, 128, 128, 0.6), 0 0 30px rgba(128, 128, 128, 0.4)' }}
          >
            Host your static websites on the blockchain with unparalleled freedom—no hosting fees, no expiration constraints, and zero maintenance overhead.
            Ensure the perpetual preservation of your web projects through H3X's cutting-edge decentralized hosting solution.
          </p>
          <Link href={"/dashboard"}>
            <Button size="lg" className="mr-4 text-lg">
              Deploy for free now! <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="mr-4 text-lg">
            Learn how it works
          </Button>
        </header>
        <main className="max-w-6xl mx-auto">
          <section className="mb-16 text-center">
            <h2 className="text-4xl font-semibold mb-8" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)' }}>
              Innovate Your Web3 Hosting Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#0a0a0a] border border-1 p-6 rounded-xl transition-opacity duration-300 hover:opacity-80 hover:shadow-lg"
                >
                  <feature.icon className="w-12 h-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-4xl font-semibold mb-2" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.4)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" style={{ textShadow: '0 0 10px rgba(128, 128, 128, 0.8), 0 0 20px rgba(128, 128, 128, 0.6), 0 0 30px rgba(128, 128, 128, 0.4)' }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* New sections can be added here for Marketplace, Governance, etc. */}
        </main>

        <DeveloperTools />
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 H3X. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}
