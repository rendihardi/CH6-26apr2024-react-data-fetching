import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
const [error, setError] = useState();

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");

        // logic untuk menangani error fetch
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const resData = await response.json();
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch data please try again later",
        });
      }

      setIsFetching(false);
    }
    fetchData();
  }, []);

  if (error) {
    return <Error title="Ann error occurred" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Data is fetching..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
