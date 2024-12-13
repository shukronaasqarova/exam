import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from '../components/Header';
import bgImage from '../assets/background.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaEye } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom'; 

function Home() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const coinsPerPage = 10;
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false&price_change_percentage=24h`)
            .then(response => response.json())
            .then(data => {
                setCoins(data);
                const totalCount = 1000; 
                setTotalPages(Math.ceil(totalCount / coinsPerPage));
            })
            .catch(error => console.log(error));
    }, [currentPage]);

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1);
    };

    const handleNavigate = (coinId) => {
        navigate(`/coin/${coinId}`); 
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='mt-3'>
                <div
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                        position: 'relative',
                    }}
                >
                    <div className='z-10 relative'>
                        <h1 className='text-[60px] font-bold text-white text-center'>CRYPTOFOLIO WATCH LIST</h1>
                        <p className='text-sm font-medium text-gray-300 flex justify-center items-center'>Get all the Info regarding your favorite Crypto Currency</p>
                    </div>

                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-full max-w-5xl'>
                            <Slider {...settings}>
                                {coins.map((coin) => (
                                    <div key={coin.id} className='p-4'>
                                        <div className='text-white shadow-md rounded-lg text-center'>
                                            <img
                                                src={coin.image}
                                                alt={coin.name}
                                                className='w-20 h-20 mx-auto mt-4'
                                            />
                                            <h2 className='text-xl font-semibold mt-2'>{coin.name}</h2>
                                            <p className='text-sm text-gray-400'>${coin.current_price.toFixed(2)}</p>
                                            <p className={`text-sm font-medium mt-1 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {coin.price_change_percentage_24h.toFixed(2)}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>

                <div className="min-h-screen py-10">
                    <h3 className="text-center font-light text-4xl text-white mb-8">
                        Cryptocurrency Prices by Market Cap
                    </h3>

                    <div className="flex justify-center items-center mb-8">
                        <div className="relative">
                            <input
                                className="bg-transparent border-2 border-gray-600 w-[1040px] py-2 px-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                type="text"
                                placeholder="Search For a Crypto Currency..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full max-w-5xl mx-auto text-white text-center">
                            <thead>
                                <tr className="bg-gray-800">
                                    <th className="py-3 px-4 text-sm">Coin</th>
                                    <th className="py-3 px-4 text-sm">Price</th>
                                    <th className="py-3 px-4 text-sm">24h Change</th>
                                    <th className="py-3 px-4 text-sm">Market Cap</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoins.length > 0 && filteredCoins.map((coin, index) => (
                                   
                                    <tr
                                        key={coin.id}
                                        className="border-b border-gray-700"
                                        onClick={() => handleNavigate(coin.id)}
                                    >
                                        <td className="py-4 px-4 flex items-center justify-start space-x-2">
                                            <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                                            <span>{coin.name}</span>
                                        </td>
                                        <td className="py-4 px-4 text-lg">$ {coin.current_price.toFixed(2)}</td>
                                        <td className={`py-4 px-4 ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            <FaEye />
                                            {coin.price_change_percentage_24h.toFixed(2)}%
                                        </td>
                                        <td className="py-4 px-4 text-lg">$ {coin.market_cap.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-8">
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            pageCount={totalPages}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName="flex items-center space-x-2"
                            pageClassName="px-3 py-2 rounded-full text-[#87CEEB] cursor-pointer hover:bg-gray-800"
                            activeClassName="bg-gray-800 text-[#87CEEB] font-bold"
                            previousClassName="px-3 py-2 rounded-full text-[#87CEEB] cursor-pointer hover:bg-gray-800"
                            nextClassName="px-3 py-2 rounded-full text-[#87CEEB] cursor-pointer hover:bg-gray-800"
                            breakClassName="px-3 py-2 rounded-full text-[#87CEEB] cursor-pointer hover:bg-gray-800"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
