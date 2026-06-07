import React from "react";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <div className="w-full max-w-[600px] h-[800px] bg-gray-200 shadow-2xl shadow-amber-50 flex flex-col p-6 gap-3 items-center rounded-2xl mx-auto my-4">
        {children}
      </div>
    </React.Fragment>
  );
}
