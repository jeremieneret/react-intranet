import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card';
import PeopleService from '../PeopleService';

const List = () => {
    const [people, setPeople] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filterName, setFilterName] = useState('name');
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    useEffect(() => {
        PeopleService.fetchAll()
            .then((peopleData) => setPeople(peopleData))
            .catch((err) => setErrorMessage('Erreur serveur : Impossible de récupérer les collaborateurs'));
    }, []);

    function onSearch(event) {
        setSearchText(event.target.value);
    }

    function changeFilter(event) {
        setFilterName(event.target.value);
    }

    const filteredPeople = people?.filter(getFilter(filterName));

    function getFilter(filterName) {
        switch (filterName) {
            case 'name':
                return (person) => (person.firstname + ' ' + person.lastname).toLowerCase().includes(searchText.toLowerCase());

            case 'location':
                return (person) => (person.city + ' ' + person.country).toLowerCase().includes(searchText.toLowerCase());

            default:
                return (person) => true;
        }
    }

    function deletePerson({ id, gender, lastname, firstname }) {
        PeopleService.remove(id)
            .then(() => {
                toast.success(`${firstname} ${lastname} supprimé${gender === 'female' ? 'e' : ''} !`);

                const newPeopleArray = people.filter((person) => person.id !== id);
                setPeople(newPeopleArray);
            })
            .catch((err) => toast.error(err.message));
    }

    function editPerson({ id }) {
        history.push(`/edit/${id}`);
    }

    return (
        <div className='container p-4 m-auto text-center'>
            <h1 className='text-5xl font-semibold mb-6'>Liste des collaborateurs de l'intranet</h1>
            <hr className='mt-4 mb-4' />

            <div className='flex items-center justify-center p-3'>
                <input type='search' className='input w-96' onInput={onSearch} />

                <p className='whitespace-nowrap m-3'>Rechercher par :</p>

                <select className='input w-48' onChange={changeFilter}>
                    <option value='name'>Nom</option>
                    <option value='location'>Localisation</option>
                </select>
            </div>

            {!people && (
                <div className='text-center mt-2'>
                    <FontAwesomeIcon icon={faSync} spin size='2x' className='text-indigo-500' />
                </div>
            )}

            <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
                {errorMessage && <div className='error'>{errorMessage}</div>}
                {filteredPeople &&
                    filteredPeople.map((person) => (
                        <Card person={person} key={person.id} onDelete={deletePerson} onEdit={editPerson} />
                    ))}
            </div>
        </div>
    );
};

export default List;
