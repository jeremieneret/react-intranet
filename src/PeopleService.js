import axios from 'axios';
// npm install axios

const SERVER_ENDPOINT = 'http://localhost:9000';

const PeopleService = {
    // Récupérer le tableau des collaborateur depuis le serveur
    fetchAll() {
        return axios
            .get(`${SERVER_ENDPOINT}/collaborateurs`)
            .then((response) => response.data)
            .catch(errorHandler);
    },

    // Récupérer un seul collaborateur
    fetchOne(id) {
        return axios
            .get(`${SERVER_ENDPOINT}/collaborateur/${id}`)
            .then((response) => response.data)
            .catch(errorHandler);
    },

    // Ajouter une nouvelle personne
    add(person) {
        return axios
            .post(`${SERVER_ENDPOINT}/collaborateurs`, {
                gender: person.gender,
                firstname: person.firstname,
                lastname: person.lastname,
                email: person.email,
                phone: person.phone,
                birthdate: person.birthdate,
                city: person.city,
                country: person.country,
                photo: person.photo,
            })
            .then((response) => response.data)
            .catch(errorHandler);
    },

    // Supprimer une personne via son ID
    remove(personId) {
        return axios
            .delete(`${SERVER_ENDPOINT}/collaborateur/${personId}`)
            .then((response) => response.data)
            .catch(errorHandler);
    },

    // Modification d'une personne via son ID
    update(person) {
        return axios
            .put(`${SERVER_ENDPOINT}/collaborateur/${person.id}`, {
                gender: person.gender,
                firstname: person.firstname,
                lastname: person.lastname,
                email: person.email,
                phone: person.phone,
                birthdate: person.birthdate,
                city: person.city,
                country: person.country,
                photo: person.photo,
            })
            .then((response) => response.data)
            .catch(errorHandler);
    },
};

const errorHandler = (err) => {
    const {
        data: { message },
    } = err.response;
    throw new Error(message);
};

export default PeopleService;
