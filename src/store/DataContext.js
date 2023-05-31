import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/api";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  // Add additional state variables for pagination, filtering, sorting, etc. if needed

  useEffect(() => {
    // Fetch data from the JSON Placeholder API and update the state
    const fetchDataFromApi = async () => {
      try {
        const usersData = await fetchData("/users");
        const postsData = await fetchData("/posts");
        const commentsData = await fetchData("/comments");

        setUsers(usersData);
        setPosts(postsData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  //   console.log(users);

  return (
    <DataContext.Provider
      value={{
        users,
        posts,
        comments,
        // Add additional state variables and any functions or actions you want to expose to the components
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
