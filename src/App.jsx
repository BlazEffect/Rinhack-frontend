import "./App.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "./components/Modal";
import { Editor } from "@tinymce/tinymce-react";
import TreeGraph from "./components/TreeGraph.jsx";
import fakedata from './fakedata.json';
import MindMap from "./components/MindMap";
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState({});
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [nodeText, setNodeText] = useState('');
  const [nodeTitle, setNodeTitle] = useState('');
  const [text, setText] = useState('');
  const editorRef = useRef(null);
  // useEffect(() => {
  //   axios.get('api/test/').then(r => setLoading(r.data));
  // });

  const checkErrors = () => {
    axios.get('/api/getdocs').then(({data}) => {
      if(data?.["Error"] === 'unableToFetchFilePath') {
        toast.error('Неправильный формат!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }
      if(data?.["Error"] === 'unableToDefineFileFormat') {
        toast.error('Поддерживаются файлы в формате .docx', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    })
  }

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
    formData.append('document', file);
    axios.post("/api/sendfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(({data}) => {
      if(data?.['Error']) {
        checkErrors();
      }
      setLoading(false)
    });
  };

  const refreshMindMap = () => {
    if(text?.length) {
      axios.post('/api/refreshMindMap', text).then(({data}) => {
        if(data?.["Error"]) {
          checkErrors();
        }
      })
    }
  }

  const openModal = (node) => {
    setNodeText(node.text);
    setNodeTitle(node.topic);
    setIsOpen(true);
  }

  const initialValue = `
    <p>1. Пример форматирования</p>
    <p>1.1 По началу идут заголовки</p>
    <p>1.2 Обязательно проставлять цифры перед заголовками</p>
    <p>1.3 Каждый подпункт является дочерним корневого</p>
    Под заголовками можно писать текст
  `;

  //if (loading !== null) {
  return (
    <>
      <header></header>
      <div className="h-calc flex justify-between">
        <div className="w-[40%] change-width p-[63px] flex justify-between flex-col bg-[#1E1E1E]">
          <div className="h-full">
            <Editor 
              outputFormat='text'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={initialValue}
              onEditorChange={(newValue, editor) => {
                setText(editor.getContent({format: 'text'}))
              }} 
              apiKey="tyd73in3c1ci1zq65y52urxufz4hnzrln2ha7ameio8nfl9t"></Editor>
          </div>
          <div className="items-end">
            <div className="flex items-center cursor-pointer" onClick={refreshMindMap}>
              <img
                src="/reload.png"
                className="bg-[#008000] h-[45px] w-[45px] p-1 rounded-[10px]"
                alt=""
              />
              <span className="pl-[14px]">Обновить MindMap</span>
            </div>
            <div className="pt-[42px] flex items-center">
              <label htmlFor="file" className="flex items-center cursor-pointer">
              <img
                src="/download.png"
                className="bg-[#48CAE4] h-[45px] w-[45px] p-1 rounded-[10px]"
                alt=""
              />
                <span className="pl-[14px]">{fileName?.length ? fileName : "Загрузка файла"}</span>
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
        <div className="w-[60%] change-width overflow-y-auto h-full flex">
          <MindMap data={data} handleClick={(node) => openModal(node)} />
        </div>
      </div>
      <Modal open={isOpen} handleClose={() => setIsOpen(false)} text={nodeText} title={nodeTitle} />
      <ToastContainer />
    </>
  );
  // } else {
  //   return 'loading';
  // }
}

export default App;
