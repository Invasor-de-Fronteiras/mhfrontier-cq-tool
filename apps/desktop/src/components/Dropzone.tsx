import classNames from "classnames";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { BsUpload } from "react-icons/bs";
import { QuestContext } from "../hooks/quest";

interface DropzoneProps {
  onClick: () => void;
}

export function Dropzone({ onClick }: DropzoneProps) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "application/octet-stream": ["bin"] },
    onDragOver: (e) => {
      console.log('select onDragOver');
      e.preventDefault();
    },
    onDragEnter: (e) => {
      // e.
      console.log('select onDragEnter');
      e.preventDefault();

      onClick();
    },
    onFileDialogOpen: () => {
      console.log('select onFileDialogOpen');
      // e.preventDefault();
    },
    onDragLeave: () => {},
    onDrop: (files) => {
      files.map(v => {
        console.log('files: ', v);
      })
    },
    
  });

  return (
    <div
      className={classNames(
        "border-2 border-dashed w-full h-full flex items-center justify-center p-2 flex-col",
        {
          "border-blue-600 bg-blue-200": isDragActive,
        }
      )}
      // {...getRootProps()}
    >
      <BsUpload size={25} className="my-4" />
      {/* <input {...getInputProps({})} /> */}
      <button onClick={onClick} >Select quest file</button>
      <h3>{isDragActive ? "Drop the file here" : "Choose a File"}</h3>
    </div>
  );
}
