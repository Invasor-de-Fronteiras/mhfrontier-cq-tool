import React from "react";
import { EditorContextProvider, Ui } from "ui";
import data from "./64554d1-musous.json";
import { useDropzone } from "react-dropzone";

function App() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "application/octet-stream": ["bin"] },
    onDragOver: () => null,
    onDragEnter: () => null,
    onDragLeave: () => null,
  });

  return (
    <EditorContextProvider
      data={data}
      handleSaveQuest={() => null}
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
  );
}

export default App;
