"use client";
import AdminBer from "@/components/admin/AdminBer";
import AddContry from "@/components/Country/AddCountry";
import Country from "@/components/Country/Country";
import { useState } from "react";

export default function Countrypage() {
  const [country, setCountry] = useState({
    name: "",
    shortName: "",
    code: "",
    currency: "",
    currencyCode: "",
    currencySymbol: "",
    phoneCode: "",
    flag: "",
  });

  const [flag, setFlag] = useState([]);

  const handleEdit = (item) => {
    setCountry({
      _id: item._id,
      name: item.name,
      description: item.description || "",
    });

    if (item.logo) {
      setLogo([item.logo]);
    }
    if (item.banner) {
      setBanner([item.banner]);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto my-1 md:px-8">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full md:w-3/12">
          <AdminBer />
        </div>
        <div className="w-full md:w-9/12 pl-0 md:pl-6">
          <div className="flex flex-col md:flex-row items-start">
            <div className="w-full md:w-3/6 pr-0 md:mr-8">
              <h1 className="text-md font-semibold mb-2 block">Add Country</h1>
              <AddContry
                countryState={[country, setCountry]}
                flagState={[flag, setFlag]}
              />
            </div>
            <div className="w-full md:w-3/6">
              <div>
                <h1 className="text-md font-semibold mb-2 block">
                  All Country
                </h1>
                <Country handleEdit={handleEdit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
