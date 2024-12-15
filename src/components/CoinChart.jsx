import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function CoinChart({ coinId }) {
  const [data, setData] = useState([]);
  const [timeframe, setTimeframe] = useState('24h');
  const [loading, setLoading] = useState(true);

  const timeOptions = [
    { label: '24 Hours', value: '24h', days: 1 },
    { label: '30 Days', value: '30d', days: 30 },
    { label: '3 Months', value: '3m', days: 90 },
    { label: '1 Year', value: '1y', days: 365 },
  ];

  useEffect(() => {
    setLoading(true);
    const selectedTime = timeOptions.find((option) => option.value === timeframe);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedTime.days}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.prices.map((p) => ({ x: p[0], y: p[1] })));
        setLoading(false);
      });
  }, [coinId, timeframe]);

  const chartOptions = {
    chart: { 
      type: 'line', 
      background: 'transparent',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: { curve: 'smooth' },
    xaxis: { type: 'datetime' },
    yaxis: { labels: { formatter: (v) => `$${v.toFixed(2)}` } },
    grid: { borderColor: '#333' },
  };

  return (
    <div className="text-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReactApexChart
          options={chartOptions}
          series={[{ name: 'Price', data }]}
          type="line"
          height={350}
        />
      )}
      <div className="mb-4 flex gap-4 justify-center">
        {timeOptions.length > 0 && timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setTimeframe(option.value)}
            className={`px-4 py-2 rounded ${
              timeframe === option.value
                ? 'bg-[#87CEEB] text-black w-[285px] shadow-md'
                : 'bg-transparent border-[#87CEEB] text-white w-[285px]'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CoinChart;

