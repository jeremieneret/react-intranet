import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Form from '../components/Form';
import Card from '../components/Card';
import PeopleService from '../PeopleService';
import { toast } from 'react-toastify';

const Edit = () => {
    const { id } = useParams();
    const [person, setPerson] = useState();
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    useEffect(() => {
        PeopleService.fetchOne(id).then((personData) => setPerson(personData));
    }, [id]);

    function editPerson(updatedPerson) {
        PeopleService.update(updatedPerson)
            .then(({ message }) => {
                toast.success(message);
                history.push('/list');
            })
            .catch((err) => setErrorMessage(err.message));
    }

    return (
        <div className='container m-auto text-center'>
            <h1 className='text-5xl font-semibold mb-6'>Modifier un collaborateur</h1>
            <hr className='mt-4 mb-4' />

            {person && (
                <div className='flex justify-center mb-8'>
                    <Card person={person} />
                </div>
            )}

            {errorMessage && <div className='error'>{errorMessage}</div>}
            {person && <Form person={person} onValidation={editPerson} />}
        </div>
    );
};

export default Edit;
