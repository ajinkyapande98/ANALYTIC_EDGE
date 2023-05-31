import React, { FC } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface SortingProp {
  data: Post[];
  currentPage: number;
  setData: React.Dispatch<React.SetStateAction<Post[]>>;
  filter: Post[];
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  handleSortASC: () => void;
  handleSortDecending: () => void;
}
const Sorting: FC<SortingProp> = ({
  data,
  currentPage,
  filter,
  setData,
  setTotalPages,
  handleSortASC,
  handleSortDecending,
}) => {
  const sortPostsByTitle = () => {
    const sortedPosts = [...data].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setData(sortedPosts);
  };
  const sortPostsByBody = () => {
    const sortedPosts = [...data].sort((a, b) => a.body.localeCompare(b.body));
    setData(sortedPosts);
  };

  const handleClearFilter = () => {
    setData([]);
  };

  return (
    <div className="flex space-x-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={sortPostsByTitle}
      >
        Sort by Title
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={sortPostsByBody}
      >
        Sort by Body
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSortASC}
      >
        Sort Ascending
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSortDecending}
      >
        Sort Descending
      </button>

      {filter.length === 0 ? null : (
        <button
          className=" border-violet-700 border p-2"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default Sorting;
