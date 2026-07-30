import React from "react";
import { EmiCalculator, PriceTrends, AreaConverter } from "@/src/components/ui/Tools";

const ToolsPage: React.FC = () => (
  <div className="py-24 px-4 md:px-8 max-w-7xl mx-auto min-h-[70vh]">
    <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tighter">
      Property Tools
    </h1>
    <p className="text-gray-500 text-xl mb-12">Area converter, EMI calculator & price trends.</p>
    <div className="space-y-10">
      <AreaConverter />
      <EmiCalculator />
      <PriceTrends />
    </div>
  </div>
);

export default ToolsPage;
