import React from "react";
import { EditorContextProvider, QuestFile, Ui } from "ui";
import { useDropzone } from "react-dropzone";

function App() {
  const [quest, setQuest] = React.useState<QuestFile | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "application/octet-stream": ["bin"] },
    onDragOver: () => null,
    onDragEnter: () => null,
    onDragLeave: () => null,
  });

  return (
    <EditorContextProvider
      data={quest || undefined}
      isLoadedFile={quest !== null}
      handleSaveQuest={(data) => setQuest(data)}
      loadQuest={() => null}
      handleExportQuestInfo={() => null}
      handleUpdateQuest={() => null}
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
