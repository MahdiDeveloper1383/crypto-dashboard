"use client";
import Footer from "@/Components/layout/Footer";
import Header from "@/Components/layout/Header";
import Pagination from "@/Components/layout/Pagination";
import { usePagination } from "@/Hooks/UsePagition";
import UseNftList from "@/react-query/UseNftList";
import { useRouter } from "next/navigation";
import React from "react";

export default function NFTS() {
  const { data=[] } = UseNftList();
  const router = useRouter()
  const {currentItems:Nfts,currentPage,setCurrentPage,totalPages} = usePagination(data,10)
  return (
    <React.Fragment>
      <Header />
      <div className="mt-10 mb-20">
        <table className="min-w-full h-screen">
          <thead className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-sm ">
            <tr>
              <th className="px-4 py-3 text-center">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Platform</th>
              <th className="px-4 py-3 text-left">symbol</th>
            </tr>
          </thead>
          <tbody>
            {Nfts?.map((nft, index) => (
              <tr onClick={()=>router.push(`nfts/${nft.id}`)}  key={nft.id} className="text-xl cursor-pointer hover:bg-gray-200">
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3 text-left">{nft.name}</td>
                <td className="px-4 py-3 text-left">{nft.contract_address}</td>
                <td className="px-4 py-3 text-left">{nft.asset_platform_id}</td>
                <td className="px-4 py-3 text-left">{nft.symbol}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>
      <Footer />
    </React.Fragment>
  );
}
