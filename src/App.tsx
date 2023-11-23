import { useEffect, useState } from "react";
import axios from "./server/axios";

import "./App.css";

interface DataProps {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  const [data, setData] = useState<DataProps[]>([]);
  const [orderByName, setOrderByName] = useState(true);
  const [search, setSearch] = useState("");

  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error("error: ", err));
  };

  const filterInputData = (data: DataProps[]) => {

    if(search.trim() === ""){
      return data;
    }

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filterUserByName = () => {
    const order = orderByName ? 1 : -1;

    const orderedDatas = data
      .filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .sort((a, b) => a.name.localeCompare(b.name) * order);

    setData(orderedDatas);
    setOrderByName(!orderByName);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filteredData = filterInputData(data);
    setData(filteredData);
  }, [search]);
  return (
    <>
      <div style={{ display: "flex", margin: 20 }}>
        <label htmlFor="search">Filter: </label>
        <input
          name="search"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name"
          type="search"
          value={search}
        />
      </div>
      <table border={1}>
        <thead>
          <tr>
            <th>Id</th>
            <th>
              Name
              <button
                onClick={() => {
                  filterUserByName();
                }}
                style={{background: "green", color: "white", margin: "10px"}}
              >
                Sort
              </button>
            </th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.username}</th>
                <th>{item.email}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
