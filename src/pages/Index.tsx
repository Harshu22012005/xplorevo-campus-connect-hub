import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { InfoSection } from "@/components/InfoSection";
import { CampusConnectForm } from "@/components/CampusConnectForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onScrollToForm={scrollToForm} />
      
      {/* Info Section */}
      <InfoSection />
      
      {/* Form Section */}
      <section ref={formRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and join thousands of students who are already part of the Xplorevo community
            </p>
          </div>
          <CampusConnectForm />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
