import Kanban from "./components/kanban/index";

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Drag and Drop
      </h1>
      <Kanban />
    </div>
  );
}

export default App;
