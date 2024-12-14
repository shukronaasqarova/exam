import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function CoinChart({ coinId }) {
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('24h');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function() {
    setIsLoading(true);

    let days = 1;
    if (timeframe === '30d') days = 30;
    if (timeframe === '3m') days = 90;
    if (timeframe === '1y') days = 365;

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setChartData(data.prices);
        setIsLoading(false);
      })
      .catch(function(error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
        setIsLoading(false);
      });
  }, [coinId, timeframe]);

  const options = {
    chart: {
      type: 'line',
      height: 350,
      background: 'transparent',
      toolbar: { show: false }
    },
    theme: { mode: 'dark' },
    stroke: { curve: 'smooth', width: 2 },
    xaxis: {
      type: 'datetime',
      labels: { style: { colors: '#999' } }
    },
    yaxis: {
      labels: {
        style: { colors: '#999' },
        formatter: function(value) { return '$' + value.toFixed(2); }
      }
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'dd MMM yyyy HH:mm' },
      y: { formatter: function(value) { return '$' + value.toFixed(2); } }
    },
    grid: { borderColor: '#333' }
  };

  const series = [{
    name: 'Narx',
    data: chartData.map(function(item) {
      return { x: new Date(item[0]), y: item[1] };
    })
  }];

  return (
    <div className="w-full">
      <div className="mb-4 flex gap-4">
        {['24h', '30d', '3m', '1y'].map(function(tf) {
          return (
            <button
              key={tf}
              onClick={function() { setTimeframe(tf); }}
              className={'px-4 py-2 rounded ' + (timeframe === tf ? 'bg-blue-500' : 'bg-gray-700')}
            >
              {tf === '24h' ? '24 Soat' : tf === '30d' ? '30 Kun' : tf === '3m' ? '3 Oy' : '1 Yil'}
            </button>
          );
        })}
      </div>
      {isLoading ? (
        <div className="text-white text-center">Yuklanmoqda...</div>
      ) : (
        <ReactApexChart options={options} series={series} type="line" height={350} />
      )}
    </div>
  );
}

export default CoinChart;

