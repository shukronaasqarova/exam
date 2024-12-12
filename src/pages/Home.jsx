import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Header from '../components/Header';
import bgImage from '../assets/background.jpg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Coins from '../components/Coins';

function Home() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h")
            .then(response =>
                response.json()
                )
            .then(data => 
                setCoins(data))
            .catch(err => {
                console.log(err);
            })
    }, []);

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
                                        <div className=' text-white shadow-md rounded-lg overflow-hidden text-center'>
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
                <div className='mt-[18px] mb-20'>
                    <Coins />
                </div>
            </div>
        </div>
    );
}

export default Home;