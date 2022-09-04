import AdaptiveChipList from "src/components/AdaptiveChipList";
import ResizableContainer from "src/components/ResizableContainer";

import "./App.scss";

const MOCK_CHIPS = [
  { label: "TEST", color: "red" },
  { label: "GREEN", color: "green" },
  { label: "BLUE", color: "blue" },
  { label: "TEST", color: "red" },
  { label: "GREEN", color: "green" },
  { label: "BLUE", color: "blue" },
  { label: "TEST", color: "red" },
  { label: "GREEN", color: "green" },
  { label: "BLUE", color: "blue" },
  { label: "TEST", color: "red" },
  { label: "GREEN", color: "green" },
  { label: "BLUE", color: "blue" },
  { label: "TEST", color: "red" },
  { label: "GREEN", color: "green" },
  { label: "BLUE", color: "blue" },
];

function App() {
  return (
    <div className="App">
      AdaptiveChipList:
      <br />
      <div style={{ width: 300 }}>
        <AdaptiveChipList condensed chipsData={MOCK_CHIPS} />
      </div>
      <br />
      <div style={{ width: 500 }}>
        <AdaptiveChipList condensed chipsData={MOCK_CHIPS} />
      </div>
      <br />
      <div style={{ width: 700 }}>
        <AdaptiveChipList condensed chipsData={MOCK_CHIPS} />
      </div>
      <br />
      <ResizableContainer>
        {({ width }) => (
          <AdaptiveChipList
            key={width} // Avoid using a ResizeObserver. Force re-render when parent width changes.
            condensed
            chipsData={MOCK_CHIPS}
          />
        )}
      </ResizableContainer>
      <br />
      <ResizableContainer initWidth="50%">
        {({ width }) => (
          <AdaptiveChipList
            key={width} // Avoid using a ResizeObserver. Force re-render when parent width changes.
            condensed
            chipsData={MOCK_CHIPS}
          />
        )}
      </ResizableContainer>
      <br />
      <div style={{ width: "70%" }}>
        <AdaptiveChipList condensed chipsData={MOCK_CHIPS} />
      </div>
    </div>
  );
}

export default App;
