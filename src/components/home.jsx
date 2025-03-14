import React from "react";
import HeroSection from "./home/HeroSection";
import CategorySection from "./home/CategorySection";
import ProductGrid from "./products/ProductGrid";
import { Button } from "./ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Input } from "./ui/input";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <div className="container mx-auto px-4 py-8">
        <CategorySection />
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8">
        <ProductGrid title="Featured Products" />
      </div>

      {/* New Arrivals */}
      <div className="container mx-auto px-4 py-8">
        <ProductGrid
          title="New Arrivals"
          products={[
            {
              id: "101",
              name: "Oversized Graphic Tee",
              price: 34.99,
              image:
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
              rating: 4.3,
              isNew: true,
              category: "Women",
            },
            {
              id: "102",
              name: "Cargo Pants",
              price: 69.99,
              image:
                "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80",
              rating: 4.6,
              isNew: true,
              category: "Men",
            },
            {
              id: "103",
              name: "Platform Sneakers",
              price: 79.99,
              image:
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
              rating: 4.8,
              isNew: true,
              category: "Footwear",
            },
            {
              id: "104",
              name: "Minimalist Watch",
              price: 129.99,
              image:
                "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&q=80",
              rating: 4.9,
              isNew: true,
              category: "Accessories",
            },
          ]}
          showFilters={false}
        />
      </div>

      {/* Promotional Banner */}
      <div className="w-full bg-primary py-16 my-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Summer Sale - Up to 50% Off
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Enjoy exclusive discounts on our summer collection. Limited time
            offer available online and in stores.
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Shop the Sale
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="container mx-auto px-4 py-12 mb-8">
        <div className="bg-muted p-8 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest trends, new arrivals, and exclusive
              offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer would typically go here, but it's likely in a separate layout component */}
    </div>
  );
};

export default Home;
