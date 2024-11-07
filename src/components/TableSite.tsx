import React, { useEffect } from 'react';
import { SyncLoader } from 'react-spinners';
import EditSite from './EditSite';
import DeleteSite from './DeleteSite';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchSites } from '../redux/usersSlice';

interface TableSideProps {
  loadSite: boolean;
  setLoadSite: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableSide: React.FC<TableSideProps> = ({ loadSite, setLoadSite }) => {
  const dispatch: AppDispatch = useDispatch();

  const sites = useSelector((state: RootState) =>
    state.sites.filteredSites && state.sites.filteredSites.length > 0
      ? state.sites.filteredSites
      : state.sites.sites
  );
  const loading = useSelector((state: RootState) => state.sites.loading);
  const error = useSelector((state: RootState) => state.sites.error);

  useEffect(() => {
    dispatch(fetchSites()).then((result) => {
      console.log('Fetched Sites:', result);
    });
  }, [dispatch, loadSite]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <SyncLoader color="#87ab65" margin={6} size={30} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Name</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Address</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Coordinates</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Status</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Creation Date</th>
            <th className="py-2 px-4 border-b text-center text-xs sm:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {sites.length > 0 ? (
            sites.map((site) => (
              <tr key={site._id}>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.name}</td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.address}</td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                  {Array.isArray(site.coordinates) ? site.coordinates.join(", ") : site.coordinates}
                </td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">{site.status}</td>
                <td className="py-2 px-4 border-b text-center text-xs sm:text-base truncate">
                  {new Date(site.creationDate).toLocaleDateString()}
                </td>
                <td className="flex gap-2 items-center justify-center py-2 px-4 border-b text-center">
                  <DeleteSite siteId={site._id} onDelete={() => console.log('Deleted', site._id)} setLoadSite={setLoadSite} loadSite={loadSite} />
                  <EditSite site={site} setLoadSite={setLoadSite} loadSite={loadSite} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-2 px-4 text-center text-xs sm:text-base">
                No sites found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSide;
