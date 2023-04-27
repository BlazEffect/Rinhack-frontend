import "./App.css";
import TreeGraph from "./components/TreeGraph";

function App() {
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

  return (
    <TreeGraph data={data} />
  )
}

export default App;
