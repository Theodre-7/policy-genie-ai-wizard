
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, FileText, BookOpen, LogIn, Shield, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const location = useLocation();
  const { toast } = useToast();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleAWSConnect = () => {
    toast({
      title: "Connecting to AWS...",
      description: "Please wait while we establish connection to your AWS account.",
    });
    
    // Simulate AWS connection process
    setTimeout(() => {
      toast({
        title: "AWS Connection Initiated",
        description: "You will be redirected to AWS for authentication.",
      });
    }, 2000);
  };

  return (
    <nav className="border-b bg-white/10 backdrop-blur-md sticky top-0 z-50 border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">BucketShield</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-white bg-white/20"
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
                  ? "text-white bg-white/20"
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
                  ? "text-white bg-white/20"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Docs</span>
            </Link>
            
            <Button 
              variant="secondary" 
              size="sm" 
              className="ml-4 bg-white/20 hover:bg-white/30 text-white border-white/20"
              onClick={handleAWSConnect}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Connect AWS Account
            </Button>
            
            <Link to="/auth">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
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
