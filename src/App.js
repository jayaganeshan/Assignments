import { useState } from "react";
import "./App.css";
import Options from "./components/Options";

function App() {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [output, setOutput] = useState();
  //getting user Details
  const getUser = async () => {
    const data = await fetch("/users.json");
    return await data.json();
  };
  //handle Click
  const handleInput = async () => {
    const users = await getUser();
    setOptions(users);
    setShow(true);
  };
  //handleChange
  const handleChange = async (e) => {
    setShow(true);
    setSearch(e.target.value);
    const users = await getUser();
    const opt = users.filter((option) => {
      const regex = new RegExp(`^${e.target.value}`, "gi");
      return option.name.match(regex) || option.username.match(regex);
    });
    setOptions(opt);
  };
  return (
    <div className="App" onClick={() => setShow(false)}>
      <section>
        <label htmlFor="user">Selector</label>
        <div className="dropdown" onClick={handleInput}>
          <input
            type="text"
            value={search}
            id="user"
            placeholder="Search...."
            onChange={handleChange}
          ></input>
        </div>
        {show && (
          <div className="search_options">
            <Options
              details={options}
              value={setSearch}
              setOutput={setOutput}
            />
          </div>
        )}
      </section>
      {output && (
        <div className="output">
          <div>Id: {output.id}</div>
          <div>Name: {output.name}</div>
          <div>Username: {output.username}</div>
          <div>Email: {output.email}</div>
        </div>
      )}
    </div>
  );
}

export default App;
