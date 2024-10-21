import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import PrepLoader from "../prep-loader/loader";
const Delete = ({ agentId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Hook to handle navigation

  const deleteItem = async () => {
    setIsDeleting(true);

    setError(null);

    try {
      if (!agentId) {
        throw new Error("");
      }

      const response = await fetch(
        `http://13.215.228.42:4001/api/agent/${agentId}/delete/`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        alert("successfully completed.");
      }
      if (!response.ok) {
        throw new Error("");
      }

      // Navigate to the homepage if deletion is successful
      navigate("/");
    } catch (err) {
      setError(err.message);
      alert("An error occurred while delete the form.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div cl>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        style={{
          color: "red",
          padding: "7px",
          border: "none",
          backgroundColor: "red",
          color: "black",
          fontSize: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
        onClick={deleteItem}
        disabled={isDeleting}
        className="w-fit bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {isDeleting ? "Deleting..." : "Delete"} {""}
      </button>

      {isDeleting && (
        <div className="loader">
          <PrepLoader />
        </div> // Display loader when loading
      )}
    </div>
  );
};

export default Delete;
