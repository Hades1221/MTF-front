import React, { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers, searchUsers } from '../redux/usersSlice';
import { AppDispatch } from '../redux/store';
const SearchUsers: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch:AppDispatch = useDispatch(); 

// This function saves the written letters from the input to searchInput
  const InputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };


  useEffect(() => {
    if (searchInput.trim()) {
      // Perform the search with the provided input
      const searchCriteria = { inputWords: searchInput };
      dispatch(searchUsers(searchCriteria));
    } else {
      // Fetch all users when the search input is empty
      dispatch(fetchUsers());
    }
  }, [searchInput, dispatch]);

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
  <input
    type="text"
    onChange={InputChange}
    value={searchInput}
    placeholder="Search user"
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

  );
}

export default SearchUsers;
