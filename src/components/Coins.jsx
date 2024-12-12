import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaEye } from "react-icons/fa";

function Coins() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const coinsPerPage = 10;

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h")
            .then(response => response.json())
            .then(data => setCoins(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastCoin = currentPage * coinsPerPage;
    const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
    const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen py-10">
            <h3 className='text-center font-light text-4xl text-white mb-8'>Cryptocurrency Prices by Market Cap</h3>

            <div className='flex justify-center items-center mb-8'>
                <div className='relative'>
                    <input className='bg-transparent border-2 border-gray-600 w-[1040px] py-2 px-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600' 
                        type="text" 
                        placeholder='Search For a Crypto Currency...' 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <FaSearch className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400' />
                </div>
            </div>

            <div className='overflow-x-auto'>
                <table className='table-auto w-full max-w-5xl mx-auto text-white text-center'>
                    <thead>
                        <tr className='bg-gray-800'>
                            <th className='py-3 px-4 text-sm'>Coin</th>
                            <th className='py-3 px-4 text-sm'>Price</th>
                            <th className='py-3 px-4 text-sm'>24h Change</th>
                            <th className='py-3 px-4 text-sm'>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCoins.map((coin) => (
                            <tr key={coin.id} className='border-b border-gray-700'>
                                <td className='py-4 px-4 flex items-center justify-start space-x-2'>
                                    <img src={coin.image} alt={coin.name} className='w-8 h-8' />
                                    <span>{coin.name}</span>
                                </td>
                                <td className='py-4 px-4 text-lg'>₹ {coin.current_price.toFixed(2)}</td>
                                <td className={`py-4 px-4 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    <FaEye />
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td className='py-4 px-4 text-lg'>₹ {coin.market_cap.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex justify-center mt-8'>
                <ul className="flex space-x-2">
                    {Array.from({ length: Math.ceil(filteredCoins.length / coinsPerPage) }, (_, index) => (
                        <li key={index + 1}>
                            <button
                                onClick={() => paginate(index + 1)}
                                className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-white'}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Coins;
