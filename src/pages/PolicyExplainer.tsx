
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Shield,
  Users,
  Globe,
  Lock
} from "lucide-react";

const PolicyExplainer = () => {
  const { toast } = useToast();
  const [policyJson, setPolicyJson] = useState("");
  const [explanation, setExplanation] = useState("");
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const examplePolicy = {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowUserAliceUploadToLogsFolder",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::123456789012:user/Alice"
        },
        "Action": [
          "s3:PutObject",
          "s3:PutObjectAcl"
        ],
        "Resource": "arn:aws:s3:::my-bucket-name/logs/*"
      }
    ]
  };

  const loadExample = () => {
    setPolicyJson(JSON.stringify(examplePolicy, null, 2));
    analyzePolicy(JSON.stringify(examplePolicy, null, 2));
  };

  const analyzePolicy = (policy: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      try {
        const parsed = JSON.parse(policy);
        const statement = parsed.Statement[0];
        
        let explanation = "";
        let warnings: string[] = [];

        // Generate explanation
        if (statement.Principal === "*") {
          explanation = "This policy allows ANYONE on the internet to ";
          warnings.push("Public access detected - this bucket is accessible to everyone!");
        } else if (statement.Principal.AWS) {
          const principalArn = statement.Principal.AWS;
          const userMatch = principalArn.match(/user\/(.+)$/);
          const userName = userMatch ? userMatch[1] : "specified principal";
          explanation = `This policy allows the user "${userName}" to `;
        }

        // Analyze actions
        const actions = Array.isArray(statement.Action) ? statement.Action : [statement.Action];
        const actionDescriptions = actions.map(action => {
          switch (action) {
            case "s3:GetObject":
              return "download files";
            case "s3:PutObject":
              return "upload files";
            case "s3:DeleteObject":
              return "delete files";
            case "s3:ListBucket":
              return "list bucket contents";
            case "s3:*":
              warnings.push("Full S3 access granted - consider using least privilege principle");
              return "perform any S3 operation";
            default:
              return action.replace("s3:", "");
          }
        }).join(", ");

        explanation += actionDescriptions;

        // Analyze resource
        const resource = Array.isArray(statement.Resource) ? statement.Resource[0] : statement.Resource;
        const bucketMatch = resource.match(/arn:aws:s3:::([^\/]+)(.*)$/);
        if (bucketMatch) {
          const bucketName = bucketMatch[1];
          const path = bucketMatch[2];
          
          if (path === "/*") {
            explanation += ` in the entire "${bucketName}" bucket.`;
          } else if (path.startsWith("/") && path.endsWith("/*")) {
            const folder = path.slice(1, -2);
            explanation += ` only in the "${folder}/" folder of the "${bucketName}" bucket.`;
          } else {
            explanation += ` on specific resources in the "${bucketName}" bucket.`;
          }
        }

        // Check for conditions
        if (statement.Condition) {
          if (statement.Condition.IpAddress) {
            explanation += " This access is restricted to specific IP addresses.";
          }
          if (statement.Condition.DateGreaterThan) {
            explanation += " This policy has time-based restrictions.";
          }
        }

        setExplanation(explanation);
        setSecurityWarnings(warnings);
        
        toast({
          title: "Policy Analyzed!",
          description: "Your S3 policy has been successfully analyzed.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Invalid JSON format. Please check your policy syntax.",
          variant: "destructive",
        });
      }
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleAnalyze = () => {
    if (!policyJson.trim()) {
      toast({
        title: "No Policy Provided",
        description: "Please paste your S3 bucket policy JSON to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    analyzePolicy(policyJson);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Policy Explainer</h1>
          <p className="text-gray-600">
            Understand what your S3 bucket policies do with plain English explanations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Paste Your Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your S3 bucket policy JSON here..."
                  value={policyJson}
                  onChange={(e) => setPolicyJson(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                
                <div className="flex gap-2 mt-4">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    {isAnalyzing ? "Analyzing..." : "Analyze Policy"}
                  </Button>
                  
                  <Button variant="outline" onClick={loadExample}>
                    Load Example
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Explanation Panel */}
          <div className="space-y-4">
            {explanation && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-indigo-600" />
                    Plain English Explanation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {explanation}
                  </p>
                </CardContent>
              </Card>
            )}

            {securityWarnings.length > 0 && (
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Security Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {securityWarnings.map((warning, index) => (
                      <Alert key={index} className="border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-orange-800">
                          {warning}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {!explanation && !isAnalyzing && (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Paste your S3 bucket policy and click "Analyze Policy" to get a plain English explanation.
                    </p>
                    
                    <div className="flex justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Security Analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>Permission Breakdown</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-600" />
                        <span>Access Scope</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isAnalyzing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Analyzing Policy...
                    </h3>
                    <p className="text-gray-500">
                      Our AI is reading through your policy and preparing a detailed explanation.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-600" />
                Understanding S3 Policy Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Principal</Badge>
                  <p className="text-sm text-gray-600">Who can access</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Action</Badge>
                  <p className="text-sm text-gray-600">What they can do</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Resource</Badge>
                  <p className="text-sm text-gray-600">What they can access</p>
                </div>
                <div className="text-center">
                  <Badge variant="outline" className="mb-2">Condition</Badge>
                  <p className="text-sm text-gray-600">When/how they can access</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolicyExplainer;
