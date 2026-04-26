import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const AiDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // We fetch from your Node.js Bridge (Port 8000)
        fetch("http://localhost:8000/api/ai-insights", { 
            credentials: "include" 
        })
        .then(res => {
            if (!res.ok) throw new Error("Could not reach Node server");
            return res.json();
        })
        .then(result => {
            if (result.status === "success") {
                setData(result.insights);
            } else if (result.status === "error") {
                setError(result.message);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Dashboard Fetch Error:", err);
            setError("Connection to AI engine failed.");
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-indigo-600 bg-zinc-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                <p className="font-medium animate-pulse">Running Python Data Analysis...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700">
                <h3 className="font-bold">AI Analysis Error</h3>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-slate-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Financial Intelligence</h1>
                <p className="text-slate-500">FastAPI + Scikit-Learn Predictive Insights</p>
            </header>

            {/* TOP INSIGHT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-indigo-600 uppercase mb-1">AI 30-Day Forecast</p>
                    <p className="text-3xl font-bold text-slate-900">${data?.predictedNextMonth || 0}</p>
                    <p className="text-xs text-slate-400 mt-2">Predicted spending based on current trend</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-rose-600 uppercase mb-1">Anomalies Detected</p>
                    <p className="text-3xl font-bold text-slate-900">{data?.anomalyCount || 0}</p>
                    <p className="text-xs text-slate-400 mt-2">Transactions significantly above your average</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Avg. Transaction</p>
                    <p className="text-3xl font-bold text-slate-900">${data?.averageSpend || 0}</p>
                    <p className="text-xs text-slate-400 mt-2">Your historical mean expense</p>
                </div>
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 uppercase tracking-wider">Spending Distribution</h3>
                    
                    {/* Fixed Height Container for Recharts */}
                    <div style={{ width: '100%', height: 350 }}>
                        {data?.categoryDistribution && data.categoryDistribution.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie 
                                        data={data.categoryDistribution} 
                                        innerRadius={70} 
                                        outerRadius={100} 
                                        paddingAngle={8} 
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <div className="text-4xl mb-2">📊</div>
                                <p>Add at least 1 expense category to see the chart.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl shadow-xl text-white flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-4">Data Science Summary</h3>
                    <p className="text-indigo-100 mb-6 leading-relaxed">
                        Your data is currently being processed by a <strong>Linear Regression</strong> model. 
                        We analyze the relationship between time and your spending amounts to project 
                        future outflows.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <span className="bg-white/20 p-2 rounded-lg">📈</span>
                            <span><strong>Trend:</strong> {data?.predictedNextMonth > data?.averageSpend * 30 ? "Spending is trending upward." : "Spending is stable."}</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="bg-white/20 p-2 rounded-lg">🎯</span>
                            <span><strong>Accuracy:</strong> Improves with more historical transactions.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AiDashboard;