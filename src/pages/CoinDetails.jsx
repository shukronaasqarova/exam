import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CoinChart from '../components/CoinChart';

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
            src={coin.image.large}
            alt={coin.name}
            className="w-[120px] h-[120px] mb-5"
          />
          <h1 className="text-white text-3xl mb-8">{coin.name}</h1>
          <p className="text-[#999] text-sm mb-3">
            {coin.description.en.split('. ')[0]}...
          </p>
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">Rank:</span>
              <span className="text-white">{coin.market_cap_rank}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">Current Price:</span>
              <span className="text-white">${coin.market_data.current_price.usd.toFixed(2)}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">Market Cap:</span>
              <span className="text-white">${coin.market_data.market_cap.usd.toLocaleString()}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-[#999] mr-3">24h Change:</span>
              <span className={`text-${coin.market_data.price_change_percentage_24h > 0 ? 'green' : 'red'}-400`}>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <CoinChart coinId={id} />
        </div>
      </div>
    </div>
  );
}

export default CoinDetails;

