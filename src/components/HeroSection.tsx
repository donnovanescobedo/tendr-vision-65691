import { Truck, Brain, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-glow rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Brain className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm text-primary-foreground font-medium">AI-Powered Logistics</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            AI Tendering Assistant
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Streamline your logistics operations with intelligent carrier assignment, 
            real-time tracking, and seamless integration with Excel, OTM, and SAP.
          </p>

          <div className="flex flex-wrap justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-primary-foreground/20">
              <Truck className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">Smart Routing</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-primary-foreground/20">
              <Zap className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">Real-time Sync</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-primary-foreground/20">
              <Brain className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">AI Optimization</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
