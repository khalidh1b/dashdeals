import { getPaymentSuccessParams } from "@/lib/getPaymentSuccessParams";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronLeft, ShoppingBag } from "lucide-react";
import PropTypes from 'prop-types';

import { Button } from "@/component/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";

const PaymentSuccess = () => {
    const { 
        amount,  
        tran_id 
    } = getPaymentSuccessParams();

    return (
        <div className="min-h-screen dark:bg-[#000000] bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <PaymentSuccessHeader/>
            <PaymentSuccessContent 
              tran_id={tran_id} 
              amount={amount}
            />
            <PaymentSuccessFooter/>
          </Card>
      </div>
    );
};

export default PaymentSuccess;

const PaymentSuccessHeader = () => {
  return (
    <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-700">Payment Successful!</CardTitle>
        <CardDescription>Your order has been confirmed</CardDescription>
    </CardHeader>
  )
};

const PaymentSuccessContent = ({ tran_id, amount }) => {
  return (
    <CardContent className="space-y-4">
        <div className="border rounded-lg p-4 dark:bg-[#0A0A0A] bg-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Order ID:</span>
            <span className=" text-right">{tran_id}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-gray-800 font-semibold">Total Amount:</span>
            <span className="text-xl font-bold text-green-700">{amount}</span>
          </div>
        </div>
    </CardContent>
  )
};

const PaymentSuccessFooter = () => {
  return (
    <CardFooter className="flex flex-col space-y-2">
      <Button asChild className="w-full">
        <Link to="/myorders">
          <ShoppingBag className="mr-2 h-4 w-4" />
          View Order Details
        </Link>
      </Button>
      <Button asChild className="w-full">
        <Link to="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Return to Shop
        </Link>
      </Button>
    </CardFooter>
  )
};

PaymentSuccessContent.propTypes = {
  tran_id: PropTypes.string,
  amount: PropTypes.string
};