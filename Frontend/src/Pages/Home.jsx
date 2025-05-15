import React, { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Globe from "react-globe.gl";
import Card from "../Components/Card";

const Home = () => {
  const [datas, setData] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [languageFilter, setLanguageFilter] = useState("");

  const [isFullWidth, setIsFullWidth] = useState(true);
  const globeRef = useRef();

  useEffect(() => {
    const fetchAllCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setAllCountries(data);
        setData(data);

        const uniqueRegions = [
          "All Regions",
          ...new Set(data.map((c) => c.region).filter(Boolean)),
        ];
        setRegions(uniqueRegions);

        const langSet = new Set();
        data.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => langSet.add(lang));
          }
        });
        setLanguages(Array.from(langSet));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchAllCountries();
  }, []);

  useEffect(() => {
    const fetchByName = async () => {
      if (searchTerm.trim() === "") {
        if (regionFilter === "All Regions") {
          setData(allCountries);
        } else {
          fetchCountriesByRegion(regionFilter);
        }
      } else {
        try {
          const res = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}`);
          if (!res.ok) throw new Error("Not found");
          const data = await res.json();
          setData(data);
        } catch (error) {
          console.error("Error fetching by name:", error);
          setData([]);
        }
      }
    };

    fetchByName();
  }, [searchTerm]);

  const fetchCountriesByRegion = async (region) => {
    if (region === "All Regions") {
      setData(allCountries);
      return;
    }

    try {
      const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching by region:", error);
    }
  };

  const handleRegionChange = (region) => {
    setRegionFilter(region);
    if (region === "All Regions") {
      setData(allCountries);
    } else {
      fetchCountriesByRegion(region);
    }
  };

  const filteredByLanguage = datas.filter((country) => {
    if (!languageFilter) return true;
    return Object.values(country.languages || {}).includes(languageFilter);
  });

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {!isFullWidth && (
        <div
          style={{
            width: "50vw",
            height: "100vh",
            backgroundColor: "#1a1a1a",
            overflow: "auto",
          }}
        >
          <div className="bg-white p-6 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />

              {/* Region Filter */}
              <select
                value={regionFilter}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Language Filter */}
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              {/* Google Login */}
              <div className="flex justify-center sm:justify-end">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const token = credentialResponse.credential;
                    const decoded = jwtDecode(token);
                    console.log("Decoded User Info:", decoded);
                  }}
                  onError={() => console.log("Login Failed")}
                />
              </div>
            </div>
          </div>

          <Card datas={filteredByLanguage} />
        </div>
      )}

      {/* Globe Section */}
      <div
        style={{
          width: isFullWidth ? "100vw" : "15vw",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundImage:
            "url('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "width 0.5s ease-in-out",
          position: "relative",
        }}
      >
        {/* Toggle Globe Button */}
        <button
          onClick={() => setIsFullWidth(!isFullWidth)}
          style={{
            position: "absolute",
            left: isFullWidth ? "118px" : "40px",
            top: isFullWidth ? "600px" : "80px",
            zIndex: 10,
            padding: "10px 15px",
            backgroundColor: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isFullWidth ? "Shrink Globe" : "Expand Globe"}
        </button>

        <div style={{ width: "90%", height: "100%" }}>
          {/* <Globe ... /> */}
        </div>

        <div
          className={`absolute text-white font-extralight ${
            !isFullWidth ? "top-10 left-10 text-2xl" : "left-30 top-30 text-7xl"
          }`}
        >
          GoFIND-WORLD
          <span
            className={`mt-6 font-sans w-[400px] text-lg pl-1 ${
              !isFullWidth ? "hidden" : "block"
            }`}
          >
            Discover the world like never before. Explore every country with
            in-depth insights into their capital cities, currencies, religions,
            languages, translations, and precise geographic coordinates. From
            bustling urban centers to remote hidden gems, uncover the unique
            stories, cultures, and traditions that shape our global tapestry.
            Whether you're a curious traveler, an eager student, or simply
            passionate about diverse civilizations, this interactive globe
            transforms your screen into a window to the world—bringing rich
            knowledge and boundless discovery to your fingertips, one nation at
            a time.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
