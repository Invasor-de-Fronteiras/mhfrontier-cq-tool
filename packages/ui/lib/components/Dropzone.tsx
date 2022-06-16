import classNames from "classnames";
import { BsUpload } from "react-icons/bs";
import { useEditor } from "../context/EditorContext";

export function Dropzone() {
  const { uploadFile } = useEditor();

  return (
    <div
      className={classNames(
        "border-2 border-dashed w-full h-full flex items-center justify-center p-2 flex-col",
        {
          "border-blue-600 bg-blue-200": uploadFile.isDragActive,
        }
      )}
      {...uploadFile.uploadFileContainerProps()}
    >
      <BsUpload size={25} className="my-4" />
      <input {...uploadFile.uploadFileInputProps()} className="hidden" />
      <h3>
        {uploadFile.isDragActive ? "Drop the file here" : "Choose a File"}
      </h3>
    </div>
  );
}
