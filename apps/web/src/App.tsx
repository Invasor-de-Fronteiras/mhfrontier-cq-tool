import React from "react";
import { EditorContextProvider, Ui } from "ui";
import data from "./64554d1-musous.json";
import { useDropzone } from "react-dropzone";

function App() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "application/octet-stream": ["bin"] },
    onDragOver: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
  });

  return (
    <div className="flex items-center justify-center mt-6 h-full w-full">
      <div className="max-w-6xl max-h-6xl">
        <EditorContextProvider
          data={data}
          handleSaveQuest={() => {}}
          onChangeData={(data) => data}
          uploadFile={{
            dragSupport: true,
            isDragActive,
            uploadFileContainerProps: () => getRootProps(),
            uploadFileInputProps: () => getInputProps(),
          }}
        >
          <Ui />
        </EditorContextProvider>
      </div>
    </div>
  );
}

export default App;
