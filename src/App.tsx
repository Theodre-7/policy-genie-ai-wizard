
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Index from "./pages/Index";
import PolicyGenerator from "./pages/PolicyGenerator";
import PolicyExplainer from "./pages/PolicyExplainer";
import Docs from "./pages/Docs";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #6B1BFF 0%, #FF1B9D 100%)' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/generator" element={<PolicyGenerator />} />
            <Route path="/explain" element={<PolicyExplainer />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
