import { useState } from "react";
import axios from "axios";
import "./App.css";

import GGDChart from "./components/GGDChart";

const App = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("Файл не выбран");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3005/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки файла", error);
    }
  };

  return (
    <div className="App">
      <h1>Сетевой график</h1>
      <div className="App-cahrt">
        <GGDChart data={data} />
      </div>

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Загрузить</button>
      </div>
    </div>
  );
};

export default App;
