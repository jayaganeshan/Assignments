import "../App.css";

function Options({ details, value }) {
  const showElement = (element) => {
    value(element.name);
    console.log(element);
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
