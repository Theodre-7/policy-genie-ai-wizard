
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, BookOpen, LogIn, Shield, Link as LinkIcon } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-white/20 bg-white/10 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg border border-white/30">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">S3PolicyGenie</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-white bg-white/20 backdrop-blur-sm border border-white/30"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/generator"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/generator")
                  ? "text-white bg-white/20 backdrop-blur-sm border border-white/30"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Policy Generator</span>
            </Link>
            
            <Link
              to="/docs"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/docs")
                  ? "text-white bg-white/20 backdrop-blur-sm border border-white/30"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Docs</span>
            </Link>
            
            <Button variant="secondary" size="sm" className="ml-4 bg-green-600/90 hover:bg-green-700/90 text-white border-green-500/50">
              <LinkIcon className="h-4 w-4 mr-2" />
              Connect AWS Account
            </Button>
            
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
