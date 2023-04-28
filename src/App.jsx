import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import TreeGraph from './components/TreeGraph.jsx';

function App() {
  const [loading, setLoading] = useState(null);

  // useEffect(() => {
  //   axios.get('api/test/').then(r => setLoading(r.data));
  // });

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
      <div className="flex justify-between">
        <div className="w-[90%]">
          <Editor apiKey="tyd73in3c1ci1zq65y52urxufz4hnzrln2ha7ameio8nfl9t">

          </Editor>
        </div>

        <div className="w-[20%]">
          <TreeGraph data={data}/>
        </div>
      </div>
    );
  // } else {
  //   return 'loading';
  // }
}

export default App;
