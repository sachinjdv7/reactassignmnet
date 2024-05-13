import { useEffect, useState } from "react";
import "./App.css";
import img from "./assets/person-placeholder.jpg";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(5);
  const [error, setError] = useState(null);

  const handleButtonClick = (number) => {
    setNumber(number);
  };

  const fetchUserData = async () => {
    setError("");
    try {
      const response = await axios.get(`https://reqres.in/api/users/${number}`);
      setData(response.data.data);
    } catch (error) {
      //  handle api error message
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [number]);
  return (
    <div>
      <button onClick={() => handleButtonClick(1)}>1</button>
      <button onClick={() => handleButtonClick(2)}>2</button>
      <button onClick={() => handleButtonClick(3)}>3</button>
      <button onClick={() => handleButtonClick(100)}>100</button>
      <div>
        {error && <p>{error}</p>}
        <ul>
          <li>
            Name: {data.first_name} {data.last_name}
          </li>
          <li>Email: {data.email} </li>
        </ul>
      </div>
      <div>
        <img src={data.avatar || img} alt="image" />
      </div>
    </div>
  );
}

export default App;
