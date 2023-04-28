import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import TreeGraph from "./components/TreeGraph.jsx";

function App() {
  const [loading, setLoading] = useState(null);
  const [fileName, setFileName] = useState("");

  // useEffect(() => {
  //   axios.get('api/test/').then(r => setLoading(r.data));
  // });

  const sendFile = (event) => {
    const file = event.target.files[0];
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setFileName("Только .docx");
      return;
    }
    setFileName(file.name);
    setLoading(true);
    const formData = new FormData();
    formData.append(file);
    axios.post("/api/sendfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => setLoading(false));
  };

  const data = {
    name: "Parent",
    children: [
      {
        name: "Child One",
      },
      {
        name: "Child Two",
      },
    ],
  };

  //if (loading !== null) {
  return (
    <>
      <header></header>
      <div className="h-calc flex justify-between">
        <div className="w-[40%] p-[63px] flex justify-between flex-col bg-[#1E1E1E]">
          <div className="h-full">
            <Editor apiKey="tyd73in3c1ci1zq65y52urxufz4hnzrln2ha7ameio8nfl9t"></Editor>
          </div>
          <div className="items-end">
            <div className="flex items-center">
              <img
                src="/reload.png"
                className="bg-[#008000] h-[45px] w-[45px] p-1 rounded-[10px]"
                alt=""
              />
              <span className="pl-[14px]">Обновить MindMap</span>
            </div>
            <div className="pt-[42px] flex items-center">
              <img
                src="/download.png"
                className="bg-[#48CAE4] h-[45px] w-[45px] p-1 rounded-[10px]"
                alt=""
              />
              <label htmlFor="file" className="pl-[14px]">
                {fileName?.length ? fileName : "Загрузка файлов"}
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => sendFile(e)}
                className="pl-[14px] invisible w-0"
              />
            </div>
          </div>
        </div>
        <div className="w-[60%] h-full">{/* <TreeGraph data={data}/> */}</div>
      </div>
    </>
  );
  // } else {
  //   return 'loading';
  // }
}

export default App;
