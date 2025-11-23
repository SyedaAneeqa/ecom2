'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/admin/analytics');
        const data = await res.json();
        if (data.success) setAnalytics(data.analytics);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!analytics) return <p className="p-8">Loading analytics...</p>;

  const renderChart = (title, data) => (
    <div className="mb-8 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <Bar
        data={{
          labels: data.map((d) => d.key),
          datasets: [
            {
              label: 'Profit',
              data: data.map((d) => d.totalProfit),
              backgroundColor: 'rgba(59,130,246,0.7)',
            },
          ],
        }}
        options={{ responsive: true, plugins: { legend: { position: 'top' } } }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">📊 Profit Analytics</h1>
      {renderChart('Profit by Gender', analytics.genderProfit)}
      {renderChart('Profit by Fabric', analytics.fabricProfit)}
      {renderChart('Profit by Category', analytics.categoryProfit)}
      {renderChart('Profit by Season', analytics.seasonProfit)}
    </div>
  );
}
