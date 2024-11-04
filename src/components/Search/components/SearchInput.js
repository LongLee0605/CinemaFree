import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchSearchResults,
  clearSearchResults,
} from "../../../redux/slices/searchSlice";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim()) {
      dispatch(clearSearchResults()); // Clear previous results
      dispatch(fetchSearchResults({ keyword })); // Fetch new results
      navigate("/search");
    }
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(clearSearchResults());
    navigate("/");
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Nhập từ khóa..."
      />
      <button onClick={handleSearch}>Tìm Kiếm</button>
      <button onClick={handleClear}>Xóa Kết Quả</button>
    </div>
  );
};

export default SearchInput;
