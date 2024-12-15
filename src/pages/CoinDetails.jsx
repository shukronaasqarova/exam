import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import CoinChart from "../components/CoinChart";

function CoinDetails() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => response.json())
      .then((data) => setCoin(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!coin) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#1a1a1a] min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row p-10 gap-8">
 
        <div className="md:w-[300px]">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-[120px] h-[120px] mb-5"
          />
          <h1 className="text-white text-4xl font-bold mb-4">{coin.name}</h1>
          <p className="text-[#999] text-sm mb-6 leading-relaxed">
            {coin.description.en.split(". ")[0]}...
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-[#999] mr-3 font-semibold">Rank:</span>
              <span className="text-white text-lg">{coin.market_cap_rank}</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#999] mr-3 font-semibold">
                Current Price:
              </span>
              <span className="text-white text-lg">
                ${coin.market_data.current_price.usd.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-[#999] mr-3 font-semibold">Market Cap:</span>
              <span className="text-white text-lg">
                ${coin.market_data.market_cap.usd.toLocaleString()}
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
