import React, { useState, useEffect } from "react";
import axios from "axios";

const Demo = () => {
  const [query, setQuery] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [expandedIndices, setExpandedIndices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/process_query", { query });
      const newResponse = { query, response: response.data.result };
      setResponseHistory((prevHistory) => [...prevHistory, newResponse]);
      setQuery("");
    } catch (error) {
      console.error("Error sending query:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/get_history");
        setResponseHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    }

    fetchHistory();
  }, []);

  const toggleMessageExpansion = (index) => {
    if (expandedIndices.includes(index)) {
      setExpandedIndices(expandedIndices.filter((i) => i !== index));
    } else {
      setExpandedIndices([...expandedIndices, index]);
    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Input Form */}
      <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          className="peer h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center focus:outline-none"
        >
          <p>↵</p>
        </button>
      </form>

      {/* Message History */}
      <div className="message-history mt-8 space-y-4">
        {responseHistory.map((entry, index) => (
          <div
            key={index}
            className={`message-entry p-4 bg-gray-100 rounded-lg space-y-2 ${expandedIndices.includes(index) ? "expanded" : ""}`}
          >
            {/* User Query */}
            <div
              className="flex justify-start items-center cursor-pointer"
              onClick={() => toggleMessageExpansion(index)}
            >
              <p className="font-semibold">You:</p>
              <p className="ml-2 font-bold">{entry.query}</p>
            </div>

            {/* Server Response */}
            {expandedIndices.includes(index) && (
              <div>
                <p className="font-semibold">BIZ AI:</p>
                <p className="ml-2">{entry.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && <div className="loader"></div>}
    </section>
  );
};

export default Demo;
