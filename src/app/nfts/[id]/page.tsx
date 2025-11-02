"use client";

import { UseNFT } from '@/react-query/UseNFT';
import React from 'react';

export default function NFT({ id }: { id: string }) {
    const { data: nft, isLoading, error } = UseNFT({ nft: id });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading NFT</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Hero */}
            <div className="flex flex-col md:flex-row gap-6">
                <img src={nft?.image.small} alt={nft?.name} className="w-full md:w-1/2 rounded-lg shadow-lg" />
                <div className="flex-1 space-y-4">
                    <h1 className="text-3xl font-bold">{nft?.name}</h1>
                    <p className="text-xl font-semibold">Price: {nft?.floor_price.native_currency} ETH</p>
                    <div className="flex gap-3 mt-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Buy / Bid</button>
                        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Add to Watchlist</button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Description</h2>
                <p className="text-gray-700">{nft?.description}</p>
            </div>

            {/* Related NFTs */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Related NFTs</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div key={nft?.id} className="border rounded p-2 hover:shadow-md">
                        <img src={nft?.image.small} alt={nft?.name} className="rounded mb-2" />
                        <p className="font-semibold text-center">{nft?.name}</p>
                    </div>
                </div>
            </div>

            {/* Contract Info */}
            <div>
                <h2 className="text-2xl font-bold mb-2">Contract Info</h2>
                <p>Contract Address: {nft?.contract_address}</p>
                <p>Token ID: {nft?.id}</p>
            </div>
        </div>
    );
}
