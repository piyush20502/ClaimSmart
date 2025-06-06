// "use client";
// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, BarChart, Bar, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Activity, AlertTriangle, BarChart2, Car, CheckCircle, TrendingUp, Users, MessageSquare, Bot } from 'lucide-react';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import geminiService from '../../app/api/geminiService';

// // Initialize Gemini
// // const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// // Sample data based on the model output
// const generateSampleData = () => {
//   const drivers = Array.from({ length: 100 }, (_, i) => {
//     const id = `DRV-${1000 + i}`;
//     const riskScore = Math.random();
//     const speedFactor = 0.3 + Math.random() * 0.7;
//     const brakingFactor = 0.2 + Math.random() * 0.8;
//     const accelerationFactor = 0.25 + Math.random() * 0.75;
//     const timeOfDayFactor = 0.4 + Math.random() * 0.6;
    
//     return {
//       id,
//       riskScore,
//       speedFactor,
//       brakingFactor, 
//       accelerationFactor,
//       timeOfDayFactor,
//       trips: Math.floor(5 + Math.random() * 20),
//       category: riskScore < 0.3 ? 'Low Risk' : riskScore < 0.7 ? 'Medium Risk' : 'High Risk',
//       premium: Math.floor(500 + riskScore * 1500)
//     };
//   });
  
//   return drivers;
// };

// // Generate sample trip data for a driver
// const generateTripData = (driverId) => {
//   return Array.from({ length: 15 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - (14 - i));
    
//     return {
//       tripId: `${driverId}-TRIP-${i}`,
//       date: date.toLocaleDateString(),
//       riskScore: 0.2 + Math.random() * 0.6,
//       distance: Math.floor(5 + Math.random() * 30),
//       duration: Math.floor(15 + Math.random() * 60),
//       hardBrakes: Math.floor(Math.random() * 5),
//       rapidAccel: Math.floor(Math.random() * 4)
//     };
//   });
// };

// // Generate risk distribution for pie chart
// const generateRiskDistribution = (data) => {
//   const categories = ['Low Risk', 'Medium Risk', 'High Risk'];
//   const counts = {
//     'Low Risk': 0,
//     'Medium Risk': 0,
//     'High Risk': 0
//   };
  
//   data.forEach(driver => {
//     counts[driver.category]++;
//   });
  
//   return categories.map(category => ({
//     name: category,
//     value: counts[category]
//   }));
// };

// // Animation helper for counter display
// const AnimatedCounter = ({ value, duration = 1000 }) => {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(value);
//     const increment = end / (duration / 50);
//     const timer = setInterval(() => {
//       start += increment;
//       setCount(Math.floor(start));
//       if (start >= end) {
//         clearInterval(timer);
//         setCount(end);
//       }
//     }, 50);
    
//     return () => clearInterval(timer);
//   }, [value, duration]);
  
//   return <span>{count}</span>;
// };

// // Risk Score Gauge Component
// const RiskScoreGauge = ({ score }) => {
//   const gaugePercent = score * 100;
//   let color = "#22c55e"; // Green for low risk
  
//   if (score > 0.7) {
//     color = "#ef4444"; // Red for high risk
//   } else if (score > 0.3) {
//     color = "#f59e0b"; // Amber for medium risk
//   }
  
//   return (
//     <div className="relative h-32 w-32 mx-auto">
//       <svg viewBox="0 0 100 100" className="w-full h-full">
//         {/* Background circle */}
//         <circle 
//           cx="50" 
//           cy="50" 
//           r="45" 
//           fill="none" 
//           stroke="#e5e7eb" 
//           strokeWidth="10" 
//           strokeDasharray="283" 
//           strokeDashoffset="0" 
//         />
//         {/* Foreground circle with animation */}
//         <circle 
//           cx="50" 
//           cy="50" 
//           r="45" 
//           fill="none" 
//           stroke={color} 
//           strokeWidth="10" 
//           strokeDasharray="283" 
//           strokeDashoffset={283 - (gaugePercent / 100 * 283)} 
//           style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
//           transform="rotate(-90 50 50)" 
//         />
//         <text 
//           x="50" 
//           y="55" 
//           textAnchor="middle" 
//           fontSize="20" 
//           fontWeight="bold" 
//           fill={color}
//         >
//           {Math.round(score * 100)}%
//         </text>
//       </svg>
//     </div>
//   );
// };

// // Main Dashboard Component
// const InsuranceRiskDashboard = () => {
//   const [data, setData] = useState([]);
//   const [selectedDriver, setSelectedDriver] = useState(null);
//   const [tripData, setTripData] = useState([]);
//   const [riskDistribution, setRiskDistribution] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [aiResponse, setAiResponse] = useState("");
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [aiTab, setAiTab] = useState("risk-summary");
  
//   // Colors for charts
//   const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];
  
//   // Load data with animation effect
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const sampleData = generateSampleData();
//       setData(sampleData);
//       setRiskDistribution(generateRiskDistribution(sampleData));
//       setSelectedDriver(sampleData[0]);
//       setTripData(generateTripData(sampleData[0].id));
//       setIsLoading(false);
//     }, 800);
    
//     return () => clearTimeout(timer);
//   }, []);

//   const handleDriverSelect = (driver) => {
//     setSelectedDriver(driver);
//     setTripData(generateTripData(driver.id));
//     setAiResponse(""); // Clear previous AI response when selecting new driver
//   };
  
//   // Initialize Gemini with error handling for API key
//   // const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
//   // if (!apiKey) {
//   //   console.error("Error: NEXT_PUBLIC_GEMINI_API_KEY is not set. Please add it to your .env.local file.");
//   // }
  
//   // const genAI = new GoogleGenerativeAI(apiKey || "");
  
//   // Function to generate AI analysis
//   const generateAiAnalysis = async (type) => {
//     if (!selectedDriver) {
//       setAiResponse("Please select a driver first");
//       return;
//     }
  
//     setIsGenerating(true);
//     setAiResponse("");
  
//     try {
//       let prompt = "";
//       switch (type) {
//         case "risk-summary":
//           prompt = `Analyze this driver's risk profile and provide a concise summary:
//                    Driver ID: ${selectedDriver.id}
//                    Risk Score: ${(selectedDriver.riskScore * 100).toFixed(0)}%
//                    Category: ${selectedDriver.category}
//                    Trips: ${selectedDriver.trips}
//                    Premium: $${selectedDriver.premium}
//                    Risk Factors:
//                    - Speed: ${(selectedDriver.speedFactor * 100).toFixed(0)}%
//                    - Braking: ${(selectedDriver.brakingFactor * 100).toFixed(0)}%
//                    - Acceleration: ${(selectedDriver.accelerationFactor * 100).toFixed(0)}%
//                    - Time of Day: ${(selectedDriver.timeOfDayFactor * 100).toFixed(0)}%
                   
//                    Provide a 3-4 sentence summary of the risk profile and recommendations.`;
//           break;
//         case "premium-analysis":
//           prompt = `Analyze this driver's premium calculation:
//                    Base Premium: $500
//                    Risk Adjustment: +$${Math.floor(selectedDriver.riskScore * 1500)}
//                    Total Premium: $${selectedDriver.premium}
                   
