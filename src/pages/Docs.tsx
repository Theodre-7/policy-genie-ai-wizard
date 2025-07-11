
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Shield, 
  Code, 
  Users, 
  Globe, 
  Lock,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-white/80">
            Complete guide to using S3PolicyGenie and understanding S3 bucket policies
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BookOpen className="mr-2 h-5 w-5 text-indigo-400" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-white/80 mb-4">
                S3PolicyGenie makes it easy to create secure S3 bucket policies without writing JSON manually. 
                Follow these steps to get started:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-white/80">
                <li>Navigate to the Policy Generator</li>
                <li>Choose your access type (Public, IAM User, Cross-Account, etc.)</li>
                <li>Enter your bucket name and optional folder prefix</li>
                <li>Select the permissions you want to grant</li>
                <li>Configure advanced options if needed</li>
                <li>Click "Generate Policy" to create your JSON policy</li>
                <li>Copy the policy and apply it to your S3 bucket</li>
              </ol>
            </CardContent>
          </Card>

          {/* Policy Types */}
          <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="mr-2 h-5 w-5 text-green-400" />
                Common Policy Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                  <div className="flex items-center mb-2">
                    <Globe className="h-5 w-5 text-blue-400 mr-2" />
                    <h3 className="font-semibold text-white">Public Read Access</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-2">
                    Allows anyone on the internet to read objects from your bucket.
                  </p>
                  <Badge variant="outline" className="text-orange-400 border-orange-400">
                    Use with caution
                  </Badge>
                </div>

                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-purple-400 mr-2" />
                    <h3 className="font-semibold text-white">IAM User Access</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-2">
                    Grants specific permissions to a particular IAM user.
                  </p>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Recommended
                  </Badge>
                </div>

                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                  <div className="flex items-center mb-2">
                    <Lock className="h-5 w-5 text-red-400 mr-2" />
                    <h3 className="font-semibold text-white">Cross-Account Access</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-2">
                    Allows users from another AWS account to access your bucket.
                  </p>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    Advanced
                  </Badge>
                </div>

                <div className="border border-white/20 rounded-lg p-4 bg-white/5">
                  <div className="flex items-center mb-2">
                    <Code className="h-5 w-5 text-indigo-400 mr-2" />
                    <h3 className="font-semibold text-white">Folder-Level Access</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-2">
                    Restricts access to specific folders within your bucket.
                  </p>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    Secure
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* S3 Actions Reference */}
          <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">S3 Actions Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-white/20">
                  <thead>
                    <tr className="bg-white/10">
                      <th className="border border-white/20 p-2 text-left text-white">Action</th>
                      <th className="border border-white/20 p-2 text-left text-white">Description</th>
                      <th className="border border-white/20 p-2 text-left text-white">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/20 p-2 font-mono text-sm text-white">s3:GetObject</td>
                      <td className="border border-white/20 p-2 text-white/80">Download/read objects</td>
                      <td className="border border-white/20 p-2 text-white/80">File downloads, website hosting</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-2 font-mono text-sm text-white">s3:PutObject</td>
                      <td className="border border-white/20 p-2 text-white/80">Upload/write objects</td>
                      <td className="border border-white/20 p-2 text-white/80">File uploads, backups</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-2 font-mono text-sm text-white">s3:ListBucket</td>
                      <td className="border border-white/20 p-2 text-white/80">List bucket contents</td>
                      <td className="border border-white/20 p-2 text-white/80">Directory browsing</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-2 font-mono text-sm text-white">s3:DeleteObject</td>
                      <td className="border border-white/20 p-2 text-white/80">Delete objects</td>
                      <td className="border border-white/20 p-2 text-white/80">File management, cleanup</td>
                    </tr>
                    <tr>
                      <td className="border border-white/20 p-2 font-mono text-sm text-white">s3:GetBucketLocation</td>
                      <td className="border border-white/20 p-2 text-white/80">Get bucket region</td>
                      <td className="border border-white/20 p-2 text-white/80">AWS CLI operations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Security Best Practices */}
          <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="mr-2 h-5 w-5 text-green-400" />
                Security Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Use Least Privilege Principle</h4>
                    <p className="text-white/70">Grant only the minimum permissions required for your use case.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Avoid Public Write Access</h4>
                    <p className="text-white/70">Never grant public write permissions unless absolutely necessary.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Use IP Restrictions</h4>
                    <p className="text-white/70">Limit access to specific IP addresses or CIDR blocks when possible.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Review Policies Regularly</h4>
                    <p className="text-white/70">Audit your bucket policies periodically to ensure they're still appropriate.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Enable CloudTrail Logging</h4>
                    <p className="text-white/70">Monitor access to your S3 buckets with AWS CloudTrail.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Conditions */}
          <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Policy Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">
                Conditions add extra security by specifying when a policy should apply:
              </p>
              
              <div className="space-y-3">
                <div className="bg-white/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">IP Address Restrictions</h4>
                  <code className="text-sm bg-white/20 p-1 rounded text-white">aws:SourceIp</code>
                  <p className="text-sm text-white/70 mt-1">Limit access to specific IP addresses or ranges.</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Time-based Access</h4>
                  <code className="text-sm bg-white/20 p-1 rounded text-white">aws:CurrentTime</code>
                  <p className="text-sm text-white/70 mt-1">Allow access only during specific time periods.</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">VPC Restrictions</h4>
                  <code className="text-sm bg-white/20 p-1 rounded text-white">aws:SourceVpc</code>
                  <p className="text-sm text-white/70 mt-1">Restrict access to specific VPCs.</p>
                </div>

                <div className="bg-white/10 p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">SSL/HTTPS Only</h4>
                  <code className="text-sm bg-white/20 p-1 rounded text-white">aws:SecureTransport</code>
                  <p className="text-sm text-white/70 mt-1">Require encrypted connections.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Common Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">Access Denied Errors</h4>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>Check that the principal ARN is correct</li>
                    <li>Verify the resource ARN matches your bucket and path</li>
                    <li>Ensure the action matches what you're trying to do</li>
                    <li>Check for conflicting deny policies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Policy Syntax Errors</h4>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>Validate JSON syntax using our policy explainer</li>
                    <li>Check for missing commas or brackets</li>
                    <li>Ensure all ARNs follow the correct format</li>
                    <li>Verify that Effect is either "Allow" or "Deny"</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Unexpected Public Access</h4>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>Review all policies on the bucket</li>
                    <li>Check bucket ACLs (Access Control Lists)</li>
                    <li>Verify Block Public Access settings</li>
                    <li>Use our policy explainer to understand access scope</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Docs;
