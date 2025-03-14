import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";

/**
 * @typedef {Object} ProductCardProps
 * @property {string} [id]
 * @property {string} [name]
 * @property {number} [price]
 * @property {string} [image]
 * @property {number} [rating]
 * @property {number} [discount]
 * @property {boolean} [isNew]
 * @property {function(): void} [onAddToCart]
 * @property {function(): void} [onAddToWishlist]
 */

/**
 * @param {ProductCardProps} props
 */
const ProductCard = ({
  id = "1",
  name = "Classic Cotton T-Shirt",
  price = 29.99,
  image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
  rating = 4.5,
  discount = 0,
  isNew = false,
  onAddToCart = () => console.log("Added to cart"),
  onAddToWishlist = () => console.log("Added to wishlist"),
}) => {
  // Calculate discounted price if applicable
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : null;

  // Generate star rating display
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="w-4 h-4 fill-yellow-400 text-yellow-400 fill-half"
          />,
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <Card className="w-full max-w-[300px] overflow-hidden flex flex-col bg-white">
      <div className="relative">
        {/* Product image */}
        <div className="aspect-ratio-box h-[200px] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <Badge variant="secondary" className="bg-blue-500 text-white">
              New
            </Badge>
          )}
          {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
        </div>

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
          onClick={onAddToWishlist}
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </Button>
      </div>

      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-1 mb-1">
          {renderRating()}
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>
        <h3 className="font-medium text-base line-clamp-1">{name}</h3>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex items-center gap-2">
          {discountedPrice ? (
            <>
              <span className="font-bold text-lg">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg">${price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={onAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
