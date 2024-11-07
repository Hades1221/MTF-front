import React, { useState, ChangeEvent, useEffect } from 'react'
import { fetchSites, searchSite } from '../redux/usersSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

const SearchSite: React.FC = () => {

  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const InputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (searchInput.trim()) {
      const searchCriteria = { searchTerm: searchInput };
      dispatch(searchSite(searchCriteria));
    } else {
      dispatch(fetchSites());
    }
  }, [searchInput, dispatch]);

  return (
    <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
      <input
        type="text"
        onChange={InputChange}
        value={searchInput}
        placeholder="Search site"
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default SearchSite