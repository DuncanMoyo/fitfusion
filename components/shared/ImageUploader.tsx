"use client";

import React, { Dispatch, SetStateAction, useCallback } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

const convertFileToUrl = (file: File) => URL.createObjectURL(file);

type ImageUploadProps = {
  imageUrl: string;
  setImages: Dispatch<SetStateAction<File[]>>;
  onFieldChange: (value: string) => void;
};

const ImageUploader = ({
  imageUrl,
  setImages,
  onFieldChange,
}: ImageUploadProps) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setImages(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            className="h-72"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