//                    Is this premium calculation fair based on the risk factors? Provide a short analysis.`;
//           break;
//         case "coaching":
//           prompt = `Based on these driving risk factors, provide 3 specific coaching recommendations to improve safety:
//                    - Speed: ${(selectedDriver.speedFactor * 100).toFixed(0)}%
//                    - Braking: ${(selectedDriver.brakingFactor * 100).toFixed(0)}%
//                    - Acceleration: ${(selectedDriver.accelerationFactor * 100).toFixed(0)}%
                   
//                    Format as bullet points.`;
//           break;
//       }
  
//       // Temporary mock response for Gemini API
//       const mockResponse = {
//         "risk-summary": `Driver ${selectedDriver.id} has a risk score of ${(selectedDriver.riskScore * 100).toFixed(0)}%, categorized as ${selectedDriver.category}. The driver has taken ${selectedDriver.trips} trips and has a premium of $${selectedDriver.premium}. Recommendations: Reduce speed and improve braking habits.`,
//         "premium-analysis": `The premium calculation for Driver ${selectedDriver.id} is fair based on the risk factors. The base premium is $500, with a risk adjustment of $${Math.floor(selectedDriver.riskScore * 1500)}.`,
//         "coaching": `1. Reduce speed to minimize risk.\n2. Improve braking habits to avoid sudden stops.\n3. Avoid driving during high-risk times of the day.`,
//       };
  
//       // Simulate API delay
//       await new Promise((resolve) => setTimeout(resolve, 1000));
  
//       setAiResponse(mockResponse[type]);
//     } catch (error) {
//       console.error("Analysis error:", error);
//       setAiResponse(`Error: ${error.message}`);
//     } finally {
//       setIsGenerating(false);
//     }
//   };
  
//   // Stats calculation
//   const averageRiskScore = data.length ? data.reduce((sum, driver) => sum + driver.riskScore, 0) / data.length : 0;
//   const highRiskCount = data.filter(driver => driver.riskScore > 0.7).length;
  
//   return (
//     <div className="w-full bg-slate-50 p-4 rounded-lg">
//       <div className="flex items-center mb-6 gap-2">
//         <Car size={32} className="text-blue-600" />
//         <h1 className="text-2xl font-bold text-slate-800"> SmartClaim
//           </h1>
//       </div>
      
//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {/* Key Metrics Row */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <Card className="bg-white">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-slate-500">Total Drivers</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <Users className="mr-2 h-5 w-5 text-blue-600" />
//                   <div className="text-2xl font-bold"><AnimatedCounter value={data.length} /></div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-white">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-slate-500">Avg Risk Score</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <Activity className="mr-2 h-5 w-5 text-blue-600" />
//                   <div className="text-2xl font-bold"><AnimatedCounter value={(averageRiskScore * 100).toFixed(0)} /> %</div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-white">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-slate-500">High Risk Drivers</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
//                   <div className="text-2xl font-bold"><AnimatedCounter value={highRiskCount} /></div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             <Card className="bg-white">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-slate-500">Avg Premium</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center">
//                   <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
//                   <div className="text-2xl font-bold">$<AnimatedCounter value={data.reduce((sum, d) => sum + d.premium, 0) / data.length} /></div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
          
//           {/* Main Dashboard Tabs */}
//           <Tabs defaultValue="overview" className="w-full">
//             <TabsList className="mb-4">
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="driver-details">Driver Details</TabsTrigger>
//               <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
//               <TabsTrigger value="premium-calculator">Premium Calculator</TabsTrigger>
//               <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
//             </TabsList>
            
//             {/* Overview Tab */}
//             <TabsContent value="overview" className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card className="bg-white">
//                   <CardHeader>
//                     <CardTitle>Risk Distribution</CardTitle>
//                     <CardDescription>Distribution of drivers by risk category</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={riskDistribution}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={60}
//                           outerRadius={80}
//                           fill="#8884d8"
//                           paddingAngle={2}
//                           dataKey="value"
//                           animationBegin={0}
//                           animationDuration={1000}
//                         >
//                           {riskDistribution.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </CardContent>
//                 </Card>
                
//                 <Card className="bg-white">
//                   <CardHeader>
//                     <CardTitle>Risk vs. Premium</CardTitle>
//                     <CardDescription>How risk score affects premium prices</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis 
//                           type="number" 
//                           dataKey="riskScore" 
//                           name="Risk Score" 
//                           domain={[0, 1]}
//                           tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
//                         />
//                         <YAxis type="number" dataKey="premium" name="Premium" unit="$" />
//                         <Tooltip 
//                           cursor={{ strokeDasharray: '3 3' }}
//                           formatter={(value, name) => {
//                             if (name === 'riskScore') return [`${(value * 100).toFixed(0)}%`, 'Risk Score'];
//                             return [value, 'Premium ($)'];
//                           }}
//                         />
//                         <Scatter
//                           name="Drivers"
//                           data={data}
//                           fill="#8884d8"
//                           animationBegin={0}
//                           animationDuration={1000}
//                         >
//                           {data.map((entry, index) => {
//                             let color = '#22c55e';
//                             if (entry.riskScore > 0.7) color = '#ef4444';
//                             else if (entry.riskScore > 0.3) color = '#f59e0b';
                            
//                             return <Cell key={`cell-${index}`} fill={color} />;
//                           })}
//                         </Scatter>
//                       </ScatterChart>
//                     </ResponsiveContainer>
//                   </CardContent>
//                 </Card>
//               </div>
              
//               <Card className="bg-white">
//                 <CardHeader>
//                   <CardTitle>Top High-Risk Drivers</CardTitle>
//                   <CardDescription>Drivers with the highest risk scores</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="border-b">
//                           <th className="text-left p-2">Driver ID</th>
//                           <th className="text-left p-2">Risk Score</th>
//                           <th className="text-left p-2">Premium</th>
//                           <th className="text-left p-2">Category</th>
//                           <th className="text-left p-2">Trips</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {data
//                           .sort((a, b) => b.riskScore - a.riskScore)
//                           .slice(0, 5)
//                           .map((driver, i) => (
//                             <tr key={driver.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => handleDriverSelect(driver)}>
//                               <td className="p-2">{driver.id}</td>
//                               <td className="p-2">
//                                 <span 
//                                   className={`px-2 py-1 rounded-full text-white ${
//                                     driver.riskScore > 0.7 ? 'bg-red-500' : 
//                                     driver.riskScore > 0.3 ? 'bg-amber-500' : 'bg-green-500'
//                                   }`}
//                                 >
//                                   {(driver.riskScore * 100).toFixed(0)}%
//                                 </span>
//                               </td>
//                               <td className="p-2">${driver.premium}</td>
//                               <td className="p-2">{driver.category}</td>
//                               <td className="p-2">{driver.trips}</td>
//                             </tr>
//                           ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             {/* Driver Details Tab */}
//             <TabsContent value="driver-details" className="space-y-4">
//               {selectedDriver && (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <Card className="bg-white md:col-span-1">
//                       <CardHeader>
//                         <CardTitle>Driver Profile</CardTitle>
//                         <CardDescription>ID: {selectedDriver.id}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="space-y-4">
//                         <RiskScoreGauge score={selectedDriver.riskScore} />
                        
