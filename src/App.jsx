import { tree } from "./data";
import { TreeRoot } from "./components/Tree/TreeRoot";

import "./styles.css";

function App() {
  return (
    <main className="app">
      <TreeRoot nodes={tree} />
    </main>
  );
}

export default App;
