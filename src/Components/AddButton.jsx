import React from 'react'
import { PlusSquare } from 'react-bootstrap-icons'

const AddButton = ({ toggleModal }) => {
    return <PlusSquare onClick={() => toggleModal('add', true)} className='text-primary' style={
        {
            fontSize: '2rem',
            cursor: 'pointer'
        }
    } />
}

export default AddButton