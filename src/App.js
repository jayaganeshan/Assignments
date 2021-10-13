import { useState } from "react";
import "./App.css";
import Options from "./components/Options";

function App() {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const getUser = async () => {
    const data = await fetch("/users.json");
    return await data.json();
  };
  const handleInput = async () => {
    const users = await getUser();
    setOptions(users);
    setShow(true);
  };
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
            <Options details={options} value={setSearch} />
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
