import React from "react";
import {BsUpload} from 'react-icons/bs';

function App() {
  return (
    <div className="flex flex-col items-center justify-center mt-6 px-2">
      <div className="flex flex-col items-center justify-center bg-white p-6 border rounded w-full max-w-2xl">
        <h1 className="font-bold text-2xl text-center">MHFrontier Custom Quest Editor</h1>
        <p>Create and edit custom quests for MHFrontier.</p>
        <div className="flex flex-col md:flex-row gap-6 mt-3 w-full">
          <div className="initial-card">
            <h3 className="text-center">Select a quest file from your machine.</h3>
            <div className="initial-card-body">
              <div className="border border-dashed w-full h-full flex items-center justify-center p-2 flex-col">
             <BsUpload size={25} className="my-4"/>
              <h3>Choose a File</h3>
              </div>
            </div>
            <button className="btn" disabled>Load file Content</button>
          </div>
          <div className="initial-card">
            <h3 className="text-center">Use an our template.</h3>
            <div className="initial-card-body">
            <fieldset>
              <legend className="font-normal mb-2">Select a template</legend>
            <select className="border w-full p-2">
              <option>Jungle</option>
              <option>Desert</option>
              <option>Swamp</option>
              <option>Snowy Mountains</option>
              <option>Volcano</option>
              <option>Tower</option>
              <option>Forest & Hills</option>
              <option>Great Forest</option>
              <option>Gorge</option>
              <option>Small Arena</option>
              <option>Large Arena</option>
              <option>Town</option>
              <option>Fortress</option>
              <option>Castle Schrade</option>
            </select>
            </fieldset>
            </div>
            <button className="btn">Edit Template</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
