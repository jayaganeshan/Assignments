import "../App.css";

function Options({ details, value, setOutput }) {
  const showElement = (element) => {
    value(element.name);
    setOutput(element);
  };
  return (
    <>
      <div>
        {details.map((element) => (
          <div
            key={element.id}
            className="outline"
            onClick={() => showElement(element)}
          >
            {element.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default Options;
