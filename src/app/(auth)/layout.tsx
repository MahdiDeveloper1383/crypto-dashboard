import Authtab from "@/Components/AuthTab/Authtab";
import React from "react";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <div className="w-full max-w-[600px] min-h-[650px] bg-gray-200 shadow-2xl shadow-amber-50 flex flex-col p-6 gap-8 items-center rounded-2xl mx-auto my-4">
        <Authtab/>
        {children}
      </div>
    </React.Fragment>
  );
}
