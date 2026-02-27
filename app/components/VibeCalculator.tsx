"use client";

import React, { useState, useEffect } from 'react';
import { Calculator, Zap, DollarSign, Clock } from 'lucide-react';

export default function VibeCalculator() {
  const [devHours, setDevHours] = useState(40);
  const [hourlyRate, setHourlyRate] = useState(150);
  const [aiEfficiency, setAiEfficiency] = useState(300); // 300% efficiency

  const [results, setResults] = useState({
    traditionalTime: 0,
    vibeTime: 0,
    traditionalCost: 0,
    vibeCost: 0,
    savings: 0
  });

  useEffect(() => {
    const traditionalTime = devHours;
    const vibeTime = Math.round((devHours / (aiEfficiency / 100)) * 10) / 10;
    const traditionalCost = traditionalTime * hourlyRate;
    const vibeCost = vibeTime * hourlyRate;
    const savings = traditionalCost - vibeCost;

    setResults({
      traditionalTime,
      vibeTime,
      traditionalCost,
      vibeCost,
      savings
    });
  }, [devHours, hourlyRate, aiEfficiency]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto my-20">
      <div className="bg-blue-600 p-8 text-white">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <Calculator className="w-8 h-8" /> Kalkulator ROI Vibe Codingu
        </h2>
        <p className="mt-2 text-blue-100">Oblicz ile czasu i pieniędzy zaoszczędzisz przechodząc na programowanie intencyjne.</p>
      </div>

      <div className="p-8 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-4 flex justify-between">
              Czas pracy tradycyjnej (godz/tydz): <span className="text-blue-600">{devHours}h</span>
            </label>
            <input
              type="range" min="1" max="100" value={devHours}
              onChange={(e) => setDevHours(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-4 flex justify-between">
              Stawka godzinowa (PLN): <span className="text-blue-600">{hourlyRate} zł</span>
            </label>
            <input
              type="range" min="50" max="1000" step="10" value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-4 flex justify-between">
              Wzrost efektywności AI: <span className="text-emerald-600">{aiEfficiency}%</span>
            </label>
            <input
              type="range" min="100" max="1000" step="50" value={aiEfficiency}
              onChange={(e) => setAiEfficiency(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
           <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Clock className="w-5 h-5" /></div>
                  <span className="text-sm font-medium text-slate-500">Czas z AI</span>
                </div>
                <span className="text-2xl font-bold text-slate-900">{results.vibeTime}h <span className="text-xs text-slate-400 font-normal">/tydz</span></span>
              </div>

              <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><DollarSign className="w-5 h-5" /></div>
                  <span className="text-sm font-medium text-slate-500">Koszt z AI</span>
                </div>
                <span className="text-2xl font-bold text-slate-900">{results.vibeCost.toLocaleString()} zł</span>
              </div>

              <div className="p-6 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider opacity-80">Twoje oszczędności</span>
                </div>
                <div className="text-4xl font-black">
                  {results.savings.toLocaleString()} zł <span className="text-sm font-normal opacity-70">/tydzień</span>
                </div>
                <p className="mt-4 text-sm text-emerald-100 font-medium">
                  Rocznie oszczędzasz ok. <span className="underline">{(results.savings * 48).toLocaleString()} zł</span> oraz <span className="underline">{(results.traditionalTime - results.vibeTime) * 48} godzin</span> czasu.
                </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
