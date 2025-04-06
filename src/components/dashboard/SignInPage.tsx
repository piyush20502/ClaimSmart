import React from 'react';
import { Shield, User } from 'lucide-react';

const SignInPage = ({ onSelectUserType }: { onSelectUserType: (type: 'client' | 'provider') => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-8">Welcome to ClaimSmart</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelectUserType('provider')}
            className="w-full p-6 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex flex-col items-center"
          >
            <Shield className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold mb-1">Insurance Provider</h3>
            <p className="text-slate-600 text-center">
              I'm an insurance company representative managing policies and driver risks
            </p>
          </button>
          
          <button
            onClick={() => onSelectUserType('client')}
            className="w-full p-6 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex flex-col items-center"
          >
            <User className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="text-lg font-bold mb-1">Policyholder</h3>
            <p className="text-slate-600 text-center">
              I'm a driver or fleet manager viewing my risk profile and premium details
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;