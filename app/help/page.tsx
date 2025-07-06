"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function HelpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center">Help Center</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Need help? Find answers to common questions below or reach out to our support team anytime!
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq1">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              You can track your order status from your profile's Orders section. We'll also email you updates at every step!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq2">
            <AccordionTrigger>How do I return a product?</AccordionTrigger>
            <AccordionContent>
              Visit the Returns page or your Orders section, select the item, and follow the return instructions. Our team will guide you through the process.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq3">
            <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
            <AccordionContent>
              Email us at <span className="text-blue-600">support@shophub.com</span> or use the Contact Us page. We're here 24/7!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <style jsx>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
      `}</style>
    </div>
  )
} 