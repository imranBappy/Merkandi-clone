import s3 from "@/config/awsConfig";
import {
  imageApi,
  useDeleteImageMutation,
  useGetImagesQuery,
} from "@/redux/features/files/imageApi";
import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Loading from "../Loader/Loading";
import { useDispatch } from "react-redux";
import Toaster from "../Toaster/Toaster";

const BrowseImages = ({ tab, selectedState, multiple }) => {
  const [selected, setSelected] = selectedState;

  const [page, setPage] = useState(1);

  const {
    data: imageDate,
    isLoading: imageLoading,
    error,
    refetch,
  } = useGetImagesQuery(1);

  const [deleteImage, { data: deleteData, isLoading: deleteLoading }] =
    useDeleteImageMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page > 1) {
      dispatch(imageApi.endpoints.getMoreImages.initiate(page));
    }
  }, [page, dispatch]);

  const handleDelete = async (img) => {
    // console.log("delete", img);
    try {
      // await s3
      //   .deleteObject({
      //     Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      //     Key: img.name,
      //   })
      //   .promise()
      //   .catch((err) => {
      //     console.log(err);
      //     Toaster({
      //       type: "error",
      //       message: "Error deleting image",
      //     });
      //     return;
      //   })
      //   .then(async (res) => {
      //     console.log(res);

      //   });
      await deleteImage(img._id);
      Toaster({
        type: "success",
        message: "Image deleted successfully",
      });
    } catch (err) {
      Toaster({
        type: "error",
        message: "Error deleting image",
      });
    }
  };

  const isSelected = (item) => {
    return !!selected.find((img) => img._id === item._id);
  };

  const handleSelected = (item) => {
    if (multiple) {
      setSelected((pre) => [...pre, item]);
      if (isSelected(item)) {
        setSelected((pre) => pre.filter((img) => img._id !== item._id));
      }
    } else {
      if (isSelected(item)) {
        setSelected([]);
      } else setSelected([item]);
    }
  };

  const handleNext = () => {
    console.log("next");
    setPage((pre) => pre + 1);
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      handleNext();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className=" w-full p-5  max-h-[calc(100vh-200px)] overflow-y-auto   bg-white  rounded-b-md relative "
    >
      {imageLoading && <Loading />}
      {!imageLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 ">
          {imageDate?.data?.map((item, i) => (
            <ImageCard
              key={item._id}
              src={item.url}
              onDelete={() => handleDelete(item)}
              onSelected={() => handleSelected(item)}
              selected={isSelected(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseImages;
