
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
  Sparkles
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-indigo-600" />,
      title: "AI-Powered Generation",
      description: "Generate complex S3 policies in seconds using natural language prompts"
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: "Security Best Practices",
      description: "Built-in security recommendations and policy validation"
    },
    {
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      title: "Plain English Explanations",
      description: "Understand what your policies do with clear, human-readable explanations"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
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
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-2xl">
                <Sparkles className="h-12 w-12 text-indigo-600" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simplify S3 Bucket Security
              <span className="block text-indigo-600">with AI</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Generate and validate S3 bucket policies without writing JSON manually. 
              Our AI-powered tool creates secure, compliant policies in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3 rounded-2xl">
                  Generate Policy Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/docs">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 rounded-2xl">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose S3PolicyGenie?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make S3 bucket policy management simple and secure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo-50 p-3 rounded-xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Use Cases
            </h2>
            <p className="text-lg text-gray-600">
              Handle any S3 security scenario with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-indigo-100 p-2 rounded-lg flex-shrink-0">
                  {useCase.icon}
                </div>
                <span className="text-gray-900 font-medium">{useCase.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Secure Your S3 Buckets?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Start generating secure S3 bucket policies in seconds
          </p>
          <Link to="/generator">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 rounded-2xl">
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
