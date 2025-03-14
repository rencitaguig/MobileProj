import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

interface CategorySectionProps {
  categories?: Category[];
  title?: string;
  onCategoryClick?: (category: Category) => void;
}

const CategorySection = ({
  categories = [
    {
      id: "1",
      name: "Men's Clothing",
      icon: "👔",
      itemCount: 120,
    },
    {
      id: "2",
      name: "Women's Clothing",
      icon: "👗",
      itemCount: 150,
    },
    {
      id: "3",
      name: "Accessories",
      icon: "👜",
      itemCount: 85,
    },
    {
      id: "4",
      name: "Footwear",
      icon: "👟",
      itemCount: 95,
    },
    {
      id: "5",
      name: "Sportswear",
      icon: "🏃",
      itemCount: 70,
    },
    {
      id: "6",
      name: "Outerwear",
      icon: "🧥",
      itemCount: 60,
    },
  ],
  title = "Shop by Category",
  onCategoryClick = () => {},
}: CategorySectionProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <Card
              key={category.id}
              className="min-w-[180px] cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onCategoryClick(category)}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.itemCount} items
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
