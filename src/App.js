import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { label: "Numbers", value: "numbers" },
    { label: "Alphabets", value: "alphabets" },
    { label: "Highest Lowercase Alphabet", value: "highest_lowercase_alphabet" },
  ];

  useEffect(() => {
    document.title = "RA2111027010048";
  }, []);

  const handleInputChange = (event) => {
    setInputJson(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const jsonData = JSON.parse(inputJson);
      const result = await axios.post('https://backend-bfhl-orpin.vercel.app/api/bfhl', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResponse(result.data);
    } catch (error) {
      alert('Invalid JSON input or API error');
      console.error(error);
    }
  };

  const handleMultiSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map(option => option.value));
  };

  const renderFilteredResponse = () => {
    if (!response || selectedOptions.length === 0) return null;

    return (
      <div>
        <h3>Filtered Response:</h3>
        {selectedOptions.includes("numbers") && (
          <p>Numbers: {JSON.stringify(response.numbers)}</p>
        )}
        {selectedOptions.includes("alphabets") && (
          <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
        )}
        {selectedOptions.includes("highest_lowercase_alphabet") && (
          <p>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bajaj Finserv Health Dev Challenge</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Enter JSON Input:
          <textarea
            value={inputJson}
            onChange={handleInputChange}
            rows="5"
            cols="50"
            placeholder='{ "data": ["A", "B", "C", "z"] }'
            style={styles.textarea}
          />
        </label>
        <br />
        <button type="submit" style={styles.button}>Submit</button>
      </form>

      {response && (
        <div style={styles.responseContainer}>
          <h3>Raw Response:</h3>
          <pre style={styles.pre}>{JSON.stringify(response, null, 2)}</pre>

          <h3>Filter the response:</h3>
          <Select
            isMulti
            options={options}
            onChange={handleMultiSelectChange}
            placeholder="Select filters..."
            styles={styles.select}
          />

          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '10px',
    display: 'block',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  responseContainer: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  pre: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderRadius: '4px',
    overflowX: 'auto',
  },
  select: {
    marginTop: '10px',
    fontSize: '16px',
  },
};

export default App;
