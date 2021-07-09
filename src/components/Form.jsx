import React from 'react';
import { useForm } from 'react-hook-form';

const Form = (props) => {
    const defaultValues = props.person || {};

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues,
    });

    const beforeToday = (value) => new Date(value).getTime() < Date.now() - 18 * 365.25 * 24 * 3600 * 1000;
    const phoneRegExp = () => /^0[0-9]-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$/i;
    const emailRegExp = () =>
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    function onSubmit(data) {
        console.log('Le formulaire a été validé avec succès !', data);
        props.onValidation(data);
    }

    const isEditForm = Object.keys(defaultValues).length > 0;

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='flex flex-col items-start justify-center m-2 sm:flex-row'>
                <label
                    htmlFor='Civilité'
                    className='whitespace-nowrap px-2 pt-2 w-full text-lg text-left cursor-pointer sm:w-52 sm:text-right'
                >
                    Civilité :
                </label>
                <div className='w-full sm:w-96 text-left'>
                    <select id='Civilité' className='input w-full' defaultValue='' {...register('gender', { required: true })}>
                        <option disabled></option>
                        <option value='male'>Homme</option>
                        <option value='female'>Femme</option>
                    </select>
                    <div className='mt-1'>
                        {errors.gender?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
                    </div>
                </div>
            </div>

            <FormField
                type='text'
                label='Nom'
                placeholder='SMITH   '
                register={{ ...register('lastname', { required: true }) }}
            >
                {errors.lastname?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
            </FormField>

            <FormField
                type='text'
                label='Prénom'
                placeholder='John'
                register={{ ...register('firstname', { required: true }) }}
            >
                {errors.firstname?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
            </FormField>

            <FormField
                type='email'
                label='Email'
                placeholder='john.smith@example.com'
                register={{ ...register('email', { required: true, pattern: emailRegExp() }) }}
            >
                {errors.email?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
                {errors.email?.type === 'pattern' && <p className='text-red-500'>L'adresse email est invalide !</p>}
            </FormField>

            <FormField
                type='tel'
                label='Téléphone'
                placeholder='07-89-01-23-45'
                register={{ ...register('phone', { required: true, pattern: phoneRegExp() }) }}
            >
                {errors.phone?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
                {errors.phone?.type === 'pattern' && <p className='text-red-500'>Le numéro est invalide !</p>}
            </FormField>

            <FormField
                type='date'
                label='Date de naissance'
                register={{ ...register('birthdate', { required: true, validate: { beforeToday } }) }}
            >
                {errors.birthdate?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
                {errors.birthdate?.type === 'beforeToday' && (
                    <p className='text-red-500'>
                        Le collaborateur doit avoir au moins 18 ans (employer des mineurs est interdit, le saviez-vous?!!)
                    </p>
                )}
            </FormField>

            <FormField type='text' label='Ville' placeholder='Paris' register={{ ...register('city', { required: true }) }}>
                {errors.city?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
            </FormField>

            <FormField
                type='text'
                label='Pays'
                placeholder='France'
                register={{ ...register('country', { required: true }) }}
            >
                {errors.country?.type === 'required' && <p className='text-red-500'>Ce champs est requis !</p>}
            </FormField>

            <FormField
                type='text'
                label='URL de la photo'
                placeholder='https://'
                register={{ ...register('photo') }}
            ></FormField>

            <button type='submit' className='button'>
                {isEditForm ? 'Modifier' : 'Ajouter'}
            </button>
        </form>
    );
};

const FormField = ({ label, type, placeholder, register, children }) => {
    return (
        <div className='flex flex-col items-center justify-center m-2 sm:flex-row'>
            <label
                htmlFor={label}
                className='whitespace-nowrap px-2 pb-1 w-full text-lg text-left cursor-pointer sm:w-52 sm:text-right'
            >
                {label} :
            </label>
            <div className='w-full sm:w-96 text-left'>
                <input type={type} className='input w-full' id={label} required placeholder={placeholder} {...register} />
                <div className='mt-1'>{children}</div>
            </div>
        </div>
    );
};

export default Form;
