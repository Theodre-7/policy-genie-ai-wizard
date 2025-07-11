
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { Globe, User, RefreshCw, Folder, MapPin, Upload, Eye, FileText, ChevronDown, Copy, Download, Play, Sparkles, Link as LinkIcon, AlertTriangle } from "lucide-react";

const PolicyGenerator = () => {
  const { toast } = useToast();
  const [accessType, setAccessType] = useState("public-read");
  const [bucketName, setBucketName] = useState("");
  const [folderPrefix, setFolderPrefix] = useState("");
  const [principalArn, setPrincipalArn] = useState("");
  const [permissions, setPermissions] = useState<string[]>(["GetObject"]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [timeLimited, setTimeLimited] = useState(false);
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [enableLogging, setEnableLogging] = useState(false);
  const [generatedPolicy, setGeneratedPolicy] = useState("");

  const shortcuts = [
    { icon: <Globe className="h-4 w-4" />, label: "Public Access", type: "public-read" },
    { icon: <User className="h-4 w-4" />, label: "Specific IAM User", type: "iam-user" },
    { icon: <RefreshCw className="h-4 w-4" />, label: "Cross-Account Access", type: "cross-account" },
    { icon: <Folder className="h-4 w-4" />, label: "Folder-Level Access", type: "folder-specific" },
    { icon: <MapPin className="h-4 w-4" />, label: "IP/VPC Restrictions", type: "ip-based" },
    { icon: <Upload className="h-4 w-4" />, label: "Upload-only Policy", type: "upload-only" },
    { icon: <Eye className="h-4 w-4" />, label: "Read-only Policy", type: "read-only" },
    { icon: <FileText className="h-4 w-4" />, label: "Logging Policy", type: "logging" }
  ];

  const permissionOptions = [
    { id: "GetObject", label: "GetObject (Read files)" },
    { id: "PutObject", label: "PutObject (Upload files)" },
    { id: "ListBucket", label: "ListBucket (List contents)" },
    { id: "DeleteObject", label: "DeleteObject (Delete files)" },
    { id: "GetBucketLocation", label: "GetBucketLocation" },
    { id: "*", label: "All Actions (Full access)" }
  ];

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setPermissions([...permissions, permission]);
    } else {
      setPermissions(permissions.filter(p => p !== permission));
    }
  };

  const generatePolicy = () => {
    const policy = {
      Version: "2012-10-17",
      Statement: [{
        Sid: "GeneratedPolicy",
        Effect: "Allow",
        Principal: accessType === "public-read" ? "*" : { AWS: principalArn },
        Action: permissions.map(p => p === "*" ? "s3:*" : `s3:${p}`),
        Resource: [
          `arn:aws:s3:::${bucketName}${folderPrefix ? `/${folderPrefix}` : ""}`,
          `arn:aws:s3:::${bucketName}${folderPrefix ? `/${folderPrefix}/*` : "/*"}`
        ],
        ...(ipWhitelist && {
          Condition: {
            IpAddress: {
              "aws:SourceIp": ipWhitelist.split(",").map(ip => ip.trim())
            }
          }
        })
      }]
    };

    setGeneratedPolicy(JSON.stringify(policy, null, 2));
    toast({
      title: "Policy Generated!",
      description: "Your S3 bucket policy has been generated successfully."
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPolicy);
    toast({
      title: "Copied!",
      description: "Policy copied to clipboard."
    });
  };

  const downloadPolicy = () => {
    const blob = new Blob([generatedPolicy], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bucketName || "s3"}-policy.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">S3 Policy Generator</h1>
          <p className="text-white/80">Create secure S3 bucket policies with our AI-powered tool</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Shortcuts */}
          <div className="lg:col-span-3">
            <Card className="sticky top-24 border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-lg text-white">Policy Shortcuts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {shortcuts.map((shortcut, index) => (
                  <Button
                    key={index}
                    variant={accessType === shortcut.type ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      accessType === shortcut.type 
                        ? "bg-white/20 text-white hover:bg-white/30" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setAccessType(shortcut.type)}
                  >
                    {shortcut.icon}
                    <span className="ml-2">{shortcut.label}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Policy Configurator */}
          <div className="lg:col-span-6 space-y-6">
            {/* AWS Account Connection */}
            <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <div>
                      <h3 className="font-medium text-white">AWS Account Required</h3>
                      <p className="text-sm text-white/70">Connect your AWS account to proceed</p>
                    </div>
                  </div>
                  <Button variant="default" className="bg-white/20 hover:bg-white/30 text-white border border-white/20">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Connect AWS Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Access Type */}
            <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">1. Access Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={accessType} onValueChange={setAccessType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public-read" id="public-read" />
                    <Label htmlFor="public-read" className="text-white">Public Read Access</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="iam-user" id="iam-user" />
                    <Label htmlFor="iam-user" className="text-white">Specific IAM User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cross-account" id="cross-account" />
                    <Label htmlFor="cross-account" className="text-white">Cross Account Access</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="folder-specific" id="folder-specific" />
                    <Label htmlFor="folder-specific" className="text-white">Folder-Specific Access</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Bucket & Resource Info */}
            <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">2. Bucket & Resource Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bucket-name" className="text-white">Bucket Name *</Label>
                  <Input
                    id="bucket-name"
                    placeholder="my-s3-bucket"
                    value={bucketName}
                    onChange={(e) => setBucketName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="folder-prefix" className="text-white">Folder/Key Prefix (Optional)</Label>
                  <Input
                    id="folder-prefix"
                    placeholder="logs/ or uploads/images/"
                    value={folderPrefix}
                    onChange={(e) => setFolderPrefix(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                
                {(accessType === "iam-user" || accessType === "cross-account") && (
                  <div>
                    <Label htmlFor="principal-arn" className="text-white">IAM Principal ARN *</Label>
                    <Input
                      id="principal-arn"
                      placeholder="arn:aws:iam::123456789012:user/username"
                      value={principalArn}
                      onChange={(e) => setPrincipalArn(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Permissions Selector */}
            <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">3. Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissionOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={permissions.includes(option.id)}
                        onCheckedChange={(checked) => handlePermissionChange(option.id, checked === true)}
                      />
                      <Label htmlFor={option.id} className="text-sm text-white">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card className="border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-white/10">
                    <CardTitle className="flex items-center justify-between text-white">
                      4. Advanced Options
                      <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
                    </CardTitle>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="time-limited"
                        checked={timeLimited}
                        onCheckedChange={(checked) => setTimeLimited(checked === true)}
                      />
                      <Label htmlFor="time-limited" className="text-white">Time-limited access</Label>
                    </div>
                    
                    <div>
                      <Label htmlFor="ip-whitelist" className="text-white">IP Whitelist (comma-separated)</Label>
                      <Input
                        id="ip-whitelist"
                        placeholder="192.168.1.0/24, 10.0.0.0/8"
                        value={ipWhitelist}
                        onChange={(e) => setIpWhitelist(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-logging"
                        checked={enableLogging}
                        onCheckedChange={(checked) => setEnableLogging(checked === true)}
                      />
                      <Label htmlFor="enable-logging" className="text-white">Enable CloudTrail logging</Label>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={generatePolicy}
              className="w-full bg-gradient-to-r from-purple-600 to-black hover:from-purple-700 hover:to-gray-900 text-white text-lg py-3 rounded-2xl backdrop-blur-sm border border-white/20"
              disabled={!bucketName}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Policy
            </Button>
          </div>

          {/* Right Panel - Live Preview */}
          <div className="lg:col-span-3">
            <Card className="sticky top-24 border-0 bg-white/10 backdrop-blur-md border border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Live Policy Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {generatedPolicy ? (
                  <div className="space-y-4">
                    <Textarea
                      value={generatedPolicy}
                      readOnly
                      className="min-h-[300px] font-mono text-xs bg-black/20 text-green-400 border-white/20"
                    />
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Clipboard
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadPolicy}
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download JSON
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Simulate in AWS
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Configure your policy settings and click "Generate Policy" to see the JSON preview.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyGenerator;
