
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  CheckCircle, 
  Users, 
  Globe, 
  Lock,
  FileText,
  Sparkles,
  BookOpen
} from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const heroRef = useScrollAnimation();
  const featuresRef = useScrollAnimation();
  const useCasesRef = useScrollAnimation();
  const ctaRef = useScrollAnimation();

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "AI-Powered Generation",
      description: "Generate complex S3 policies in seconds using natural language prompts"
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Security Best Practices",
      description: "Built-in security recommendations and policy validation"
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Plain English Explanations",
      description: "Understand what your policies do with clear, human-readable explanations"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-white" />,
      title: "Policy Validation",
      description: "Real-time validation and error checking for your S3 bucket policies"
    }
  ];

  const useCases = [
    { icon: <Globe className="h-5 w-5" />, text: "Public Access Control" },
    { icon: <Users className="h-5 w-5" />, text: "Cross-Account Access" },
    { icon: <Lock className="h-5 w-5" />, text: "IP/VPC Restrictions" },
    { icon: <FileText className="h-5 w-5" />, text: "Folder-Level Permissions" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8" ref={heroRef.elementRef}>
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${heroRef.isVisible ? 'animate-slide-in-bottom' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <TypewriterText text="Simplify S3 Bucket Security" className="block" />
              <span className="block text-white/90 mt-2">with AI</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Generate and validate S3 bucket policies without writing JSON manually. 
              Our AI-powered tool creates secure, compliant policies in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-black hover:from-purple-700 hover:to-gray-900 text-white text-lg px-8 py-3 rounded-2xl backdrop-blur-sm border border-white/20">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Policy Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/docs">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-black hover:from-purple-700 hover:to-gray-900 text-white text-lg px-8 py-3 rounded-2xl backdrop-blur-sm border border-white/20">
                  <BookOpen className="mr-2 h-5 w-5" />
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" ref={featuresRef.elementRef}>
        <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-200 ${featuresRef.isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose BucketShield?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Powerful features designed to make S3 bucket policy management simple and secure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/80">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" ref={useCasesRef.elementRef}>
        <div className={`max-w-7xl mx-auto transition-all duration-1000 delay-400 ${useCasesRef.isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Common Use Cases
            </h2>
            <p className="text-lg text-white/80">
              Handle any S3 security scenario with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="bg-white/20 p-2 rounded-lg flex-shrink-0 text-white">
                  {useCase.icon}
                </div>
                <span className="text-white font-medium">{useCase.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" ref={ctaRef.elementRef}>
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-600 ${ctaRef.isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Secure Your S3 Buckets?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start generating secure S3 bucket policies in seconds
          </p>
          <Link to="/generator">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-black hover:from-purple-700 hover:to-gray-900 text-white text-lg px-8 py-3 rounded-2xl backdrop-blur-sm border border-white/20">
              <Sparkles className="mr-2 h-5 w-5" />
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
