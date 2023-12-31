"use client";

import LeftUser from "@/components/LeftUser";
import { useGetOrderQuery } from "@/redux/features/order/orderApi";
import React from "react";

const page = ({ params }) => {
  const { data, isLoading, isError, error } = useGetOrderQuery(params.orderId, {
    skip: !params.orderId,
  });

  return (
    <div className="max-w-screen-xl mx-auto py-4 md:px-8">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/12">
          <LeftUser />
        </div>
        <div className="w-full md:w-9/12 pl-0 md:pl-6"></div>
      </div>
    </div>
  );
};

export default page;
