import React from "react";
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {
  logoText?: string;
  cartItemCount?: number;
  userAvatar?: string;
  userName?: string;
  onSearchSubmit?: (searchTerm: string) => void;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
  onProfileClick?: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;
  isLoggedIn?: boolean;
}

const Header = ({
  logoText = "FASHION STORE",
  cartItemCount = 3,
  userAvatar = "",
  userName = "User",
  onSearchSubmit = () => {},
  onCartClick = () => {},
  onWishlistClick = () => {},
  onProfileClick = () => {},
  onLoginClick = () => {},
  onRegisterClick = () => {},
  onLogoutClick = () => {},
  isLoggedIn = false,
}: HeaderProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="md:hidden mr-2"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <a href="/" className="text-xl font-bold tracking-wider">
            {logoText}
          </a>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for products..."
              className="pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onWishlistClick}
            className="hidden sm:flex"
          >
            <Heart className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogoutClick}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onLoginClick}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onRegisterClick}>
                  Register
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-3">
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <nav className="space-y-2">
              <a href="/categories" className="block py-2 hover:text-primary">
                Categories
              </a>
              <a href="/new-arrivals" className="block py-2 hover:text-primary">
                New Arrivals
              </a>
              <a href="/sale" className="block py-2 hover:text-primary">
                Sale
              </a>
              <a href="/wishlist" className="block py-2 hover:text-primary">
                Wishlist
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
