import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 26, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              By accessing and using GTM Match, you accept and agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>• You must provide accurate and complete information when creating an account</p>
            <p>• You are responsible for maintaining the security of your account</p>
            <p>• You must be at least 18 years old to create an account</p>
            <p>• One person may not maintain more than one account</p>
            <p>• You may not transfer your account to another person</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Your Content</h3>
              <p>You retain ownership of content you post, but grant us a license to use, display, and distribute it on our platform.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Prohibited Content</h3>
              <p>You may not post content that:</p>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• Violates laws or regulations</li>
                <li>• Infringes on intellectual property rights</li>
                <li>• Contains malware or viruses</li>
                <li>• Is spam, fraudulent, or misleading</li>
                <li>• Harasses or threatens others</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>You agree not to:</p>
            <p>• Violate any laws or regulations</p>
            <p>• Impersonate others or provide false information</p>
            <p>• Interfere with the platform's operation</p>
            <p>• Attempt to gain unauthorized access</p>
            <p>• Scrape or harvest data without permission</p>
            <p>• Use the platform for commercial purposes without authorization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              The platform, including its design, code, and content (excluding user-generated content), is owned by
              GTM Match and protected by intellectual property laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Disclaimers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>
              The platform is provided "as is" without warranties of any kind. We do not guarantee the accuracy,
              completeness, or usefulness of any content on the platform.
            </p>
            <p>
              Solutions and advice shared on the platform are user-generated and should not be considered professional advice.
              Always consult with qualified professionals before making business decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We are not liable for any indirect, incidental, special, or consequential damages arising from your use
              of the platform, including business losses or data loss.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Termination</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We may suspend or terminate your account at any time for violations of these terms or for any other reason.
              You may terminate your account at any time through your account settings.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              We may update these terms at any time. Continued use of the platform after changes constitutes
              acceptance of the new terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Contact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              For questions about these Terms of Service, contact us at legal@gtmmatch.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
