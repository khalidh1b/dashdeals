import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, RefreshCw, ShoppingCart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/component/ui/alert";
import { Button } from "@/component/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";

const PaymentCanceled = () => {
    return (
        <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
        <Card className="w-full max-w-md mx-auto">
            <PaymentCanceledHeader/>
            <PaymentCanceledContent/>
            <PaymentCanceledFooter/>
        </Card>
    </div>
    );
};

export default PaymentCanceled;

const PaymentCanceledHeader = () => {
    return (
        <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Payment Canceled</CardTitle>
        </CardHeader>
    )
};

const PaymentCanceledFooter = () => {
    return (
        <CardFooter className="flex flex-col space-y-3">
            <Button className="w-full" asChild>
                <Link to="/checkout">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Payment Again
                </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
                <Link to="/carts">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Return to Cart
                </Link>
            </Button>
            <Button variant="ghost" className="w-full" asChild>
                <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Homepage
                </Link>
            </Button>
        </CardFooter>
    )
};

const PaymentCanceledContent = () => {
    return (
        <CardContent className="space-y-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Payment Not Completed</AlertTitle>
                <AlertDescription>
                Your payment was canceled and no charges have been made to your account.
                </AlertDescription>
            </Alert>
            <div className="text-center text-muted-foreground">
                <p>
                If you experienced any issues during checkout or have questions about your order, please contact our
                customer support team.
                </p>
            </div>
        </CardContent>
    )
};