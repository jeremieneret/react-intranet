import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faListAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className='bg-gradient-to-b from-indigo-400 to-indigo-500 text-black shadow-sm mb-8'>
            <div className='flex flex-col items-stretch text-center justify-center md:flex md:flex-row'>
                <Link to='/' className='pt-3 pb-3 pl-5 pr-5 text-white transition-colors hover:bg-indigo-700'>
                    <FontAwesomeIcon icon={faHouseUser} /> Accueil
                </Link>
                <Link to='/list' className='pt-3 pb-3 pl-5 pr-5 text-white transition-colors hover:bg-indigo-700'>
                    <FontAwesomeIcon icon={faListAlt} /> Liste des collaborateurs
                </Link>
                <Link to='/create' className='pt-3 pb-3 pl-5 pr-5 text-white transition-colors hover:bg-indigo-700 md:ml-auto'>
                    <FontAwesomeIcon icon={faPlusSquare} /> Ajouter un collaborateur
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
