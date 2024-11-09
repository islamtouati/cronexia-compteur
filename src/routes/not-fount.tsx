import { AlertCircle, ChevronLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center space-x-2">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <CardTitle className="text-3xl font-bold">404</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xl font-semibold">Page Not Found</p>
          <p className="mt-2 text-muted-foreground">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link to="/">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
