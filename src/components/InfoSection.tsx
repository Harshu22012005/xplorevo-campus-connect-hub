import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, MapPin, Trophy, Heart, Zap } from "lucide-react";

export function InfoSection() {
  const features = [
    {
      icon: Users,
      title: "Build Your Network",
      description: "Connect with like-minded students from colleges across India"
    },
    {
      icon: Calendar,
      title: "Organize Events",
      description: "Host travel meetups, workshops, and adventure activities in your college"
    },
    {
      icon: MapPin,
      title: "Explore Together",
      description: "Join group trips and discover amazing destinations with fellow travelers"
    },
    {
      icon: Trophy,
      title: "Leadership Skills",
      description: "Develop event management and leadership capabilities"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Create positive experiences and memories for your college community"
    },
    {
      icon: Zap,
      title: "Exclusive Access",
      description: "Get early access to Xplorevo events, workshops, and opportunities"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Join Campus Connect?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of a movement that's transforming how students explore, learn, and grow together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[var(--xplorevo-card-shadow)] group"
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}