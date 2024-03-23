"use client";

import React, { Dispatch, SetStateAction } from "react";
import { UploadDropzone } from "@/lib/uploadthing";

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
  return (
    <main className="bg-slate-700 flex flex-col items-center justify-between p-10">
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
      />
    </main>
  );
};

export default ImageUploader;
