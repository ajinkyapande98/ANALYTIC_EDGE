import React, { useState, useEffect, FC, useContext } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import Search from "./Search";
import { DataContext } from "../store/DataContext";

export interface Post {
  id: number;
  title: string;
  body: string;
}

const DataGrid: FC = () => {
  const { users, posts, comments } = useContext(DataContext);

  const [data, setData] = useState<Post[]>([]);
  const [search, setSearch] = useState<Post[]>([]);
  const [filter, setFilter] = useState<Post[]>([]);
  const [isAscending, setIsAscending] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSortDecending = () => {
    if (isAscending === false) {
      setData(data.slice().reverse());
    }
    setIsAscending(true);
  };

  const handleSortASC = () => {
    if (isAscending === true) {
      setData(data.slice().reverse());
    }
    setIsAscending(false);
  };

  console.log(users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_start=${
            (currentPage - 1) * 10
          }&_limit=10`
        );
        const totalPosts = response.headers["x-total-count"];
        setTotalPages(Math.ceil(totalPosts / 10));
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <div className="container mx-auto py-8">
      <div className="border p-4">
        <Search data={data} setData={setSearch} search={search} />
        {/* Display data in a tabular format */}
        <div className="  flex justify-center">
          <div>
            <Sorting
              data={data}
              filter={filter}
              setData={setFilter}
              currentPage={currentPage}
              setTotalPages={setTotalPages}
              handleSortASC={handleSortASC}
              handleSortDecending={handleSortDecending}
            />
          </div>
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Post ID</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {search.length !== 0
            ? search.map((post) => (
                <tr key={post.id}>
                  <td className="border px-4 py-2">{post.id}</td>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">{post.body}</td>
                </tr>
              ))
            : filter.length !== 0
            ? filter.map((post) => (
                <tr key={post.id}>
                  <td className="border px-4 py-2">{post.id}</td>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">{post.body}</td>
                </tr>
              ))
            : data.map((post) => (
                <tr key={post.id}>
                  <td className="border px-4 py-2">{post.id}</td>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">{post.body}</td>
                </tr>
              ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className=" flex justify-end">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DataGrid;