//                         <div className="mt-4 space-y-2">
//                           <div className="flex justify-between">
//                             <span className="text-slate-500">Risk Category:</span>
//                             <span className={`font-medium ${
//                               selectedDriver.category === 'High Risk' ? 'text-red-500' : 
//                               selectedDriver.category === 'Medium Risk' ? 'text-amber-500' : 'text-green-500'
//                             }`}>{selectedDriver.category}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-slate-500">Suggested Premium:</span>
//                             <span className="font-medium">${selectedDriver.premium}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-slate-500">Total Trips:</span>
//                             <span className="font-medium">{selectedDriver.trips}</span>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
                    
//                     <Card className="bg-white md:col-span-2">
//                       <CardHeader>
//                         <CardTitle>Risk Factors</CardTitle>
//                         <CardDescription>Main contributing factors to risk score</CardDescription>
//                       </CardHeader>
//                       <CardContent className="h-64">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <BarChart
//                             data={[
//                               { name: 'Speed', value: selectedDriver.speedFactor },
//                               { name: 'Braking', value: selectedDriver.brakingFactor },
//                               { name: 'Acceleration', value: selectedDriver.accelerationFactor },
//                               { name: 'Time of Day', value: selectedDriver.timeOfDayFactor },
//                             ]}
//                             margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                           >
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
//                             <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
//                             <Bar
//                               dataKey="value"
//                               fill="#3b82f6"
//                               animationBegin={0}
//                               animationDuration={1000}
//                               isAnimationActive={true}
//                             />
//                           </BarChart>
//                         </ResponsiveContainer>
//                       </CardContent>
//                     </Card>
//                   </div>
                  
//                   <Card className="bg-white">
//                     <CardHeader>
//                       <CardTitle>Recent Trip History</CardTitle>
//                       <CardDescription>Last 15 trips with risk assessment</CardDescription>
//                     </CardHeader>
//                     <CardContent className="h-64">
//                       <ResponsiveContainer width="100%" height="100%">
//                         <LineChart
//                           data={tripData}
//                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                         >
//                           <CartesianGrid strokeDasharray="3 3" />
//                           <XAxis dataKey="date" />
//                           <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
//                           <Tooltip formatter={(value) => `${(value * 100).toFixed(0)}%`} />
//                           <Legend />
//                           <Line
//                             type="monotone"
//                             dataKey="riskScore"
//                             stroke="#3b82f6"
//                             strokeWidth={2}
//                             dot={{ r: 4 }}
//                             activeDot={{ r: 6 }}
//                             isAnimationActive={true}
//                             animationBegin={0}
//                             animationDuration={1000}
//                           />
//                         </LineChart>
//                       </ResponsiveContainer>
//                     </CardContent>
//                   </Card>
//                 </>
//               )}
//             </TabsContent>
            
//             {/* Risk Analysis Tab */}
//             <TabsContent value="risk-analysis" className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card className="bg-white">
//                   <CardHeader>
//                     <CardTitle>Risk Score Distribution</CardTitle>
//                     <CardDescription>Number of drivers by risk score range</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={[
//                           { range: '0-10%', count: data.filter(d => d.riskScore < 0.1).length },
//                           { range: '10-20%', count: data.filter(d => d.riskScore >= 0.1 && d.riskScore < 0.2).length },
//                           { range: '20-30%', count: data.filter(d => d.riskScore >= 0.2 && d.riskScore < 0.3).length },
//                           { range: '30-40%', count: data.filter(d => d.riskScore >= 0.3 && d.riskScore < 0.4).length },
//                           { range: '40-50%', count: data.filter(d => d.riskScore >= 0.4 && d.riskScore < 0.5).length },
//                           { range: '50-60%', count: data.filter(d => d.riskScore >= 0.5 && d.riskScore < 0.6).length },
//                           { range: '60-70%', count: data.filter(d => d.riskScore >= 0.6 && d.riskScore < 0.7).length },
//                           { range: '70-80%', count: data.filter(d => d.riskScore >= 0.7 && d.riskScore < 0.8).length },
//                           { range: '80-90%', count: data.filter(d => d.riskScore >= 0.8 && d.riskScore < 0.9).length },
//                           { range: '90-100%', count: data.filter(d => d.riskScore >= 0.9).length },
//                         ]}
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="range" />
//                         <YAxis />
//                         <Tooltip />
//                         <Bar dataKey="count" isAnimationActive={true} animationBegin={0} animationDuration={1000}>
//                           {[...Array(10)].map((_, index) => {
//                             const colorIndex = Math.min(Math.floor(index / 3), 2);
//                             return <Cell key={`cell-${index}`} fill={COLORS[colorIndex]} />;
//                           })}
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </CardContent>
//                 </Card>
                
//                 <Card className="bg-white">
//                   <CardHeader>
//                     <CardTitle>Premium vs. Risk Category</CardTitle>
//                     <CardDescription>Average premium by risk category</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={[
//                           { 
//                             category: 'Low Risk', 
//                             premium: data.filter(d => d.category === 'Low Risk').reduce((sum, d) => sum + d.premium, 0) / 
//                                     Math.max(1, data.filter(d => d.category === 'Low Risk').length)
//                           },
//                           { 
//                             category: 'Medium Risk', 
//                             premium: data.filter(d => d.category === 'Medium Risk').reduce((sum, d) => sum + d.premium, 0) / 
//                                     Math.max(1, data.filter(d => d.category === 'Medium Risk').length)
//                           },
//                           { 
//                             category: 'High Risk', 
//                             premium: data.filter(d => d.category === 'High Risk').reduce((sum, d) => sum + d.premium, 0) / 
//                                     Math.max(1, data.filter(d => d.category === 'High Risk').length)
//                           },
//                         ]}
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="category" />
//                         <YAxis unit="$" />
//                         <Tooltip formatter={(value) => [`$${value.toFixed(0)}`, 'Avg Premium']} />
//                         <Bar 
//                           dataKey="premium" 
//                           isAnimationActive={true} 
//                           animationBegin={0} 
//                           animationDuration={1000}
//                         >
//                           <Cell fill={COLORS[0]} />
//                           <Cell fill={COLORS[1]} />
//                           <Cell fill={COLORS[2]} />
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </CardContent>
//                 </Card>
//               </div>
              
