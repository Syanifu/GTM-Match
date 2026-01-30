import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GuidelinesPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Community Guidelines</h1>
          <p className="text-xl text-muted-foreground">
            Help us maintain a helpful, respectful community
          </p>
        </div>

        {/* Posting Problems */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Posting Problems
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">DO</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Provide specific context (ARR stage, company size, ACV, GTM motion, current metrics)</li>
                <li>• Share what you've already tried and the results</li>
                <li>• Include concrete numbers when possible</li>
                <li>• Be clear about your timeline and constraints</li>
                <li>• Choose appropriate tags and categories</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-red-600">DON'T</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Post vague or overly broad questions</li>
                <li>• Ask for free consulting without providing context</li>
                <li>• Duplicate existing problems without adding new information</li>
                <li>• Include confidential company information</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Submitting Solutions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Submitting Solutions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-green-600">DO</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Share detailed implementation steps</li>
                <li>• Include before/after metrics when possible</li>
                <li>• List tools, budget, and timeline required</li>
                <li>• Explain what worked and what didn't</li>
                <li>• Be honest about difficulty and limitations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-red-600">DON'T</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Submit generic advice without specific tactics</li>
                <li>• Promote your product/service without disclosure</li>
                <li>• Exaggerate results or make unverifiable claims</li>
                <li>• Copy solutions from other sources without attribution</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Community Behavior */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Community Behavior
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Be Respectful</h3>
              <p className="text-sm text-muted-foreground">
                Treat all community members with respect. Constructive criticism is welcome, but personal attacks,
                harassment, or discrimination will not be tolerated.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Stay Professional</h3>
              <p className="text-sm text-muted-foreground">
                Keep discussions focused on B2B SaaS GTM challenges and solutions. Avoid off-topic conversations, spam,
                or excessive self-promotion.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Give Credit</h3>
              <p className="text-sm text-muted-foreground">
                When sharing ideas or tactics from others, give proper attribution. Plagiarism undermines community trust.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Enforcement */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              Enforcement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Violations of these guidelines may result in:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Content removal</li>
              <li>• Temporary suspension</li>
              <li>• Permanent ban for severe or repeated violations</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              If you see content that violates these guidelines, please report it using the report button.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
