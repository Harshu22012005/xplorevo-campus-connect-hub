import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Users, Globe, Sparkles } from "lucide-react";

interface HeroProps {
  onScrollToForm: () => void;
}

export function Hero({ onScrollToForm }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 191, 255, 0.9), rgba(0, 150, 255, 0.8)), url('/lovable-uploads/cfe6d513-347a-4e2b-a9c7-557ac9d1acc8.png')`
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            India's Fastest Growing Youth Travel Community
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-flex items-center gap-3">
              <Rocket className="h-12 w-12 md:h-16 md:w-16 text-white" />
              Join the
            </span>
            <br />
            <span className="bg-gradient-to-r from-white to-primary-light bg-clip-text text-transparent">
              Xplorevo Campus Connect
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
            Connect. Collaborate. Learn. Host Activities in Your College.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/80">
              <Users className="h-5 w-5" />
              <span className="font-medium">Build Community</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Travel & Explore</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Lead Activities</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onScrollToForm}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Social Proof */}
          <div className="mt-12 text-white/70">
            <p className="text-sm mb-2">Join 10,000+ students already part of the community</p>
            <div className="flex justify-center gap-8 text-xs">
              <span>✅ Free to Join</span>
              <span>✅ Exclusive Events</span>
              <span>✅ Travel Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}