import React from 'react'

const Card = ({ contact }) => {

    return (
            <div className="box">
                <div className="avatar"></div>
                <div className="content">
                    <h3 className="text-content">{contact.nombre} {contact.apellido}</h3>
                    <p>{contact.telefono}</p>
                </div>
            </div>
    )
}

export default Card;