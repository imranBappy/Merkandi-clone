"use client";
import {
  usePostBrandMutation,
  useUpdateBrandMutation,
} from "@/redux/features/brand/brandApi";
import React, { useEffect, useState } from "react";
import Toaster from "../common/Toaster/Toaster";
import Button from "../common/Button/Button";
import TextInput from "../common/Input/TextInput";
import ImageManager from "../common/ImageManager";
import { usePostCommentMutation } from "@/redux/features/comment/commentApi";
import {
  usePostCountryMutation,
  useUpdateCountryMutation,
} from "@/redux/features/country/countryApi";

const validate = (country) => {
  const error = {};
  let isError = false;
  if (!country.name) {
    error.name = "Name is required";
    isError = true;
  }
  if (!country.shortName) {
    error.shortName = "Short name is required";
    isError = true;
  }
  if (!country.code) {
    error.code = "Code is required";
    isError = true;
  }
  if (!country.currency) {
    error.currency = "Currency is required";
    isError = true;
  }
  if (!country.currencyCode) {
    error.currencyCode = "Currency code is required";
    isError = true;
  }
  if (!country.currencySymbol) {
    error.currencySymbol = "Currency symbol is required";
    isError = true;
  }
  if (!country.phoneCode) {
    error.phoneCode = "Phone code is required";
    isError = true;
  }
  return { isError, error };
};

const AddContry = ({ countryState, flagState }) => {
  const [error, setError] = useState({
    name: "",
    shortName: "",
    code: "",
    currency: "",
    currencyCode: "",
    currencySymbol: "",
    phoneCode: "",
    flag: "",
  });
  const [country, setCountry] = countryState;
  const [flag, setFlag] = flagState;

  const [addCountry, { data, isLoading, isError }] = usePostCountryMutation();
  const [
    updateCountry,
    { data: updateData, isLoading: updateLogin, isError: updateError },
  ] = useUpdateCountryMutation();

  useEffect(() => {
    if (isError) {
      Toaster({
        type: "error",
        message: error?.data || "Something went wrong",
      });
    }
    if (data?.success && !isLoading && !isError) {
      Toaster({
        type: "success",
        message: "Added successfully",
      });
      setCountry({
        name: "",
        shortName: "",
        code: "",
        currency: "",
        currencyCode: "",
        currencySymbol: "",
        phoneCode: "",
        flag: "",
      });
      setFlag([]);
    }
  }, [data, isLoading, isError, error?.data?.message, setCountry, setFlag]);

  useEffect(() => {
    if (updateError) {
      Toaster({
        type: "error",
        message: updateError?.data || "Something went wrong",
      });
    }
    if (updateData?.success && !updateLogin && !updateError) {
      setCountry({
        name: "",
        shortName: "",
        code: "",
        currency: "",
        currencyCode: "",
        currencySymbol: "",
        phoneCode: "",
        flag: "",
      });
      setFlag([]);

      Toaster({
        type: "success",
        message: "Updated successfully",
      });
    }
  }, [
    updateData,
    updateError?.data,
    updateLogin,
    updateError,
    setCountry,
    setFlag,
  ]);

  const handleChange = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setCountry({ ...country, [name]: value });
    setError({ ...error, [name]: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isError, error } = validate(country);
    setError(error);
    if (isError) return;
    if (flag.length === 0) {
      return setError({ ...error, flag: "Flag is required" });
    }

    if (country._id) {
      return updateCountry({
        id: country._id,
        body: {
          ...country,
          flag: flag[0],
        },
      });
    }
    addCountry({
      ...country,
      flag: flag[0],
    });
  };

  return (
    <div className="w-full mb-4 flex flex-col gap-2">
      <TextInput
        name={"name"}
        value={country.name}
        onChange={handleChange}
        placeholder="Enter country name"
        error={error.name}
      />

      <TextInput
        name={"shortName"}
        value={country.shortName}
        onChange={handleChange}
        placeholder="Enter country short name"
        error={error.shortName}
      />

      <TextInput
        name={"code"}
        value={country.code}
        onChange={handleChange}
        placeholder="Enter country code"
        error={error.code}
      />

      <TextInput
        name={"currency"}
        value={country.currency}
        onChange={handleChange}
        placeholder="Enter country currency"
        error={error.currency}
      />
      <TextInput
        name={"currencyCode"}
        value={country.currencyCode}
        onChange={handleChange}
        placeholder="Enter country currency code"
        error={error.currencyCode}
      />
      <TextInput
        name={"currencySymbol"}
        value={country.currencySymbol}
        onChange={handleChange}
        placeholder="Enter country currency symbol"
        error={error.currencySymbol}
      />
      <TextInput
        name={"phoneCode"}
        value={country.phoneCode}
        onChange={handleChange}
        placeholder="Enter country phone code"
        error={error.phoneCode}
      />
      <ImageManager
        error={error.flag}
        selectedState={flagState}
        label="Choose Logo"
      />

      <Button
        className={" w-full"}
        disabled={isLoading}
        onClick={handleSubmit}
        label={"Save"}
      />
    </div>
  );
};

export default AddContry;
