import React, { useState, useEffect } from 'react';
import { Car, Shield, BarChart2, Users, Activity, Bot, Download, ArrowRight, Calendar, X, Clipboard, Check } from 'lucide-react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const ClaimSmartLanding = ({ onGetStarted }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoType, setDemoType] = useState("standard");
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
const [isMuted, setIsMuted] = useState(false);

  // Animation timing for features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 5);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  // Animation for scroll reveal
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.reveal-section');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
          setIsVisible(prev => ({...prev, [section.id]: true}));
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Demo request function
  const handleRequestDemo = () => {
    setShowDemoModal(true);
  };

  // Copy invite link
  const handleCopyInvite = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dashboard features
  const features = [
    {
      title: "Real-time Risk Assessment",
      description: "Monitor driver risk scores with advanced analytics that update in real-time.",
      icon: <Activity className="w-12 h-12 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Driver Performance Metrics",
      description: "Track speed, braking, acceleration, and time patterns for comprehensive risk analysis.",
      icon: <Car className="w-12 h-12 text-green-500" />,
      color: "bg-green-50"
    },
    {
      title: "Premium Calculator",
      description: "Dynamic premium calculation based on personalized risk profiles.",
      icon: <BarChart2 className="w-12 h-12 text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      title: "AI-Powered Insights",
      description: "Generate risk summaries, premium analyses, and coaching tips powered by AI.",
      icon: <Bot className="w-12 h-12 text-red-500" />,
      color: "bg-red-50"
    },
    {
      title: "Fleet Management",
      description: "Monitor your entire driver fleet with categorized risk distribution charts.",
      icon: <Users className="w-12 h-12 text-amber-500" />,
      color: "bg-amber-50"
    }
  ];

  // Demo options
  const demoOptions = [
    {
      id: "standard",
      title: "Standard Demo",
      description: "45-minute overview of ClaimSmart features and dashboard.",
      icon: <Car className="w-8 h-8 text-blue-500" />,
      color: "border-blue-200"
    },
    {
      id: "interactive",
      title: "Interactive Workshop",
      description: "90-minute hands-on session with sample data and use cases.",
      icon: <Users className="w-8 h-8 text-green-500" />,
      color: "border-green-200"
    },
    {
      id: "technical",
      title: "Technical Deep Dive",
      description: "60-minute technical session focused on implementation and APIs.",
      icon: <Bot className="w-8 h-8 text-purple-500" />,
      color: "border-purple-200"
    }
  ];

  // Dashboard screenshots
  const screenshots = [
    { name: "Risk Distribution", description: "Visual breakdown of driver risk categories" },
    { name: "Driver Details", description: "Individual driver risk assessment and trip history" },
    { name: "Premium Analysis", description: "Advanced premium calculation based on risk factors" },
    { name: "AI Insights", description: "AI-generated coaching and risk analysis" }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="flex items-center mb-6">
                <Car className="w-8 h-8 text-blue-600 mr-2" />
                <h1 className="text-3xl font-bold text-slate-800">
                  ClaimSmart
                </h1>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Intelligent Risk Assessment for Auto Insurance
              </h2>
              
              <p className="text-xl text-slate-600 mb-8">
                Transform your insurance business with AI-powered driver analytics, risk assessment, and dynamic premium calculation.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                  onClick={onGetStarted}
                >
                  <Download className="w-5 h-5 mr-2" /> Get Started
                </button>
                <button 
                  className="border border-slate-300 hover:border-slate-400 px-6 py-3 rounded-lg font-medium flex items-center transition-colors group relative overflow-hidden"
                  onClick={handleRequestDemo}
                >
                  <span className="absolute inset-0 w-0 bg-blue-50 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center">
                    Request Demo <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 relative">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-800 h-8 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50">
                  <div className="flex items-center mb-4">
                    <Car className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-lg font-bold text-slate-800">ClaimSmart Dashboard</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">Total Drivers</div>
                      <div className="text-2xl font-bold flex items-center">
                        <Users className="w-5 h-5 text-blue-500 mr-2" />
                        100
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">Avg Risk Score</div>
                      <div className="text-2xl font-bold flex items-center">
                        <Activity className="w-5 h-5 text-blue-500 mr-2" />
                        48%
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">High Risk Drivers</div>
                      <div className="text-2xl font-bold flex items-center text-red-500">
                        23
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                      <div className="text-sm text-slate-500 mb-1">Avg Premium</div>
                      <div className="text-2xl font-bold flex items-center text-green-500">
                        $872
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">Risk Distribution</div>
                      <div className="text-slate-500 text-sm">April 2025</div>
                    </div>
                    
                    <div className="h-32 flex items-end gap-1">
                      <div style={{height: '25%'}} className="w-full bg-green-500 rounded-t-sm"></div>
                      <div style={{height: '50%'}} className="w-full bg-amber-500 rounded-t-sm"></div>
                      <div style={{height: '60%'}} className="w-full bg-amber-500 rounded-t-sm"></div>
                      <div style={{height: '40%'}} className="w-full bg-amber-500 rounded-t-sm"></div>
                      <div style={{height: '30%'}} className="w-full bg-green-500 rounded-t-sm"></div>
                      <div style={{height: '35%'}} className="w-full bg-green-500 rounded-t-sm"></div>
                      <div style={{height: '65%'}} className="w-full bg-red-500 rounded-t-sm"></div>
                      <div style={{height: '70%'}} className="w-full bg-red-500 rounded-t-sm"></div>
                      <div style={{height: '55%'}} className="w-full bg-amber-500 rounded-t-sm"></div>
                      <div style={{height: '20%'}} className="w-full bg-green-500 rounded-t-sm"></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <div>Low Risk</div>
                      <div>Medium Risk</div>
                      <div>High Risk</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg rotate-3 text-sm font-medium">
                <Shield className="w-5 h-5 mb-1" />
                AI-Powered
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-lg shadow-lg -rotate-3 text-sm font-medium">
                <Activity className="w-5 h-5 mb-1" />
                Real-time Data
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Powerful Dashboard Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ClaimSmart provides comprehensive tools to analyze driver behavior, assess risk, and calculate fair premiums.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`${feature.color} p-6 rounded-xl border border-slate-200 transition-all duration-300 ${activeSection === index ? 'shadow-lg scale-105' : 'shadow'}`}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dashboard Preview Section */}
      <section id="dashboard-preview" className="py-16 px-4 sm:px-6 lg:px-8 reveal-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Interactive Dashboard</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Visualize driver data with interactive charts and comprehensive analytics.
            </p>
          </div>
          
          <div className={`border border-slate-200 rounded-xl shadow-xl overflow-hidden transition-all duration-1000 ${isVisible['dashboard-preview'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-slate-800 h-8 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6">
              <div className="flex items-center mb-6 gap-2">
                <Car size={24} className="text-blue-600" />
                <h2 className="text-xl font-bold text-slate-800">
                  ClaimSmart
                </h2>
              </div>
              
              <div className="flex overflow-x-auto pb-2 mb-4">
                <div className="flex space-x-2">
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg">Overview</div>
                  <div className="px-4 py-2 bg-white text-slate-700 rounded-lg">Driver Details</div>
                  <div className="px-4 py-2 bg-white text-slate-700 rounded-lg">Risk Analysis</div>
                  <div className="px-4 py-2 bg-white text-slate-700 rounded-lg">Premium Calculator</div>
                  <div className="px-4 py-2 bg-white text-slate-700 rounded-lg">AI Analysis</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Risk Distribution</h3>
                  <div className="flex items-center h-48">
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="rounded-full border-8 border-green-500 w-full h-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-amber-500 border-r-amber-500" style={{transform: 'rotate(-45deg)'}}></div>
                      <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-red-500" style={{transform: 'rotate(150deg)'}}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-sm font-medium">
                          <div className="text-green-500">35%</div>
                          <div className="text-amber-500">45%</div>
                          <div className="text-red-500">20%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-medium mb-2">Risk vs. Premium</h3>
                  <div className="h-48 flex items-end">
                    <div className="w-full flex items-end h-40 gap-1">
                      <div className="w-6 bg-green-500 rounded-t" style={{height: '30%'}}></div>
                      <div className="w-6 bg-green-500 rounded-t" style={{height: '40%'}}></div>
                      <div className="w-6 bg-green-500 rounded-t" style={{height: '35%'}}></div>
                      <div className="w-6 bg-amber-500 rounded-t" style={{height: '50%'}}></div>
                      <div className="w-6 bg-amber-500 rounded-t" style={{height: '60%'}}></div>
                      <div className="w-6 bg-amber-500 rounded-t" style={{height: '65%'}}></div>
                      <div className="w-6 bg-amber-500 rounded-t" style={{height: '70%'}}></div>
                      <div className="w-6 bg-red-500 rounded-t" style={{height: '80%'}}></div>
                      <div className="w-6 bg-red-500 rounded-t" style={{height: '85%'}}></div>
                      <div className="w-6 bg-red-500 rounded-t" style={{height: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h3 className="font-medium mb-2">Top High-Risk Drivers</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-2">Driver ID</th>
                        <th className="p-2">Risk Score</th>
                        <th className="p-2">Premium</th>
                        <th className="p-2">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-2">DRV-1023</td>
                        <td className="p-2"><span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">89%</span></td>
                        <td className="p-2">$1,456</td>
                        <td className="p-2">High Risk</td>
                      </tr>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-2">DRV-1045</td>
                        <td className="p-2"><span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">87%</span></td>
                        <td className="p-2">$1,422</td>
                        <td className="p-2">High Risk</td>
                      </tr>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="p-2">DRV-1067</td>
                        <td className="p-2"><span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs">82%</span></td>
                        <td className="p-2">$1,380</td>
                        <td className="p-2">High Risk</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Modules Section */}
      <section id="dashboard-modules" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 reveal-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Dashboard Modules</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              ClaimSmart offers multiple view options to analyze and manage driver risk.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {screenshots.map((screenshot, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow border border-slate-200 overflow-hidden transition-all duration-1000 ${isVisible['dashboard-modules'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    {index === 0 && <Activity className="w-12 h-12 mx-auto mb-2" />}
                    {index === 1 && <Car className="w-12 h-12 mx-auto mb-2" />}
                    {index === 2 && <BarChart2 className="w-12 h-12 mx-auto mb-2" />}
                    {index === 3 && <Bot className="w-12 h-12 mx-auto mb-2" />}
                    <div className="text-2xl font-bold">Screenshot Preview</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{screenshot.name}</h3>
                  <p className="text-slate-600">{screenshot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Video Section */}
{/* How It Works Video Section */}
<section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 reveal-section">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">See How ClaimSmart Works</h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        Watch a demonstration of our intelligent risk assessment platform in action.
      </p>
    </div>
    
    <div className={`relative rounded-xl overflow-hidden shadow-xl transition-all duration-1000 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Video with play button overlay */}
      <div className="relative aspect-video bg-slate-800">
        {!isPlaying ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                onClick={() => setIsPlaying(true)}
              >
                <Play className="w-6 h-6 text-white ml-1" />
              </button>
            </div>
           
          </>
        ) : (
          <iframe 
            src="https://drive.google.com/file/d/1ZoDIJ6BuCLujBDtg6oAX8cEBsdPYJ2I6/preview" 
            width="100%" 
            height="100%" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
            className="absolute inset-0"
          ></iframe>
        )}
        
        {/* Video controls - only show when using placeholder, not needed for embedded video */}
        {isPlaying && !true && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center">
            <button 
              className="mr-4"
              onClick={() => setIsPlaying(false)}
            >
              <Pause className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{width: '45%'}}></div>
            </div>
            
            <button 
              className="ml-4"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? 
                <VolumeX className="w-5 h-5 text-white" /> : 
                <Volume2 className="w-5 h-5 text-white" />
              }
            </button>
          </div>
        )}
      </div>
      
      {/* Video description */}
      <div className="bg-white p-6">
        <h3 className="text-xl font-bold mb-2">Complete ClaimSmart Walkthrough</h3>
        <p className="text-slate-600 mb-4">
          This video demonstrates how ClaimSmart analyzes driver data, calculates risk profiles, and generates personalized insurance premiums.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Risk Assessment</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">Premium Calculation</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">AI Analysis</span>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">Fleet Management</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* AI Analysis Section */}
      <section id="ai-analysis" className="py-16 px-4 sm:px-6 lg:px-8 reveal-section">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className={`bg-white p-6 rounded-xl shadow-xl border border-slate-200 transition-all duration-1000 ${isVisible['ai-analysis'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="flex items-center mb-4">
                  <Bot className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold">AI Analysis</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-blue-100 text-blue-700">Risk Summary</button>
                    <button className="px-3 py-1 rounded bg-slate-100">Premium Analysis</button>
                    <button className="px-3 py-1 rounded bg-slate-100">Coaching Tips</button>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg whitespace-pre-wrap">
                  Driver DRV-1023 has a risk score of 89%, categorized as High Risk. The driver has taken 12 trips and has a premium of $1,456. 
                  
                  Recommendations: Reduce speed and improve braking habits. Consider adjusting routes to avoid high-traffic areas.
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 order-1 md:order-2">
              <div className={`transition-all duration-1000 ${isVisible['ai-analysis'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">AI-Powered Insights</h2>
                <p className="text-xl text-slate-600 mb-6">
                  ClaimSmart leverages advanced AI to provide actionable insights on driver behavior.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Risk Assessment</h3>
                      <p className="text-slate-600">AI analyzes driving patterns to calculate accurate risk scores.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Driver Coaching</h3>
                      <p className="text-slate-600">Personalized recommendations to improve driving habits.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                      <BarChart2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Premium Optimization</h3>
                      <p className="text-slate-600">Fair premium calculations based on individual risk profiles.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Insurance Business?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Get started with ClaimSmart today and leverage the power of advanced analytics and AI.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
              onClick={onGetStarted}
            >
              <Download className="w-5 h-5 mr-2" /> Get Started
            </button>
            <button 
              className="border border-white hover:bg-blue-700 px-6 py-3 rounded-lg font-medium flex items-center transition-colors group"
              onClick={handleRequestDemo}
            >
              Schedule Demo 
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-slate-800 text-slate-300">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Car className="w-6 h-6 text-blue-400 mr-2" />
            <h3 className="text-xl font-bold text-white">
              ClaimSmart
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li>Features</li>
                <li>Dashboard</li>
                <li>Pricing</li>
                <li>API</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>Documentation</li>
                <li>Tutorials</li>
                <li>Case Studies</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li>About</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Partners</li>
              </ul>
            </div>
            
            <div>


<h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Security</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © 2025 ClaimSmart. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <span className="sr-only">Twitter</span>
                {/* Twitter icon placeholder */}
              </a>
              <a href="#" className="hover:text-white">
                <span className="sr-only">LinkedIn</span>
                {/* LinkedIn icon placeholder */}
              </a>
              <a href="#" className="hover:text-white">
                <span className="sr-only">GitHub</span>
                {/* GitHub icon placeholder */}
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Demo Request Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Request a Demo</h3>
                <button 
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => setShowDemoModal(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <p className="text-slate-600 mb-6">
                Select a demo type that best fits your needs. Our team will contact you to schedule your personalized demonstration.
              </p>
              
              <div className="space-y-4 mb-6">
                {demoOptions.map((option) => (
                  <div 
                    key={option.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${demoType === option.id ? option.color + ' bg-slate-50' : 'border-slate-200'}`}
                    onClick={() => setDemoType(option.id)}
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        {option.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{option.title}</h4>
                        <p className="text-slate-600 text-sm">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="date"
                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Number of Users</label>
                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm">
                      <option>1-10 users</option>
                      <option>11-50 users</option>
                      <option>51-200 users</option>
                      <option>201+ users</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => setShowDemoModal(false)}
                >
                  Request Demo
                </button>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 border-t border-slate-200 rounded-b-xl">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Clipboard className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Share this demo invite</div>
                  <div className="text-xs text-slate-500">claimsmart.io/demo/invite</div>
                </div>
                <button 
                  className={`px-3 py-1 rounded text-sm font-medium ${copied ? 'bg-green-500 text-white' : 'bg-slate-200 hover:bg-slate-300'}`}
                  onClick={handleCopyInvite}
                >
                  {copied ? (
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-1" /> Copied
                    </span>
                  ) : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimSmartLanding;