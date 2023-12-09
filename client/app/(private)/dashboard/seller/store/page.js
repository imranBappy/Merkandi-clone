"use client";

import LeftUser from "@/components/LeftUser";
import StoreAdd from "@/components/Store/StoreAdd";
import Loading from "@/components/common/Loader/Loading";
import { useGetCountriesQuery } from "@/redux/features/country/countryApi";

export default function Store() {
  const { data, error, isLoading } = useGetCountriesQuery();

  if (isLoading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <div className="max-w-screen-xl mx-auto my-4 md:px-8">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/12">
          <LeftUser />
        </div>
        <div className="w-full md:w-9/12 pl-0 md:pl-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.countries.map((country) => (
              <StoreAdd
                key={country._id}
                country={country}
                countries={data?.countries || []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
