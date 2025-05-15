import { useEffect, useState } from "react";

export const Countries = () => {
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);
  const handlechange = (e) => {
    setSearchValue(e.target.value);
    const filtered = countries.filter((country) =>
      country.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 10px 10px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <input
          style={{ height: "30px", margin: "10px", width: "40%" }}
          type="text"
          value={searchValue}
          onChange={handlechange}
          placeholder="Search for countries..."
        />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            padding: "0",
            margin: "0",
          }}
        >
          {filteredCountries.map((country) => (
            <div
            className="countryCard"
              style={{
                height: "200px",
                width: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                textAlign: "center",
              }}
              key={country.common}
            >
              <img
                src={country.png}
                height="100px"
                width="100px"
                alt={`${country.common} flag`}
              />
              <h2>{country.common}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
