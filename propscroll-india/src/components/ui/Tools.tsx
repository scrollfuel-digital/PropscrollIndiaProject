
import React from 'react';
import { Calculator, TrendingUp, Info, PieChart, Repeat, Maximize } from 'lucide-react';

export const AreaConverter: React.FC = () => {
  const [sqft, setSqft] = React.useState<number>(1000);
  
  const guntha = (sqft / 1089).toFixed(3);
  const acre = (sqft / 43560).toFixed(4);
  const sqyard = (sqft / 9).toFixed(2);
  const sqmtr = (sqft / 10.764).toFixed(2);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center space-x-4 mb-10">
        <div className="p-3 bg-[#008C99] rounded-2xl text-white">
          <Repeat size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#0F2540]">Nagpur Land Unit Converter</h2>
          <p className="text-gray-400 text-sm font-medium">Quickly convert between common Vidarbha land measurements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Enter Square Feet</label>
            <div className="relative">
              <input 
                type="number" 
                value={sqft} 
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full bg-white border-2 border-transparent focus:border-[#008C99] rounded-2xl p-5 text-2xl font-black outline-none transition-all shadow-sm"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-[#0F2540]/30">Sq. Ft.</span>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 text-gray-400 text-xs italic font-medium bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <Info size={16} className="text-blue-400 flex-shrink-0" />
            <p>In Nagpur region, 1 Guntha is standardly measured as 1089 Square Feet. Ready Reckoner rates are usually published per Sq. Mtr.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Guntha', val: guntha, icon: <Maximize size={18} />, color: 'text-orange-600' },
            { label: 'Acre', val: acre, icon: <TrendingUp size={18} />, color: 'text-green-600' },
            { label: 'Sq. Yard', val: sqyard, icon: <Repeat size={18} />, color: 'text-blue-600' },
            { label: 'Sq. Mtr', val: sqmtr, icon: <Calculator size={18} />, color: 'text-purple-600' }
          ].map((item, i) => (
            <div key={i} className="bg-[#0F2540] p-6 rounded-[2rem] text-white flex flex-col justify-center border border-white/5 shadow-xl">
               <div className="flex items-center space-x-2 text-white/30 mb-2">
                 {item.icon}
                 <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
               </div>
               <div className="text-3xl font-black tracking-tighter truncate">{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const EmiCalculator: React.FC = () => {
  const [amount, setAmount] = React.useState(5000000);
  const [tenure, setTenure] = React.useState(20);
  const [rate, setRate] = React.useState(8.5);

  const monthlyRate = rate / (12 * 100);
  const totalMonths = tenure * 12;
  const emi = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - amount;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center space-x-4 mb-10">
        <div className="p-3 bg-[#D63528] rounded-2xl text-white">
          <Calculator size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#0F2540]">Home Loan EMI Calculator</h2>
          <p className="text-gray-400 text-sm font-medium">Plan your dream home in Nagpur with accuracy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex justify-between font-black text-[#0F2540] text-sm uppercase tracking-widest">
              <span>Loan Amount</span>
              <span className="text-[#008C99]">₹ {(amount/100000).toFixed(1)} Lakhs</span>
            </div>
            <input 
              type="range" min="500000" max="50000000" step="100000" 
              value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#D63528]" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between font-black text-[#0F2540] text-sm uppercase tracking-widest">
              <span>Tenure (Years)</span>
              <span className="text-[#008C99]">{tenure} Years</span>
            </div>
            <input 
              type="range" min="1" max="30" step="1" 
              value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#D63528]" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between font-black text-[#0F2540] text-sm uppercase tracking-widest">
              <span>Interest Rate (%)</span>
              <span className="text-[#008C99]">{rate}%</span>
            </div>
            <input 
              type="range" min="5" max="15" step="0.1" 
              value={rate} onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#D63528]" 
            />
          </div>
        </div>

        <div className="bg-[#0F2540] rounded-[2rem] p-8 text-white flex flex-col justify-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#008C99]/20 blur-3xl rounded-full" />
          <div className="relative z-10">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-2 block">Monthly EMI</span>
            <div className="text-6xl font-black text-[#FCC02E] mb-6 tracking-tighter">₹ {emi.toLocaleString('en-IN')}</div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
              <div>
                <span className="text-[10px] uppercase font-black text-white/30 block mb-1">Principal</span>
                <span className="text-sm font-bold">₹ {(amount/100000).toFixed(1)} L</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-black text-white/30 block mb-1">Interest</span>
                <span className="text-sm font-bold">₹ {(totalInterest/100000).toFixed(1)} L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PriceTrends: React.FC = () => {
  const trends = [
    { area: 'Wardha Road', growth: '+14.2%', avg: '₹ 3,200/sqft', color: 'bg-[#FCC02E]' },
    { area: 'Dharampeth', growth: '+8.5%', avg: '₹ 11,500/sqft', color: 'bg-[#008C99]' },
    { area: 'Manish Nagar', growth: '+11.0%', avg: '₹ 4,800/sqft', color: 'bg-[#D63528]' },
    { area: 'Besa-Pipla', growth: '+18.4%', avg: '₹ 2,900/sqft', color: 'bg-[#0F2540]' },
    { area: 'Hingna Road', growth: '+12.1%', avg: '₹ 2,400/sqft', color: 'bg-[#008C99]' },
    { area: 'Butibori', growth: '+9.5%', avg: '₹ 1,100/sqft', color: 'bg-[#FCC02E]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {trends.map((t, i) => (
        <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl group hover:-translate-y-2 transition-all duration-500">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 ${t.color}`}>
            <TrendingUp size={24} />
          </div>
          <h4 className="text-xl font-black text-[#0F2540] mb-1">{t.area}</h4>
          <div className="text-2xl font-black text-[#008C99] mb-4">{t.growth} <span className="text-[10px] text-gray-400 font-bold tracking-widest">YOY</span></div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Avg Price: {t.avg}</p>
        </div>
      ))}
    </div>
  );
};
