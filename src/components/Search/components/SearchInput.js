import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchSearchResults,
  clearSearchResults,
} from "../../../redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(clearSearchResults());
      dispatch(fetchSearchResults({ keyword }));
      navigate("/search");
    }
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(clearSearchResults());
    navigate("/");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nhập từ khóa..."
        className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
      <button
        onClick={handleSearch}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
      >
        <FiSearch size={20} />
      </button>
      {keyword && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FiX size={20} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
