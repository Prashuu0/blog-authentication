"use client"

import React, { useState } from "react";
import { CreditCard, Smartphone, Building, Wallet, Shield, Gift, Clock, Check, Zap, Star, Award, Sparkles, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "upi" | "netbanking" | "wallet" | "emi" | "cod";
  icon: string;
  description: string;
  offers?: string[];
  processingFee?: number;
  instantDiscount?: number;
  emiOptions?: {
    months: number;
    monthlyAmount: number;
    totalAmount: number;
  }[];
  popularity?: number;
  security?: string;
  speed?: string;
}

interface PaymentMethodsProps {
  amount: number;
  onPaymentSelect: (method: PaymentMethod) => void;
  selectedMethod?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    name: "UPI",
    type: "upi",
    icon: "📱",
    description: "Pay using UPI apps like Google Pay, PhonePe, Paytm",
    offers: ["Instant discount up to ₹100", "No processing fee", "Quick & secure"],
    instantDiscount: 100,
    popularity: 95,
    security: "High",
    speed: "Instant",
  },
  {
    id: "credit-card",
    name: "Credit/Debit Cards",
    type: "card",
    icon: "💳",
    description: "Visa, Mastercard, RuPay, American Express",
    offers: ["5% cashback on credit cards", "No cost EMI available", "Reward points"],
    processingFee: 0,
    popularity: 85,
    security: "Very High",
    speed: "Fast",
  },
  {
    id: "netbanking",
    name: "Net Banking",
    type: "netbanking",
    icon: "🏦",
    description: "Pay using your bank's internet banking",
    offers: ["Instant discount up to ₹200", "Secure payment", "Bank offers"],
    instantDiscount: 200,
    popularity: 70,
    security: "Very High",
    speed: "Fast",
  },
  {
    id: "wallets",
    name: "Digital Wallets",
    type: "wallet",
    icon: "👛",
    description: "Paytm, PhonePe, Amazon Pay, Google Pay",
    offers: ["Cashback up to ₹50", "Quick checkout", "Wallet balance"],
    instantDiscount: 50,
    popularity: 80,
    security: "High",
    speed: "Instant",
  },
  {
    id: "emi",
    name: "EMI Options",
    type: "emi",
    icon: "⏰",
    description: "No cost EMI on credit cards and debit cards",
    offers: ["0% interest", "Flexible tenure", "Easy monthly payments"],
    emiOptions: [
      { months: 3, monthlyAmount: 3333, totalAmount: 10000 },
      { months: 6, monthlyAmount: 1667, totalAmount: 10000 },
      { months: 9, monthlyAmount: 1111, totalAmount: 10000 },
    ],
    popularity: 75,
    security: "High",
    speed: "Instant",
  },
  {
    id: "cod",
    name: "Cash on Delivery",
    type: "cod",
    icon: "💰",
    description: "Pay when you receive your order",
    offers: ["No advance payment", "Pay on delivery", "100% secure"],
    processingFee: 50,
    popularity: 60,
    security: "Medium",
    speed: "Slow",
  },
];

const banks = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "Bank of India",
];

const upiApps = [
  { name: "Google Pay", icon: "🔵", color: "bg-blue-500" },
  { name: "PhonePe", icon: "🟣", color: "bg-purple-500" },
  { name: "Paytm", icon: "🔵", color: "bg-blue-600" },
  { name: "Amazon Pay", icon: "🟠", color: "bg-orange-500" },
  { name: "BHIM", icon: "🔵", color: "bg-blue-700" },
  { name: "Mobikwik", icon: "🟡", color: "bg-yellow-500" },
];

