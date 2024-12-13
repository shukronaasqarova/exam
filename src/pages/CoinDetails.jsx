import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then(response => response.json())
      .then(data => setCoin(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!coin) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <Header />
      <div className="flex p-10">
        <div className="w-[300px] pr-10">
          <img
            src={coin.image.large || 'https://via.placeholder.com/150'}
            alt={coin.name}
            className="w-[120px] h-[120px] mb-5"
          />
          <h1 className="text-white text-3xl mb-8">{coin.name}</h1>
          <p className="text-[#999] text-sm mb-3">
            Bitcoin is the first successful internet money based on peer-to-peer technology, whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency.
          </p>
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">Rank:</span>
              <span className="text-white">1</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">Current Price:</span>
              <span className="text-white">${coin.market_data.current_price.usd}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">Market Cap:</span>
              <span className="text-white">${coin.market_data.market_cap.usd.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="flex-1">

          {/* chart alohida component qilib yasalishi kerek! */}
          <div className="bg-[#242424] p-5 rounded-lg h-[400px]">
            
          </div>
          <div className="flex gap-3 mt-5">
            <button className="bg-[#5fb2ff] text-black border-none px-4 py-2 rounded cursor-pointer">
              24 Hours
            </button>
            <button className="bg-transparent text-white border border-[#333] px-4 py-2 rounded cursor-pointer">
              30 Days
            </button>
            <button className="bg-transparent text-white border border-[#333] px-4 py-2 rounded cursor-pointer">
              3 Months
            </button>
            <button className="bg-transparent text-white border border-[#333] px-4 py-2 rounded cursor-pointer">
              1 Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;

