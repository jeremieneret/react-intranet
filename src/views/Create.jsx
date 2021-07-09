import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Form from '../components/Form';
import PeopleService from '../PeopleService';

const Create = () => {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null);

    function addPerson(data) {
        // Envoyer "data" vers le serveur POST /collaborateurs
        PeopleService.add(data)
            .then(({ message }) => {
                toast.success(message);
                // Redirection vers la page /list
                history.push('/list');
            })
            .catch((err) => setErrorMessage(err.message));
    }

    return (
        <div className='container m-auto text-center'>
            <h1 className='text-5xl font-semibold mb-6'>Ajouter un collaborateur</h1>
            <hr className='mt-4 mb-4' />

            {errorMessage && <div className='error'>{errorMessage}</div>}
            <Form onValidation={addPerson} />
        </div>
    );
};

export default Create;
