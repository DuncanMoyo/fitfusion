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
    <main className="bg-slate-50 flex h-64 flex-col items-center justify-between p-6 md:p-2">
      <UploadDropzone
      className="h-48 md:h-56"
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
