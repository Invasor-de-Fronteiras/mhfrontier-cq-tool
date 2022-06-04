import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { BsUpload } from "react-icons/bs";

export function Dropzone() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "application/octet-stream": ["bin"] },
    onDragOver: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
  });

  return (
    <div
      className={classNames("border-2 border-dashed w-full h-full flex items-center justify-center p-2 flex-col", {
          "border-blue-600 bg-blue-200": isDragActive,
      })}
      {...getRootProps()}
    >
      <BsUpload size={25} className="my-4" />
      <input {...getInputProps({})} />
      <h3>{isDragActive ? "Drop the file here" : "Choose a File"}</h3>
    </div>
  );
}
