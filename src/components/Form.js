import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
    name: yup.string().required().min(4).max(30).matches(/^[a-zA-Z]+$/, "Must be a valid name"),
    lastName: yup.string().required().min(4).max(30).matches(/^[a-zA-Z]+$/, "Must be a valid name"),
});

function formatPhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 10)}`;
}

const Form = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmitHandler = (data) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                nombre: data.name,
                apellido: data.lastName,
                telefono: inputValue,
            })
        };
        fetch('http://www.raydelto.org/agenda.php', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: 'The Information have been submitted',
                    text: 'Thank you',
                    icon: 'success',
                    background: '#fff',
                    confirmButtonText: 'Ok',
                    allowOutsideClick: false,
                    backdrop: `
                        rgba(0,0,0,0.4)
                        url("https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif")
                        center left
                        no-repeat
                    `
                })
                reset();
            })

        console.log({ data });
    };

    const [inputValue, setInputValue] = useState("");

    const handleInput = (e) => {
        // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue
        setInputValue(formattedPhoneNumber);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="container">
                <label htmlFor="fname">First Name</label>
                <input type="text" placeholder="Contact first name ..." {...register("name")} required />

                <label htmlFor="lname">Last Name</label>
                <input type="text" placeholder="Contact last name ..." {...register("lastName")} required />

                <label htmlFor="telephone">Telephone</label>
                <input type="text" placeholder="Contact phone number ..." onChange={(e) => handleInput(e)} value={inputValue} required/>
                <br />
                {errors.name || errors.lastName ?
                    <div className="validation">
                        {errors.name && <span className="error">{errors.name.message}</span>}
                        {errors.lastName && <span className="error">{errors.lastName.message}</span>} <br />
                    </div>
                : null}
                <button type="submit" className="submit btn-primary">Add Contact</button>
            </div>
        </form>
    )
}

export default Form;