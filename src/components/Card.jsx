import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Card = ({ person, onDelete, onEdit }) => {
    const { firstname, lastname, photo, city, country, email, phone, birthdate } = person;

    const age = Math.floor((Date.now() - new Date(birthdate).getTime()) / (3600 * 24 * 365.25 * 1000));
    const birthdayString = new Date(birthdate).toLocaleDateString('fr-FR', {
        month: 'long',
        day: 'numeric',
    });

    const photoURL = photo || `https://via.placeholder.com/150?text=${encodeURIComponent(firstname + ' ' + lastname)}`;

    function clickDelete() {
        onDelete(person);
    }

    function clickEdit() {
        onEdit(person);
    }

    return (
        <div className='bg-white shadow-lg m-2 rounded-xl text-left overflow-hidden'>
            <div className='flex'>
                <div>
                    <img src={photoURL} alt='' className='w-52 h-52 object-cover' />
                </div>
                <div className='flex-grow flex flex-col justify-center items-start px-8'>
                    <h2 className='block text-xl leading-tight font-medium text-black'>
                        {firstname} {lastname} <span className='text-gray-500 font-normal text-lg'>({age} ans)</span>
                    </h2>
                    <p className='text-gray-500 text-lg'>
                        {city}, {country}
                    </p>
                    <p className='mt-1 whitespace-nowrap'>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-1 text-gray-500' />
                        <a href={'mailto:' + email} className='text-indigo-500 underline hover:text-indigo-300'>
                            {email}
                        </a>
                    </p>
                    <p className=' whitespace-nowrap'>
                        <FontAwesomeIcon icon={faPhone} className='mr-1 text-gray-500' />
                        <a href={'tel:' + phone} className='text-indigo-500 underline hover:text-indigo-300'>
                            {phone}
                        </a>
                    </p>
                    <p className='text-gray-500 mt-1'>
                        <FontAwesomeIcon icon={faBirthdayCake} /> Anniversaire : {birthdayString}{' '}
                    </p>
                    <div className='mt-2'>
                        {onEdit && (
                            <button className='button-small mr-2 bg-gray-100 rounded-lg p-2' onClick={clickEdit}>
                                Éditer
                            </button>
                        )}
                        {onDelete && (
                            <button className='button-small mr-2 bg-gray-100 rounded-lg p-2' onClick={clickDelete}>
                                Supprimer
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