//               <Card className="bg-white">
//                 <CardHeader>
//                   <CardTitle>Risk Factors Correlation</CardTitle>
//                   <CardDescription>How different factors contribute to risk scores</CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-64">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart
//                       data={[...Array(10)].map((_, i) => {
//                         const value = i / 10 + 0.05;
//                         return {
//                           value: value.toFixed(1),
//                           speed: (value * 1.1).toFixed(2),
//                           braking: (value * 0.9).toFixed(2),
//                           acceleration: (value * 1.05).toFixed(2),
//                           timeOfDay: (value * 0.8).toFixed(2)
//                         };
//                       })}
//                       margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                     >
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="value" label={{ value: 'Risk Score', position: 'insideBottomRight', offset: -10 }} />
//                       <YAxis label={{ value: 'Factor Contribution', angle: -90, position: 'insideLeft' }} />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey="speed" stroke="#ef4444" strokeWidth={2} name="Speed" isAnimationActive={true} animationBegin={0} animationDuration={1000} />
//                       <Line type="monotone" dataKey="braking" stroke="#3b82f6" strokeWidth={2} name="Braking" isAnimationActive={true} animationBegin={200} animationDuration={1000} />
//                       <Line type="monotone" dataKey="acceleration" stroke="#f59e0b" strokeWidth={2} name="Acceleration" isAnimationActive={true} animationBegin={400} animationDuration={1000} />
//                       <Line type="monotone" dataKey="timeOfDay" stroke="#22c55e" strokeWidth={2} name="Time of Day" isAnimationActive={true} animationBegin={600} animationDuration={1000} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             {/* Premium Calculator Tab */}
//             <TabsContent value="premium-calculator" className="space-y-4">
//               <Card className="bg-white">
//                 <CardHeader>
//                   <CardTitle>Premium Calculator</CardTitle>
//                   <CardDescription>Select a driver to see premium calculation</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <div className="mb-6">
//                         <h3 className="text-lg font-medium mb-2">Driver Selection</h3>
//                         <select 
//                           className="w-full p-2 border rounded"
//                           value={selectedDriver?.id}
//                           onChange={(e) => {
//                             const driver = data.find(d => d.id === e.target.value);
//                             if (driver) handleDriverSelect(driver);
//                           }}
//                         >
//                           {data.map(driver => (
//                             <option key={driver.id} value={driver.id}>
//                               {driver.id} - Risk Score: {(driver.riskScore * 100).toFixed(0)}%
//                             </option>
//                           ))}
//                         </select>
//                       </div>
                      
//                       {selectedDriver && (
//                         <div className="space-y-4">
//                           <div className="flex items-center space-x-4">
//                             <RiskScoreGauge score={selectedDriver.riskScore} />
//                             <div>
//                               <div className="text-lg font-medium">{selectedDriver.category}</div>
//                               <div className="text-slate-500">ID: {selectedDriver.id}</div>
//                             </div>
//                           </div>
                          
//                           <div className="space-y-2">
//                             <div className="flex justify-between items-center">
//                               <span>Risk Score:</span>
//                               <span className="font-medium">{(selectedDriver.riskScore * 100).toFixed(0)}%</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span>Trip Count:</span>
//                               <span className="font-medium">{selectedDriver.trips}</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span>Base Premium:</span>
//                               <span className="font-medium">$500</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span>Base Premium:</span>
//                               <span className="font-medium">$500</span>
//                             </div>
//                             <div className="flex justify-between items-center">
//                               <span>Risk Adjustment:</span>
//                               <span className="font-medium">+${Math.floor(selectedDriver.riskScore * 1500)}</span>
//                             </div>
//                             <div className="h-px bg-slate-200 my-2"></div>
//                             <div className="flex justify-between items-center font-bold">
//                               <span>Total Premium:</span>
//                               <span>${selectedDriver.premium}</span>
//                             </div>
//                           </div>
                          
//                           <div className="mt-4">
//                             <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
//                               Generate Quote
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <h3 className="text-lg font-medium mb-2">Premium Breakdown</h3>
//                       <div className="h-64">
//                         <ResponsiveContainer width="100%" height="100%">
//                           <PieChart>
//                             <Pie
//                               data={[
//                                 { name: 'Base Premium', value: 500 },
//                                 { name: 'Risk Adjustment', value: selectedDriver ? Math.floor(selectedDriver.riskScore * 1500) : 0 }
//                               ]}
//                               cx="50%"
//                               cy="50%"
//                               innerRadius={60}
//                               outerRadius={80}
//                               fill="#8884d8"
//                               paddingAngle={2}
//                               dataKey="value"
//                               animationBegin={0}
//                               animationDuration={1000}
//                             >
//                               <Cell fill="#3b82f6" />
//                               <Cell fill={selectedDriver && selectedDriver.riskScore > 0.7 ? '#ef4444' : selectedDriver && selectedDriver.riskScore > 0.3 ? '#f59e0b' : '#22c55e'} />
//                             </Pie>
//                             <Tooltip formatter={(value) => `$${value}`} />
//                             <Legend />
//                           </PieChart>
//                         </ResponsiveContainer>
//                       </div>
                      
//                       <div className="bg-slate-100 p-3 rounded-lg mt-4">
//                         <h4 className="font-medium mb-2">Risk Factors Influence</h4>
//                         <div className="space-y-2">
//                           <div>
//                             <div className="flex justify-between text-sm mb-1">
//                               <span>Speed:</span>
//                               <span>{(selectedDriver?.speedFactor * 100).toFixed(0)}%</span>
//                             </div>
//                             <div className="w-full bg-slate-200 rounded-full h-2">
//                               <div 
//                                 className="bg-blue-600 h-2 rounded-full" 
//                                 style={{ width: `${selectedDriver ? selectedDriver.speedFactor * 100 : 0}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                           <div>
//                             <div className="flex justify-between text-sm mb-1">
//                               <span>Braking:</span>
//                               <span>{(selectedDriver?.brakingFactor * 100).toFixed(0)}%</span>
//                             </div>
//                             <div className="w-full bg-slate-200 rounded-full h-2">
//                               <div 
//                                 className="bg-blue-600 h-2 rounded-full" 
//                                 style={{ width: `${selectedDriver ? selectedDriver.brakingFactor * 100 : 0}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                           <div>
//                             <div className="flex justify-between text-sm mb-1">
//                               <span>Acceleration:</span>
//                               <span>{(selectedDriver?.accelerationFactor * 100).toFixed(0)}%</span>
//                             </div>
//                             <div className="w-full bg-slate-200 rounded-full h-2">
//                               <div 
//                                 className="bg-blue-600 h-2 rounded-full" 
//                                 style={{ width: `${selectedDriver ? selectedDriver.accelerationFactor * 100 : 0}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                           <div>
//                             <div className="flex justify-between text-sm mb-1">
//                               <span>Time of Day:</span>
//                               <span>{(selectedDriver?.timeOfDayFactor * 100).toFixed(0)}%</span>
//                             </div>
//                             <div className="w-full bg-slate-200 rounded-full h-2">
//                               <div 
//                                 className="bg-blue-600 h-2 rounded-full" 
//                                 style={{ width: `${selectedDriver ? selectedDriver.timeOfDayFactor * 100 : 0}%` }}
//                               ></div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="bg-slate-50 border-t">
//                   <div className="flex items-center">
//                     <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
//                     <span className="text-sm text-slate-500">Premium calculation based on AI-powered risk model</span>
//                   </div>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
            
//             {/* AI Analysis Tab */}
//             <TabsContent value="ai-analysis" className="space-y-4">
//               <Card className="bg-white">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Bot className="h-5 w-5" /> Gemini AI Analysis
//                   </CardTitle>
//                   <CardDescription>AI-powered insights for this driver</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex gap-2 mb-4">
//                     <button 
//                       onClick={() => generateAiAnalysis("risk-summary")}
//                       className={`px-3 py-1 rounded ${aiTab === "risk-summary" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}
//                     >
//                       Risk Summary
//                     </button>
//                     <button 
//                       onClick={() => generateAiAnalysis("premium-analysis")}
//                       className={`px-3 py-1 rounded ${aiTab === "premium-analysis" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}
//                     >
//                       Premium Analysis
//                     </button>
//                     <button 
//                       onClick={() => generateAiAnalysis("coaching")}
//                       className={`px-3 py-1 rounded ${aiTab === "coaching" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}
//                     >
//                       Coaching Tips
//                     </button>
//                   </div>
                  
