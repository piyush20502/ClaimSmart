"use client";
import { useState } from 'react';
import ClaimSmartLanding from '@/components//dashboard/ClaimSmartLanding';
import InsuranceRiskDashboard from '@/components/dashboard/InsuranceRiskDashboard';

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {!showDashboard ? (
        <ClaimSmartLanding onGetStarted={() => setShowDashboard(true)} />
      ) : (
        <div className="p-4 md:p-8">
          <InsuranceRiskDashboard />
          <button 
            onClick={() => setShowDashboard(false)}
            className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}