export default function PaymentMethods({ amount, onPaymentSelect, selectedMethod }: PaymentMethodsProps) {
  const [selectedPayment, setSelectedPayment] = useState(selectedMethod || "");
  const [showCardForm, setShowCardForm] = useState(false);
  const [showUPIForm, setShowUPIForm] = useState(false);
  const [showNetBanking, setShowNetBanking] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");
  const [showCardNumber, setShowCardNumber] = useState(false);

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPayment(methodId);
    const method = paymentMethods.find(m => m.id === methodId);
    if (method) {
      onPaymentSelect(method);
    }
  };

  const getSelectedMethod = () => paymentMethods.find(m => m.id === selectedPayment);

  const calculateFinalAmount = () => {
    const method = getSelectedMethod();
    if (!method) return amount;

    let finalAmount = amount;
    
    if (method.processingFee) {
      finalAmount += method.processingFee;
    }
    
    if (method.instantDiscount) {
      finalAmount = Math.max(0, finalAmount - method.instantDiscount);
    }
    
    return finalAmount;
  };

  const getSecurityColor = (security: string | undefined) => {
    switch (security) {
      case "Very High": return "text-green-600";
      case "High": return "text-blue-600";
      case "Medium": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const getSpeedColor = (speed: string | undefined) => {
    switch (speed) {
      case "Instant": return "text-green-600";
      case "Fast": return "text-blue-600";
      case "Slow": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Secure Payment Gateway
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Choose your preferred payment method and enjoy exclusive offers!</p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Cart</span>
            <span>Payment</span>
            <span>Confirmation</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Payment Methods List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Payment Options</h2>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </Badge>
          </div>

          <RadioGroup value={selectedPayment} onValueChange={handlePaymentSelect}>
            {paymentMethods.map((method, index) => (
              <Card 
                key={method.id} 
                className={`relative cursor-pointer transition-all duration-500 rounded-2xl overflow-hidden group
                  ${selectedPayment === method.id 
                    ? "border-l-8 border-blue-600 shadow-2xl bg-gradient-to-r from-blue-50 to-indigo-50"
                    : "border-l-4 border-transparent hover:border-blue-300 hover:shadow-xl bg-white"}
                  hover:scale-[1.015] active:scale-100
                `}
                onClick={() => handlePaymentSelect(method.id)}
                style={{ minHeight: 160 }}
              >
                <CardContent className="p-7">
                  <div className="flex items-start space-x-5">
                    <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                    {/* Icon with colored bg */}
                    <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-md text-3xl
                      ${selectedPayment === method.id ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-gray-100 text-blue-600'}
                    `}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="flex items-center space-x-2">
                            <Check className="h-5 w-5 text-blue-600" />
                            <span className="text-sm text-blue-600 font-medium">Selected</span>
                          </div>
                        )}
                      </div>
                      {/* Popularity Bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Popularity</span>
                          <span>{method.popularity}%</span>
                        </div>
                        <Progress value={method.popularity} className="h-1" />
                      </div>
                      {/* Features */}
                      <div className="flex items-center space-x-4 mb-2">
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3 text-green-600" />
                          <span className={`text-xs font-medium ${getSecurityColor(method.security)}`}>{method.security} Security</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="h-3 w-3 text-blue-600" />
                          <span className={`text-xs font-medium ${getSpeedColor(method.speed)}`}>{method.speed}</span>
                        </div>
                      </div>
                      {/* Offers */}
                      {method.offers && (
                        <div className="space-y-1">
                          {method.offers.map((offer, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="p-1 bg-green-100 rounded-full">
                                <Gift className="h-3 w-3 text-green-600" />
                              </div>
                              <span className="text-sm text-green-700 font-medium">{offer}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* EMI Options */}
                      {method.emiOptions && (
                        <div className="mt-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                            <Award className="h-4 w-4 mr-2 text-purple-600" />
                            EMI Options
                          </h4>
                          <div className="flex flex-wrap gap-3 justify-center items-stretch">
                            {method.emiOptions.map((option, index) => (
                              <div key={index} className="flex flex-col justify-between items-center min-w-[90px] max-w-[110px] w-full bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 transition-colors shadow-sm p-2 md:p-3 text-center">
                                <div className="text-lg md:text-xl font-extrabold text-purple-600 break-words">₹{option.monthlyAmount}</div>
                                <div className="text-xs text-gray-600 mt-1">{option.months} months</div>
                                <div className="text-xs text-green-600 font-medium mt-1">No Cost</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>

        {/* Payment Summary */}
        <div className="space-y-8">
          <Card className="shadow-2xl border border-blue-100 bg-white/60 backdrop-blur-md rounded-3xl px-2 py-2 md:px-0 md:py-0" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'}}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0 pb-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Amount:</span>
                  <span className="font-semibold">₹{amount.toFixed(2)}</span>
                </div>
                {getSelectedMethod()?.processingFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-semibold text-red-600">+₹{getSelectedMethod()?.processingFee}</span>
                  </div>
                )}
                {getSelectedMethod()?.instantDiscount && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      <Gift className="h-4 w-4 mr-1" />
                      Instant Discount:
                    </span>
                    <span className="font-bold">-₹{getSelectedMethod()?.instantDiscount}</span>
                  </div>
                )}
              </div>
              <div className="border-t-2 border-blue-100 pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">₹{calculateFinalAmount().toFixed(2)}</span>
                </div>
                {getSelectedMethod()?.instantDiscount && (
                  <div className="text-sm text-green-600 mt-1">
                    You save ₹{getSelectedMethod()?.instantDiscount}!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <Card className="bg-green-50/60 border border-green-200/60 shadow-xl rounded-3xl backdrop-blur-md flex flex-col items-center justify-center py-6 px-2 md:px-0" style={{boxShadow: '0 8px 32px 0 rgba(16, 185, 129, 0.10)'}}>
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="flex flex-col items-center justify-center mb-2">
                <div className="p-4 bg-green-100 rounded-full mb-2 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-bold text-green-800 text-lg text-center">Bank-Grade Security</h4>
                <p className="text-sm text-green-700 text-center max-w-[180px]">256-bit SSL encryption with PCI DSS compliance</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          {selectedPayment && (
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-blue-600" />
                  {getSelectedMethod()?.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedPayment === "credit-card" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Input 
                        placeholder="1234 5678 9012 3456" 
                        className="text-center text-lg tracking-wider pr-12" 
                        type={showCardNumber ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showCardNumber ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVV" type="password" />
                    </div>
                    <Input placeholder="Card Holder Name" />
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Lock className="h-3 w-3" />
                      <span>Your card details are encrypted and secure</span>
                    </div>
                  </div>
                )}

                {selectedPayment === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-3 block">Select UPI App</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {upiApps.map((app) => (
                          <button
                            key={app.name}
                            onClick={() => setSelectedUPI(app.name)}
                            className={`p-4 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105 ${
                              selectedUPI === app.name
                                ? "border-blue-500 bg-blue-50 shadow-lg"
                                : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                            }`}
                          >
                            <div className="text-3xl mb-2">{app.icon}</div>
                            <div className="text-sm font-bold">{app.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Input placeholder="UPI ID (e.g., user@upi)" className="text-center" />
                  </div>
                )}

                {selectedPayment === "netbanking" && (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-bold text-gray-700 mb-3 block">Select Bank</Label>
                      <select 
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Choose your bank</option>
                        {banks.map((bank) => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Lock className="h-5 w-5 mr-2" />
                  Pay ₹{calculateFinalAmount().toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Payment Security Info */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Bank-Grade Security</h4>
                <p className="text-sm text-gray-600">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Instant Processing</h4>
                <p className="text-sm text-gray-600">Real-time payment processing</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Best Offers</h4>
                <p className="text-sm text-gray-600">Exclusive discounts & cashback</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Trusted by Millions</h4>
                <p className="text-sm text-gray-600">Secure & reliable payments</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 