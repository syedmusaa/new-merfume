import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { ArrowRight, Star, Sparkles, Gift } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-background to-accent/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYWY0ZjAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzQgNi0yLTYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="mb-8">
              <img
                src="https://cdn.builder.io/api/v1/assets/df01e345c2d146ff8c27b0570e833c11/merfume-logo-74e35c?format=webp&width=800"
                alt="Merfume - Luxury Perfumes"
                className="h-32 md:h-40 lg:h-48 w-auto mx-auto drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Discover Your
              <span className="block text-gold bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
                Signature Scent
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the world of luxury fragrances. Each bottle tells a
              story, each scent creates a memory. Welcome to Merfume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/store">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-dark text-luxury-black font-semibold px-8 py-4 text-lg group"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gold text-gold hover:bg-gold hover:text-luxury-black px-8 py-4 text-lg"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Merfume?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to bringing you the finest fragrances with
              unmatched quality and service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-gold/50 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                  <Sparkles className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Premium Quality
                </h3>
                <p className="text-muted-foreground">
                  Each fragrance is carefully curated and sourced from the
                  world's finest perfume houses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-gold/50 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                  <Star className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Expert Curation
                </h3>
                <p className="text-muted-foreground">
                  Our perfume experts hand-select each fragrance to ensure
                  exceptional quality and uniqueness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-gold/50 transition-colors group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                  <Gift className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Luxury Experience
                </h3>
                <p className="text-muted-foreground">
                  From packaging to delivery, every detail is designed to
                  provide a luxurious experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gold/10 via-accent/20 to-gold/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Find Your Perfect Fragrance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered their
            signature scent with Merfume.
          </p>
          <Link to="/store">
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-luxury-black font-semibold px-12 py-4 text-lg"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-black text-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img
                src="https://cdn.builder.io/api/v1/assets/df01e345c2d146ff8c27b0570e833c11/merfume-logo-74e35c?format=webp&width=800"
                alt="Merfume"
                className="h-20 w-auto mb-4 brightness-110"
              />
              <p className="text-cream/80 max-w-md">
                Discover the world of luxury fragrances with Merfume. Each scent
                tells a story, each bottle holds a memory.
              </p>
            </div>
            <div>
              <h3 className="text-gold font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ceo-vision"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    CEO Vision
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cream/20 mt-12 pt-8 text-center">
            <p className="text-cream/60">
              © 2024 Merfume. All rights reserved. Crafted with luxury in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
