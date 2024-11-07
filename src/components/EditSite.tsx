import React, { useState, Dispatch, SetStateAction } from 'react';
import { MdModeEdit } from "react-icons/md";
import EditSitePopUp from './EditSitePopUp';

interface Site {
    _id: string;
    name: string;
    address: string;
    coordinates: [number, number];
}

interface EditSiteProps {
    site: Site;
    setLoadSite: Dispatch<SetStateAction<boolean>>;
    loadSite: boolean;
}
const EditSite: React.FC<EditSiteProps> = ({ site, setLoadSite, loadSite }) => {
    const [showPopUpUpdate, setShowPopUpUpdate] = useState<boolean>(false);

    return (
        <div>
            <button
                onClick={() => { setShowPopUpUpdate(!showPopUpUpdate) }}
                className="text-gray-500 transition-transform duration-200 transform hover:scale-150 hover:text-gray-800 focus:scale-150 focus:outline-none"
            >
                <MdModeEdit />
            </button>

            {showPopUpUpdate && (
                <EditSitePopUp site={site} onClose={() => {setShowPopUpUpdate(false); setLoadSite(!loadSite)}} setLoadSite={setLoadSite} loadSite={loadSite}/>
            )}
        </div>
    );
};

export default EditSite;
