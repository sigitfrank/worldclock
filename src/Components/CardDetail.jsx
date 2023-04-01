import { Trash } from 'react-bootstrap-icons';

const CardDetail = ({ data, toggleModal, deleteable = true, setSelectedClock }) => {
    return <div className='card-detail'>
        <div className={`item left`}>
            {data?.abbr}
        </div>
        {
            deleteable && <div className="item right">
                <Trash className='text-danger' onClick={() => {
                    toggleModal('delete', true)
                    setSelectedClock(data)
                }} />
            </div>
        }
    </div>
}

export default CardDetail