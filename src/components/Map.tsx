import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, LoadScript, OverlayView } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { renderToString } from 'react-dom/server';
import SearchPlace from './SearchPlace';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 31.7683,
  lng: 35.2137,
};

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
];

const bounds = {
  north: 33.5,
  south: 29.0,
  west: 30.5,
  east: 39.5
};

interface Site {
  _id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

const Map: React.FC = () => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get('https://mtf-server-l03g.onrender.com/api/site/getAllSites');
        if (response.data.isSuccessful) {
          setSites(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
      }
    };

    fetchSites();
  }, []);

  const getIconUrl = () => {
    const iconSvgString = renderToString(<FaMapMarkerAlt size={32} color="red" />);
    return `data:image/svg+xml;base64,${btoa(iconSvgString)}`;
  };

  const createIcon = () => {
    if (window.google && google.maps && google.maps.Size) {
      return {
        url: getIconUrl(),
        scaledSize: new google.maps.Size(32, 32),
      };
    }
    return undefined;
  };

  const handleMarkerClick = (site: Site) => {
    setSelectedSite(site);
  };

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <div className="relative h-full w-full flex flex-col items-center justify-start">
        <div className="absolute top-[30px] right-5 w-80 z-10">
          <SearchPlace
            onPlaceSelected={(place) => {
              if (place.geometry?.location) {
                setMapCenter({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                });
                mapRef.current?.setZoom(15);  // Closer zoom level for better visibility
              }
            }}
          />
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={8}
          options={{
            mapTypeId: 'hybrid',
            styles: mapStyle,
            minZoom: 2,
            maxZoom: 18,
            restriction: {
              latLngBounds: bounds,
              strictBounds: true
            },
            fullscreenControl: false,
            zoomControl: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => { mapRef.current = map }}
        >
          {sites.map(site => (
            <Marker
              key={site._id}
              position={{ lat: site.coordinates[1], lng: site.coordinates[0] }}
              onClick={() => handleMarkerClick(site)}
              icon={createIcon()}
            />
          ))}
          {selectedSite && (
            <OverlayView
              position={{ lat: selectedSite.coordinates[1], lng: selectedSite.coordinates[0] }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className="absolute bg-white shadow-lg rounded p-2 w-64 max-w-[90vw] box-border z-50"
                style={{
                  transform: 'translate(-50%, -100%)'  // Center above the marker
                }}
              >
                <h2 className="font-bold text-lg">{selectedSite.name}</h2>
                <p className="text-sm">{selectedSite.address}</p>
                <p className="text-xs text-gray-500">
                  Coordinates: {selectedSite.coordinates[1]}, {selectedSite.coordinates[0]}
                </p>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="text-blue-500 mt-2 underline"
                >
                  Close
                </button>
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
