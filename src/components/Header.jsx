import React from 'react';

const Header = ({ selectedCurrency, setSelectedCurrency }) => {
  return (
    <header className="flex justify-around items-center text-white py-4">
      <div>
        <h2 className='text-2xl font-bold text-[#87CEEB]'>CRYPTOFOLIO</h2>
      </div>
      <div className="flex justify-center gap-5">
        <button className='bg-[#87CEEB] py-2 px-5 font-medium rounded-md'>WATCH LIST</button>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
          className="bg-gray-700 p-2 text-white rounded"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="chf">CHF</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
