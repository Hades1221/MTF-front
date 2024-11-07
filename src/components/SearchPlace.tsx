import React, { useRef, useCallback } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

interface SearchPlaceProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
}

const SearchPlace: React.FC<SearchPlaceProps> = ({ onPlaceSelected }) => {
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const onPlacesChanged = useCallback(() => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      onPlaceSelected(places[0]);
    }
  }, [onPlaceSelected]);

  return (
    <div className="w-full">
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for a place"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default SearchPlace;
