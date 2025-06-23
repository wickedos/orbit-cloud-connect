import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  BarChart3,
  Home
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavigationProps {
  onLoginClick?: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { href: '#services', label: 'Services', external: true },
    { href: '#about', label: 'About', external: true },
    { href: '#contact', label: 'Contact', external: true },
  ];

  if (user) {
    navigationItems.push(
      { href: '/customer-dashboard', label: 'Dashboard', external: false }
    );
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CloudTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {location.pathname === '/' ? (
              // Home page navigation
              <>
                {navigationItems.slice(0, 3).map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                {user && (
                  <Link
                    to="/customer-dashboard"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
              </>
            ) : (
              // Other pages navigation
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            )}

            {/* Auth Section */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden lg:inline">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/customer-dashboard" className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/employee-dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Employee Portal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Button 
                  onClick={onLoginClick}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Get Started
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              {location.pathname === '/' ? (
                <>
                  {navigationItems.slice(0, 3).map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </>
              ) : (
                <Link
                  to="/"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              )}

              {user ? (
                <>
                  <Link
                    to="/customer-dashboard"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/employee-dashboard"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Employee Portal</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLoginClick?.();
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
