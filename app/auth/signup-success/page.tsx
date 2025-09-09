import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Risk Prediction</h1>
            <p className="text-gray-600">Healthcare Risk Assessment Platform</p>
          </div>
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Account Created Successfully!</CardTitle>
              <CardDescription>Please check your email to verify your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  We've sent a verification email to your inbox. Please click the verification link to activate your
                  account and access the platform.
                </p>
                <p className="text-xs text-muted-foreground">
                  Didn't receive the email? Check your spam folder or contact your system administrator.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
