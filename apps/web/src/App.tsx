import React from "react";
import { EditorContextProvider, QuestFile, Ui } from "ui";
import data from "./64554d1-musous.json";
import { useDropzone } from "react-dropzone";

function App() {
  const [quest, setQuest] = React.useState<QuestFile>(data);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "application/octet-stream": ["bin"] },
    onDragOver: () => null,
    onDragEnter: () => null,
    onDragLeave: () => null,
  });

  return (
    <EditorContextProvider
      data={quest}
      isLoadedFile={quest !== null}
      handleSaveQuest={(data) => setQuest(data)}
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
