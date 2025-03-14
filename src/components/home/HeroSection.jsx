import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";

/**
 * @typedef {Object} HeroSectionProps
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} [primaryCta]
 * @property {string} [secondaryCta]
 * @property {string} [backgroundImage]
 * @property {function(): void} [onPrimaryClick]
 * @property {function(): void} [onSecondaryClick]
 */

/**
 * @param {HeroSectionProps} props
 */
const HeroSection = ({
  title = "Summer Collection 2024",
  subtitle = "Discover the latest trends in fashion with our exclusive summer collection. Limited time offers available now.",
  primaryCta = "Shop Now",
  secondaryCta = "View Lookbook",
  backgroundImage = "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80",
  onPrimaryClick = () => console.log("Primary CTA clicked"),
  onSecondaryClick = () => console.log("Secondary CTA clicked"),
}) => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-4xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-base md:text-lg text-gray-100 mb-8 max-w-xl">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onPrimaryClick}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 font-semibold"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {primaryCta}
          </Button>

          <Button
            onClick={onSecondaryClick}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/20 hover:text-white"
          >
            {secondaryCta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Optional: Promotional Badge */}
      <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
        Sale Up to 50% Off
      </div>
    </div>
  );
};

export default HeroSection;
