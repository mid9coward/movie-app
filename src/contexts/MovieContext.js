import React, { createContext, useContext, useState } from "react";
import apiService from "../api/apiServices";

const MovieContext = createContext();

const defaultValues = {
  movieList: [],
  isLoading: false,
};

const MovieProvider = ({ children }) => {
  const [state, setState] = useState(defaultValues);

  const searchMovies = async (query) => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await apiService.get(`/search/movie`, {
        params: {
          query: query,
          api_key: "3b0459ad1660cdf7e146e31bccfeb9c6",
        },
      });

      console.log("API response:", response.data);

      setState({ movieList: response.data.results, isLoading: false });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      setState((prevState) => ({ ...prevState, isLoading: false }));
      return [];
    }
  };

  return (
    <MovieContext.Provider value={{ state, searchMovies, setState }}>
      {children}
    </MovieContext.Provider>
  );
};

const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie must be used within a MovieProvider");
  }
  return context;
};

export { MovieContext, MovieProvider, useMovie };
