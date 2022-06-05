import classNames from "classnames";
import { useContext } from "react";
import { useDropzone } from "react-dropzone";
import { BsUpload } from "react-icons/bs";
import { QuestContext } from "../hooks/quest";

interface DropzoneProps {
  onClick: () => void;
}

export function Dropzone({ onClick }: DropzoneProps) {
  return (
    <div
      className={classNames("border-2 border-dashed w-full h-full flex items-center justify-center p-2 flex-col")}
    >
      <BsUpload size={25} className="my-4" />
      <button onClick={onClick} >Select quest file</button>
    </div>
  );
}
