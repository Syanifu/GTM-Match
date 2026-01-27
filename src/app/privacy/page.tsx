import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 26, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Account Information</h3>
              <p>When you create an account, we collect your name, email address, username, and any profile information you choose to provide.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Content</h3>
              <p>We store the problems, solutions, and comments you post on the platform.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
              <p>We collect information about how you interact with the platform, including pages viewed, features used, and time spent.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Provide and improve our services</p>
            <p>• Send you important updates and notifications</p>
            <p>• Personalize your experience</p>
            <p>• Analyze platform usage and trends</p>
            <p>• Prevent fraud and abuse</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <p>• Service providers who help us operate the platform</p>
            <p>• When required by law or to protect our rights</p>
            <p>• With your consent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Access and download your data</p>
            <p>• Correct inaccurate information</p>
            <p>• Delete your account and data</p>
            <p>• Opt out of marketing communications</p>
            <p>• Control cookie preferences</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We implement appropriate technical and organizational measures to protect your data. However, no method
              of transmission over the internet is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@gtmmatch.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
