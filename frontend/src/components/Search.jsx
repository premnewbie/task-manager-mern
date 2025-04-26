import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useTaskStore } from "../store/useTaskStore";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { searchTask } = useTaskStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    searchTask(debouncedTerm);
  }, [debouncedTerm, searchTask]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="flex justify-center  w-[80%] lg:w-[40%] h-10 rounded-2xl border m-5">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search..."
          className="w-[95%] p-2 focus:outline-none focus:ring-0 focus:border-transparent"
          onChange={handleInputChange}
        />
        <div className="mr-5 flex w-[5%] border-l border-white justify-center items-center">
          <IoSearch size={20} />
        </div>
      </div>
    </div>
  );
};

export default Search;
