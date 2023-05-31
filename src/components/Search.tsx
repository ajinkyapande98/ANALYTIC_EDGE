import React, { FC, useState } from "react";
import { Post } from "./DataGrid";

interface SearchProps {
  data: Post[];
  setData: React.Dispatch<React.SetStateAction<Post[]>>;
  search: Post[];
}
const Search: FC<SearchProps> = ({ data, setData, search }) => {
  const [mySearchText, setMySearchText] = useState("");

  const handleSearchText = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMySearchText(e.target.value);
  };
  const handleSearch = () => {
    // Filter the data based on the search term
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(mySearchText.toLowerCase()) ||
        item.body.toLowerCase().includes(mySearchText.toLowerCase())
    );
    // Update the component state with the filtered data

    setData(filteredData);
  };

  const handleClearSearch = () => {
    setMySearchText("");
    setData([]);
  };
  return (
    <div className="m-4 ">
      <div className="flex justify-center mt-4 gap-2 m-5">
        <input
          type="text"
          value={mySearchText}
          placeholder="Enter search text"
          className="px-4 py-2 border border-gray-300 rounded w-96"
          onChange={handleSearchText}
        />
        <button
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-yellow-600"
          onClick={handleSearch}
        >
          Search
        </button>
        {search.length === 0 ? undefined : (
          <button
            className=" border-violet-700 border p-2"
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