//                   <div className="bg-slate-50 p-4 rounded-lg min-h-32">
//                     {isGenerating ? (
//   <div className="flex items-center justify-center h-32">
//     <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//     <span className="ml-2">Generating analysis...</span>
//   </div>
// ) : aiResponse.startsWith('Error:') ? (
//   <div className="bg-red-50 p-4 rounded-lg text-red-600">
//     <AlertTriangle className="inline mr-2" />
//     {aiResponse}
//     <button 
//       onClick={() => generateAiAnalysis(aiTab)}
//       className="ml-4 px-3 py-1 bg-red-100 rounded hover:bg-red-200"
//     >
//       Retry
//     </button>
//   </div>
// ) : aiResponse ? (
//   <div className="whitespace-pre-wrap bg-green-50 p-4 rounded-lg">
//     {aiResponse}
//   </div>
// ) : (
//   <div className="flex items-center justify-center h-32 text-gray-400">
//     <MessageSquare className="mr-2" />
//     Select an analysis type to generate insights
//   </div>
// )}
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </>
//       )}
//     </div>
//   );
// };

// export default InsuranceRiskDashboard;


"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, AlertTriangle, Car, CheckCircle, TrendingUp, Users, MessageSquare, Bot } from 'lucide-react';

// Sample data generation functions (keep existing)
const generateSampleData = () => {
  const drivers = Array.from({ length: 100 }, (_, i) => {
    const id = `DRV-${1000 + i}`;
    const riskScore = Math.random();
    const speedFactor = 0.3 + Math.random() * 0.7;
    const brakingFactor = 0.2 + Math.random() * 0.8;
    const accelerationFactor = 0.25 + Math.random() * 0.75;
    const timeOfDayFactor = 0.4 + Math.random() * 0.6;
    
    return {
      id,
      riskScore,
      speedFactor,
      brakingFactor, 
      accelerationFactor,
      timeOfDayFactor,
      trips: Math.floor(5 + Math.random() * 20),
      category: riskScore < 0.3 ? 'Low Risk' : riskScore < 0.7 ? 'Medium Risk' : 'High Risk',
      premium: Math.floor(500 + riskScore * 1500)
    };
  });
  
  return drivers;
};

const generateTripData = (driverId: string) => {
  return Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (14 - i));
    
    return {
      tripId: `${driverId}-TRIP-${i}`,
      date: date.toLocaleDateString(),
      riskScore: 0.2 + Math.random() * 0.6,
      distance: Math.floor(5 + Math.random() * 30),
      duration: Math.floor(15 + Math.random() * 60),
      hardBrakes: Math.floor(Math.random() * 5),
      rapidAccel: Math.floor(Math.random() * 4)
    };
  });
};

const generateRiskDistribution = (data: any[]) => {
  const categories = ['Low Risk', 'Medium Risk', 'High Risk'];
  const counts = {
    'Low Risk': 0,
    'Medium Risk': 0,
    'High Risk': 0
  };
  
  data.forEach(driver => {
    counts[driver.category as keyof typeof counts]++;
  });
  
  return categories.map(category => ({
    name: category,
    value: counts[category as keyof typeof counts]
  }));
};

const AnimatedCounter = ({ value, duration = 1000 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString());
    const increment = end / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, 50);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count}</span>;
};

const RiskScoreGauge = ({ score }: { score: number }) => {
  const gaugePercent = score * 100;
  let color = "#22c55e";
  
  if (score > 0.7) {
    color = "#ef4444";
  } else if (score > 0.3) {
    color = "#f59e0b";
  }
  
  return (
    <div className="relative h-32 w-32 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke="#e5e7eb" 
          strokeWidth="10" 
          strokeDasharray="283" 
          strokeDashoffset="0" 
        />
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="none" 
          stroke={color} 
          strokeWidth="10" 
          strokeDasharray="283" 
          strokeDashoffset={283 - (gaugePercent / 100 * 283)} 
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          transform="rotate(-90 50 50)" 
        />
        <text 
          x="50" 
          y="55" 
          textAnchor="middle" 
          fontSize="20" 
          fontWeight="bold" 
          fill={color}
        >
          {Math.round(score * 100)}%
        </text>
      </svg>
    </div>
  );
};

