import { useEffect, useState } from "react";
import "./App.css";
import Options from "./components/Options";

function App() {
  const [search, setSearch] = useState(""); //store the search element
  const [options, setOptions] = useState([]); //for storing Options
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false); //to show or hide the option field
  const [output, setOutput] = useState(); //for showing output of the selected Element
  const [length, setLength] = useState(5); //for storing the length of options

  //getting user Details
  const handlePropagation = (e) => {
    e.stopPropagation();
    setShow(false);
  };
  const getUser = async () => {};
  useEffect(() => {
    console.log("1");
    async function getUser() {
      const result = await fetch("/users.json");
      const data = await result.json();
      setUsers(data);
    }
    getUser();
  }, []);
  //Loading data on Scroll
  async function loadData() {
    if (users.length < length) {
      return;
    }
    setOptions(users.slice(0, length));
    setLength(length + 5);
  }
  //handling Scroll
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - Math.round(e.target.scrollTop) ===
      e.target.clientHeight;
    if (bottom) {
      loadData();
    }
  };

  //handling Clicking search box
  const handleInput = async (e) => {
    e.stopPropagation();
    loadData();
    setShow(true);
  };

  //handling the change of input field
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
    <div className="App" onClick={handlePropagation}>
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
          <div
            className="search_options"
            onScroll={handleScroll}
            onClick={() => setShow(false)}
          >
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
