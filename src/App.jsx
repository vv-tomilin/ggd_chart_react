import { useState, useEffect } from "react";
import "./App.css";

import dataExtractor from "./utils/dataExtractor";

import * as XLSX from "xlsx";

import GGDChart from "./components/GGDChart";

const App = () => {
  const [parsedData, setParsedData] = useState([]);
  const [data, setData] = useState([]);

  const handleFileUpload = (inputEvent) => {
    const file = inputEvent.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setParsedData(parsedData);
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    const res = dataExtractor(parsedData);
    setData(res);
  }, [parsedData]);

  return (
    <div className="App">
      <h1>Сетевой график</h1>
      <div className="App-cahrt">
        <GGDChart data={data} />
      </div>

      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default App;