const InsuranceRiskDashboard = ({ userType }: { userType: 'client' | 'provider' }) => {
  const [data, setData] = useState<any[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [tripData, setTripData] = useState<any[]>([]);
  const [riskDistribution, setRiskDistribution] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTab, setAiTab] = useState("risk-summary");
  
  const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const sampleData = generateSampleData();
      setData(sampleData);
      setRiskDistribution(generateRiskDistribution(sampleData));
      setSelectedDriver(sampleData[0]);
      setTripData(generateTripData(sampleData[0].id));
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDriverSelect = (driver: any) => {
    setSelectedDriver(driver);
    setTripData(generateTripData(driver.id));
    setAiResponse("");
  };
  
  const generateAiAnalysis = async (type: string) => {
    if (!selectedDriver) {
      setAiResponse("Please select a driver first");
      return;
    }
  
    setIsGenerating(true);
    setAiResponse("");
    setAiTab(type);
  
    try {
      let prompt = "";
      switch (type) {
        case "risk-summary":
          prompt = `Analyze this driver's risk profile and provide a concise summary:
                   Driver ID: ${selectedDriver.id}
                   Risk Score: ${(selectedDriver.riskScore * 100).toFixed(0)}%
                   Category: ${selectedDriver.category}
                   Trips: ${selectedDriver.trips}
                   Premium: $${selectedDriver.premium}
                   Risk Factors:
                   - Speed: ${(selectedDriver.speedFactor * 100).toFixed(0)}%
                   - Braking: ${(selectedDriver.brakingFactor * 100).toFixed(0)}%
                   - Acceleration: ${(selectedDriver.accelerationFactor * 100).toFixed(0)}%
                   - Time of Day: ${(selectedDriver.timeOfDayFactor * 100).toFixed(0)}%
                   
                   Provide a 3-4 sentence summary of the risk profile and recommendations.`;
          break;
        case "premium-analysis":
          prompt = `Analyze this driver's premium calculation:
                   Base Premium: $500
                   Risk Adjustment: +$${Math.floor(selectedDriver.riskScore * 1500)}
                   Total Premium: $${selectedDriver.premium}
                   
                   Is this premium calculation fair based on the risk factors? Provide a short analysis.`;
          break;
        case "coaching":
          prompt = `Based on these driving risk factors, provide 3 specific coaching recommendations to improve safety:
                   - Speed: ${(selectedDriver.speedFactor * 100).toFixed(0)}%
                   - Braking: ${(selectedDriver.brakingFactor * 100).toFixed(0)}%
                   - Acceleration: ${(selectedDriver.accelerationFactor * 100).toFixed(0)}%
                   
                   Format as bullet points.`;
          break;
      }
  
      // Mock response for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockResponses: Record<string, string> = {
        "risk-summary": `Driver ${selectedDriver.id} has a risk score of ${(selectedDriver.riskScore * 100).toFixed(0)}%, categorized as ${selectedDriver.category}. 
        The driver has taken ${selectedDriver.trips} trips with a premium of $${selectedDriver.premium}. 
        Main risk factors are speed (${(selectedDriver.speedFactor * 100).toFixed(0)}%) and braking (${(selectedDriver.brakingFactor * 100).toFixed(0)}%). 
        Recommendations: Reduce speed during high-traffic times and practice smoother braking.`,
        "premium-analysis": `The premium calculation for ${selectedDriver.id} is based on:
        - Base rate: $500
        - Risk adjustment: +$${Math.floor(selectedDriver.riskScore * 1500)}
        Total: $${selectedDriver.premium}
        
        This is a fair premium based on the driver's risk profile. The main cost drivers are the ${selectedDriver.category} classification and high speed factor.`,
        "coaching": `Personalized coaching tips for ${selectedDriver.id}:
        1. Reduce speed by 5-10 mph, especially during peak hours
        2. Increase following distance to allow for smoother braking
        3. Avoid rapid acceleration when leaving stop signs/lights
        4. Schedule trips outside of high-risk times when possible`
      };
      
      setAiResponse(mockResponses[type] || "Analysis generated successfully");
    } catch (error) {
      setAiResponse("Error generating analysis. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  
  const averageRiskScore = data.length ? data.reduce((sum, driver) => sum + driver.riskScore, 0) / data.length : 0;
  const highRiskCount = data.filter(driver => driver.riskScore > 0.7).length;

  const providerTabs = [
    { value: "overview", label: "Overview" },
    { value: "driver-details", label: "Driver Details" },
    { value: "risk-analysis", label: "Risk Analysis" },
    { value: "premium-calculator", label: "Premium Calculator" },
    { value: "ai-analysis", label: "AI Analysis" }
  ];

  const clientTabs = [
    { value: "my-profile", label: "My Profile" },
    { value: "my-trips", label: "My Trips" },
    { value: "my-premium", label: "My Premium" },
    { value: "coaching", label: "Coaching Tips" }
  ];

  const tabs = userType === 'provider' ? providerTabs : clientTabs;

  return (
    <div className="w-full bg-slate-50 p-4 rounded-lg">
      <div className="flex items-center mb-6 gap-2">
        <Car size={32} className="text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">
          SmartClaim {userType === 'provider' ? 'Dashboard' : 'Portal'}
        </h1>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {userType === 'provider' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Total Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-600" />
                    <div className="text-2xl font-bold"><AnimatedCounter value={data.length} /></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Avg Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-blue-600" />
                    <div className="text-2xl font-bold"><AnimatedCounter value={parseFloat((averageRiskScore * 100).toFixed(0))} /> %</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">High Risk Drivers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                    <div className="text-2xl font-bold"><AnimatedCounter value={highRiskCount} /></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Avg Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                    <div className="text-2xl font-bold">$<AnimatedCounter value={data.reduce((sum, d) => sum + d.premium, 0) / data.length} /></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {userType === 'client' && selectedDriver && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">My Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-blue-600" />
                    <div className="text-2xl font-bold">
                      <AnimatedCounter value={parseFloat((selectedDriver.riskScore * 100).toFixed(0))} />%
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">My Premium</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                    <div className="text-2xl font-bold">
                      ${selectedDriver.premium}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Trips This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Car className="mr-2 h-5 w-5 text-blue-600" />
                    <div className="text-2xl font-bold">
                      {selectedDriver.trips}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <Tabs defaultValue={tabs[0].value} className="w-full">
            <TabsList className="mb-4">
              {tabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {userType === 'provider' && (
              <>
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white">
                      <CardHeader>
                        <CardTitle>Risk Distribution</CardTitle>
                        <CardDescription>Distribution of drivers by risk category</CardDescription>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={riskDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={2}
                              dataKey="value"
                              animationBegin={0}
                              animationDuration={1000}
                            >
                              {riskDistribution.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white">
                      <CardHeader>
                        <CardTitle>Risk vs. Premium</CardTitle>
                        <CardDescription>How risk score affects premium prices</CardDescription>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              type="number" 
                              dataKey="riskScore" 
                              name="Risk Score" 
                              domain={[0, 1]}
                              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                            />
                            <YAxis type="number" dataKey="premium" name="Premium" unit="$" />
                            <Tooltip 
                              cursor={{ strokeDasharray: '3 3' }}
                              formatter={(value: any, name: any) => {
                                if (name === 'riskScore') return [`${(value * 100).toFixed(0)}%`, 'Risk Score'];
                                return [value, 'Premium ($)'];
                              }}
                            />
                            <Scatter
                              name="Drivers"
                              data={data}
                              fill="#8884d8"
                              animationBegin={0}
                              animationDuration={1000}
                            >
                              {data.map((entry: any, index: number) => {
                                let color = '#22c55e';
                                if (entry.riskScore > 0.7) color = '#ef4444';
                                else if (entry.riskScore > 0.3) color = '#f59e0b';
                                
                                return <Cell key={`cell-${index}`} fill={color} />;
                              })}
                            </Scatter>
                          </ScatterChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Top High-Risk Drivers</CardTitle>
                      <CardDescription>Drivers with the highest risk scores</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Driver ID</th>
                              <th className="text-left p-2">Risk Score</th>
                              <th className="text-left p-2">Premium</th>
                              <th className="text-left p-2">Category</th>
                              <th className="text-left p-2">Trips</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data
                              .sort((a, b) => b.riskScore - a.riskScore)
                              .slice(0, 5)
                              .map((driver: any) => (
                                <tr key={driver.id} className="border-b hover:bg-slate-50 cursor-pointer" onClick={() => handleDriverSelect(driver)}>
                                  <td className="p-2">{driver.id}</td>
                                  <td className="p-2">
                                    <span 
                                      className={`px-2 py-1 rounded-full text-white ${
                                        driver.riskScore > 0.7 ? 'bg-red-500' : 
                                        driver.riskScore > 0.3 ? 'bg-amber-500' : 'bg-green-500'
                                      }`}
                                    >
                                      {(driver.riskScore * 100).toFixed(0)}%
                                    </span>
                                  </td>
                                  <td className="p-2">${driver.premium}</td>
                                  <td className="p-2">{driver.category}</td>
                                  <td className="p-2">{driver.trips}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="driver-details" className="space-y-4">
                  {selectedDriver && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-white md:col-span-1">
                          <CardHeader>
                            <CardTitle>Driver Profile</CardTitle>
                            <CardDescription>ID: {selectedDriver.id}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <RiskScoreGauge score={selectedDriver.riskScore} />
                            
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between">
                                <span className="text-slate-500">Risk Category:</span>
                                <span className={`font-medium ${
                                  selectedDriver.category === 'High Risk' ? 'text-red-500' : 
                                  selectedDriver.category === 'Medium Risk' ? 'text-amber-500' : 'text-green-500'
                                }`}>{selectedDriver.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Suggested Premium:</span>
                                <span className="font-medium">${selectedDriver.premium}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-500">Total Trips:</span>
                                <span className="font-medium">{selectedDriver.trips}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-white md:col-span-2">
                          <CardHeader>
                            <CardTitle>Risk Factors</CardTitle>
                            <CardDescription>Main contributing factors to risk score</CardDescription>
                          </CardHeader>
                          <CardContent className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={[
                                  { name: 'Speed', value: selectedDriver.speedFactor },
                                  { name: 'Braking', value: selectedDriver.brakingFactor },
                                  { name: 'Acceleration', value: selectedDriver.accelerationFactor },
                                  { name: 'Time of Day', value: selectedDriver.timeOfDayFactor },
                                ]}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
                                <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(0)}%`} />
                                <Bar
                                  dataKey="value"
                                  fill="#3b82f6"
                                  animationBegin={0}
                                  animationDuration={1000}
                                  isAnimationActive={true}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card className="bg-white">
                        <CardHeader>
                          <CardTitle>Recent Trip History</CardTitle>
                          <CardDescription>Last 15 trips with risk assessment</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={tripData}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
                              <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(0)}%`} />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="riskScore"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                                isAnimationActive={true}
                                animationBegin={0}
                                animationDuration={1000}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>
                
                <TabsContent value="risk-analysis" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-white">
                      <CardHeader>
                        <CardTitle>Risk Score Distribution</CardTitle>
                        <CardDescription>Number of drivers by risk score range</CardDescription>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { range: '0-10%', count: data.filter((d: any) => d.riskScore < 0.1).length },
                              { range: '10-20%', count: data.filter((d: any) => d.riskScore >= 0.1 && d.riskScore < 0.2).length },
                              { range: '20-30%', count: data.filter((d: any) => d.riskScore >= 0.2 && d.riskScore < 0.3).length },
                              { range: '30-40%', count: data.filter((d: any) => d.riskScore >= 0.3 && d.riskScore < 0.4).length },
                              { range: '40-50%', count: data.filter((d: any) => d.riskScore >= 0.4 && d.riskScore < 0.5).length },
                              { range: '50-60%', count: data.filter((d: any) => d.riskScore >= 0.5 && d.riskScore < 0.6).length },
                              { range: '60-70%', count: data.filter((d: any) => d.riskScore >= 0.6 && d.riskScore < 0.7).length },
                              { range: '70-80%', count: data.filter((d: any) => d.riskScore >= 0.7 && d.riskScore < 0.8).length },
                              { range: '80-90%', count: data.filter((d: any) => d.riskScore >= 0.8 && d.riskScore < 0.9).length },
                              { range: '90-100%', count: data.filter((d: any) => d.riskScore >= 0.9).length },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" isAnimationActive={true} animationBegin={0} animationDuration={1000}>
                              {[...Array(10)].map((_, index) => {
                                const colorIndex = Math.min(Math.floor(index / 3), 2);
                                return <Cell key={`cell-${index}`} fill={COLORS[colorIndex]} />;
                              })}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white">
                      <CardHeader>
                        <CardTitle>Premium vs. Risk Category</CardTitle>
                        <CardDescription>Average premium by risk category</CardDescription>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { 
                                category: 'Low Risk', 
                                premium: data.filter((d: any) => d.category === 'Low Risk').reduce((sum: number, d: any) => sum + d.premium, 0) / 
                                        Math.max(1, data.filter((d: any) => d.category === 'Low Risk').length)
                              },
                              { 
                                category: 'Medium Risk', 
                                premium: data.filter((d: any) => d.category === 'Medium Risk').reduce((sum: number, d: any) => sum + d.premium, 0) / 
                                        Math.max(1, data.filter((d: any) => d.category === 'Medium Risk').length)
                              },
                              { 
                                category: 'High Risk', 
                                premium: data.filter((d: any) => d.category === 'High Risk').reduce((sum: number, d: any) => sum + d.premium, 0) / 
                                        Math.max(1, data.filter((d: any) => d.category === 'High Risk').length)
                              },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis unit="$" />
                            <Tooltip formatter={(value: any) => [`$${value.toFixed(0)}`, 'Avg Premium']} />
                            <Bar 
                              dataKey="premium" 
                              isAnimationActive={true} 
                              animationBegin={0} 
                              animationDuration={1000}
                            >
                              <Cell fill={COLORS[0]} />
                              <Cell fill={COLORS[1]} />
                              <Cell fill={COLORS[2]} />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Risk Factors Correlation</CardTitle>
                      <CardDescription>How different factors contribute to risk scores</CardDescription>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[...Array(10)].map((_, i) => {
                            const value = i / 10 + 0.05;
                            return {
                              value: value.toFixed(1),
                              speed: (value * 1.1).toFixed(2),
                              braking: (value * 0.9).toFixed(2),
                              acceleration: (value * 1.05).toFixed(2),
                              timeOfDay: (value * 0.8).toFixed(2)
                            };
                          })}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="value" label={{ value: 'Risk Score', position: 'insideBottomRight', offset: -10 }} />
                          <YAxis label={{ value: 'Factor Contribution', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="speed" stroke="#ef4444" strokeWidth={2} name="Speed" isAnimationActive={true} animationBegin={0} animationDuration={1000} />
                          <Line type="monotone" dataKey="braking" stroke="#3b82f6" strokeWidth={2} name="Braking" isAnimationActive={true} animationBegin={200} animationDuration={1000} />
                          <Line type="monotone" dataKey="acceleration" stroke="#f59e0b" strokeWidth={2} name="Acceleration" isAnimationActive={true} animationBegin={400} animationDuration={1000} />
                          <Line type="monotone" dataKey="timeOfDay" stroke="#22c55e" strokeWidth={2} name="Time of Day" isAnimationActive={true} animationBegin={600} animationDuration={1000} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="premium-calculator" className="space-y-4">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Premium Calculator</CardTitle>
                      <CardDescription>Select a driver to see premium calculation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Driver Selection</h3>
                            <select 
                              className="w-full p-2 border rounded"
                              value={selectedDriver?.id}
                              onChange={(e) => {
                                const driver = data.find((d: any) => d.id === e.target.value);
                                if (driver) handleDriverSelect(driver);
                              }}
                            >
                              {data.map((driver: any) => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.id} - Risk Score: {(driver.riskScore * 100).toFixed(0)}%
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {selectedDriver && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-4">
                                <RiskScoreGauge score={selectedDriver.riskScore} />
                                <div>
                                  <div className="text-lg font-medium">{selectedDriver.category}</div>
                                  <div className="text-slate-500">ID: {selectedDriver.id}</div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span>Risk Score:</span>
                                  <span className="font-medium">{(selectedDriver.riskScore * 100).toFixed(0)}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Trip Count:</span>
                                  <span className="font-medium">{selectedDriver.trips}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Base Premium:</span>
                                  <span className="font-medium">$500</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Risk Adjustment:</span>
                                  <span className="font-medium">+${Math.floor(selectedDriver.riskScore * 1500)}</span>
                                </div>
                                <div className="h-px bg-slate-200 my-2"></div>
                                <div className="flex justify-between items-center font-bold">
                                  <span>Total Premium:</span>
                                  <span>${selectedDriver.premium}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                                  Generate Quote
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Premium Breakdown</h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Base Premium', value: 500 },
                                    { name: 'Risk Adjustment', value: selectedDriver ? Math.floor(selectedDriver.riskScore * 1500) : 0 }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  paddingAngle={2}
                                  dataKey="value"
                                  animationBegin={0}
                                  animationDuration={1000}
                                >
                                  <Cell fill="#3b82f6" />
                                  <Cell fill={selectedDriver && selectedDriver.riskScore > 0.7 ? '#ef4444' : selectedDriver && selectedDriver.riskScore > 0.3 ? '#f59e0b' : '#22c55e'} />
                                </Pie>
                                <Tooltip formatter={(value: any) => `$${value}`} />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          
                          <div className="bg-slate-100 p-3 rounded-lg mt-4">
                            <h4 className="font-medium mb-2">Risk Factors Influence</h4>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Speed:</span>
                                  <span>{(selectedDriver?.speedFactor * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${selectedDriver ? selectedDriver.speedFactor * 100 : 0}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Braking:</span>
                                  <span>{(selectedDriver?.brakingFactor * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${selectedDriver ? selectedDriver.brakingFactor * 100 : 0}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Acceleration:</span>
                                  <span>{(selectedDriver?.accelerationFactor * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${selectedDriver ? selectedDriver.accelerationFactor * 100 : 0}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Time of Day:</span>
                                  <span>{(selectedDriver?.timeOfDayFactor * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${selectedDriver ? selectedDriver.timeOfDayFactor * 100 : 0}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50 border-t">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm text-slate-500">Premium calculation based on AI-powered risk model</span>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="ai-analysis" className="space-y-4">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" /> Gemini AI Analysis
                      </CardTitle>
                      <CardDescription>AI-powered insights for this driver</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 mb-4">
                        <button 
                          onClick={() => generateAiAnalysis("risk-summary")}
                          className={`px-3 py-1 rounded ${aiTab === "risk-summary" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}
                        >
                          Risk Summary
                        </button>
                        <button 
                          onClick={() => generateAiAnalysis("premium-analysis")}
                          className={`px-3 py-1 rounded ${aiTab === "premium-analysis" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}
                        >
                          Premium Analysis
                        </button>
                        <button 
                          onClick={() => generateAiAnalysis("coaching")}
                          className={`px-3 py-1 rounded ${aiTab === "coaching" ? "bg-blue-100 text-blue-700" : "bg-slate-100"}`}
                        >
                          Coaching Tips
                        </button>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg min-h-32">
                        {isGenerating ? (
                          <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <span className="ml-2">Generating analysis...</span>
                          </div>
                        ) : aiResponse.startsWith('Error:') ? (
                          <div className="bg-red-50 p-4 rounded-lg text-red-600">
                            <AlertTriangle className="inline mr-2" />
                            {aiResponse}
                            <button 
                              onClick={() => generateAiAnalysis(aiTab)}
                              className="ml-4 px-3 py-1 bg-red-100 rounded hover:bg-red-200"
                            >
                              Retry
                            </button>
                          </div>
                        ) : aiResponse ? (
                          <div className="whitespace-pre-wrap bg-green-50 p-4 rounded-lg">
                            {aiResponse}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-32 text-gray-400">
                            <MessageSquare className="mr-2" />
                            Select an analysis type to generate insights
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
            
            {userType === 'client' && (
              <>
                <TabsContent value="my-profile" className="space-y-4">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>My Risk Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <RiskScoreGauge score={selectedDriver.riskScore} />
                          <div className="mt-4 text-center">
                            <div className="text-lg font-medium">
                              {selectedDriver.category}
                            </div>
                            <div className="text-slate-500">
                              Driver ID: {selectedDriver.id}
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3">
                          <h3 className="font-medium mb-3">Risk Factors</h3>
                          <div className="space-y-4">
                            {[
                              { name: 'Speed', value: selectedDriver.speedFactor, color: 'bg-red-500' },
                              { name: 'Braking', value: selectedDriver.brakingFactor, color: 'bg-blue-500' },
                              { name: 'Acceleration', value: selectedDriver.accelerationFactor, color: 'bg-amber-500' },
                              { name: 'Time of Day', value: selectedDriver.timeOfDayFactor, color: 'bg-green-500' },
                            ].map((factor) => (
                              <div key={factor.name}>
                                <div className="flex justify-between mb-1">
                                  <span>{factor.name}</span>
                                  <span>{(factor.value * 100).toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${factor.color}`}
                                    style={{ width: `${factor.value * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="my-trips" className="space-y-4">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>My Recent Trips</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tripData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 1]} tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} />
                          <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(0)}%`} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="riskScore"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Trip Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Date</th>
                              <th className="text-left p-2">Risk Score</th>
                              <th className="text-left p-2">Distance</th>
                              <th className="text-left p-2">Duration</th>
                              <th className="text-left p-2">Hard Brakes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tripData.map((trip: any) => (
                              <tr key={trip.tripId} className="border-b hover:bg-slate-50">
                                <td className="p-2">{trip.date}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-white ${
                                    trip.riskScore > 0.7 ? 'bg-red-500' : 
                                    trip.riskScore > 0.3 ? 'bg-amber-500' : 'bg-green-500'
                                  }`}>
                                    {(trip.riskScore * 100).toFixed(0)}%
                                  </span>
                                </td>
                                <td className="p-2">{trip.distance} miles</td>
                                <td className="p-2">{trip.duration} min</td>
                                <td className="p-2">{trip.hardBrakes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="my-premium" className="space-y-4">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>My Premium Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">How Your Premium is Calculated</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Base Premium:</span>
                              <span>$500</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk Adjustment:</span>
                              <span>+${Math.floor(selectedDriver.riskScore * 1500)}</span>
                            </div>
                            <div className="h-px bg-slate-200 my-2"></div>
                            <div className="flex justify-between font-bold">
                              <span>Your Premium:</span>
                              <span>${selectedDriver.premium}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Base Premium', value: 500 },
                                  { name: 'Risk Adjustment', value: Math.floor(selectedDriver.riskScore * 1500) }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                <Cell fill="#3b82f6" />
                                <Cell fill={
                                  selectedDriver.riskScore > 0.7 ? '#ef4444' : 
                                  selectedDriver.riskScore > 0.3 ? '#f59e0b' : '#22c55e'
                                } />
                              </Pie>
                              <Tooltip formatter={(value: any) => `$${value}`} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="coaching" className="space-y-4">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" /> Driving Coaching Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <button 
                        onClick={() => generateAiAnalysis("coaching")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                      >
                        Generate Personalized Tips
                      </button>
                      
                      <div className="bg-slate-50 p-4 rounded-lg min-h-32">
                        {isGenerating ? (
                          <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            <span className="ml-2">Generating tips...</span>
                          </div>
                        ) : aiResponse ? (
                          <div className="whitespace-pre-wrap bg-green-50 p-4 rounded-lg">
                            {aiResponse}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-32 text-gray-400">
                            <MessageSquare className="mr-2" />
                            Click the button to get personalized driving tips
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </>
      )}
    </div>
  );
};

export default InsuranceRiskDashboard;