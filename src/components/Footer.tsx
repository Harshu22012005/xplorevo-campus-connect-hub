import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-primary/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">X</span>
              </div>
              <span className="font-bold text-xl text-foreground">Xplorevo</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering youth to explore, connect, and create unforgettable experiences across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </a>
              <a href="#programs" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Programs
              </a>
              <a href="#events" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Events
              </a>
              <a href="#faq" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>connect@xplorevo.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 99999 88888</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Follow Us</h3>
            <div className="space-y-3">
              <a 
                href="https://instagram.com/xplorevo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
              >
                <Instagram className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span>@xplorevo</span>
              </a>
              <p className="text-xs text-muted-foreground">
                Follow us for daily travel inspiration and campus connect updates
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 Xplorevo. All rights reserved. Built with ❤️ for Indian students.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#support" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}