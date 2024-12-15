import React, { createContext, useState, useContext, useEffect } from 'react';

const WatchlistContext = createContext();

export default function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(() => {
        const saved = localStorage.getItem('watchlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlist = (coinId) => {
        setWatchlist(prev => 
            prev.includes(coinId)
                ? prev.filter(id => id !== coinId)
                : [...prev, coinId]
        );
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
}

export function useWatchlist() {
    return useContext(WatchlistContext);
}