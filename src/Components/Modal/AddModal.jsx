import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Select from 'react-select';
import { allowedCities } from '../../namespaces/namespace';
import { getLocalStorage, getRandomColor, getTime, getTimeDiff } from '../../utils/utils';
import { keyOtherResidence } from '../../App';
import { useCreateClock } from '../../hooks/useOtherClock';

const validation = (formState, setFormState) => {
    const newFormState = { ...formState }
    const { city, label } = newFormState
    city.error = false
    label.error = false
    if (!city.value) city.error = true
    if (label.value.length > 20) label.error = true
    setFormState(newFormState)
    const errors = Object.values(newFormState).map(s => s.error)
    return !errors.includes(true)
}

const initState = {
    city: {
        label: "",
        timezone: "",
        value: "",
        error: false,
    },
    label: {
        value: '',
        error: false,
    }
}

const AddModal = ({ show, toggleModal, onCreateClock }) => {
    const [formState, setFormState] = useState(initState)
    const { city, label } = formState

    const handleChange = ({ name, value }) => {
        const newformState = { ...formState }
        const error = formState[name].error
        newformState[name] = typeof value === 'object' ? { ...value, error } : { value, error }
        setFormState(newformState)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validation(formState, setFormState)
        if (!isValid) return
        try {
            const newOtherResidence = await useCreateClock(formState)
            onCreateClock(newOtherResidence)
        }
        catch (error) {
            console.log('error', error)
        }
        toggleModal('add', false)
        setFormState(initState)
    }

    let initOtherResidence = getLocalStorage(keyOtherResidence)
    if (!initOtherResidence) initOtherResidence = '[]'
    const otherResidences = JSON.parse(initOtherResidence).map(r => r.city)
    const filteredAlloweCities = allowedCities.filter(c => !otherResidences.includes(c.value))
    return <Modal show={show} onHide={() => toggleModal('add', false)} centered>
        <Modal.Header closeButton>
            <Modal.Title>Add New Clock</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder="City"
                        isClearable
                        isSearchable
                        name="city"
                        value={city}
                        options={filteredAlloweCities}
                        onChange={(value, event) => {
                            handleChange({
                                name: event.name,
                                value,
                            })
                        }}
                    />
                    {city.error && <small className='text-danger'>City is required</small>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="short-label">
                    <Form.Label>Label</Form.Label>
                    <Form.Control type="text" autoComplete={'off'} onChange={({ target: { name, value } }) => handleChange({ name, value })} name="label" value={label.value} placeholder="Short label" />
                    <div className={`d-flex justify-content-${label.error ? 'between' : 'end'}`}>
                        {label.error && <small className='text-danger'>Label characters is exceeded</small>}
                        <small className='text-muted'>Characters left: {20 - label.value.length}</small>
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => toggleModal('add', false)}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Modal.Footer>
        </Form>
    </Modal>
}

export default AddModal