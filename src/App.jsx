import { useEffect, useState } from 'react';
import CardItem from './Components/CardItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Separator from './Components/Separator';
import DeleteModal from './Components/Modal/DeleteModal';
import { useCurrentClock } from './hooks/useCurrentClock';
import AddButton from './Components/AddButton';
import AddModal from './Components/Modal/AddModal';
import { getLocalStorage, setLocalStorage } from './utils/utils';
import { useGetClocks } from './hooks/useOtherClock';

export const keyOtherResidence = 'otherResidences'

let interval
function App() {
  const [show, setShow] = useState({
    delete: false,
    add: false
  });
  const [selectedClock, setSelectedClock] = useState(null)
  const { otherResidences, setOtherResidences, isLoading: isGetClocksLoading } = useGetClocks()
  const { myResidence, isLoading } = useCurrentClock()

  const toggleModal = (key, value) => {
    setShow(prev => ({ ...prev, [key]: value }))
  };

  const onCreateClock = (newOtherResidence) => {
    const updatedOtherResidences = [...otherResidences, newOtherResidence]
    setLocalStorage(keyOtherResidence, JSON.stringify(updatedOtherResidences))
    setOtherResidences(updatedOtherResidences)
  }

  const onDeleteClock = (selectedClock) => {
    const initOtherResidence = getLocalStorage(keyOtherResidence)
    if (!initOtherResidence) return
    const otherResidences = JSON.parse(initOtherResidence)
    const filteredOtherResidences = otherResidences.filter(r => r.city !== selectedClock.city)
    setOtherResidences(filteredOtherResidences)
    setLocalStorage(keyOtherResidence, JSON.stringify(filteredOtherResidences))
  }

  if (isLoading || isGetClocksLoading) return null

  return (<>
    <div className="App">
      <Container>
        <Row className='d-flex justify-content-center'>
          <Col lg={4}>
            <CardItem data={myResidence} deleteable={false} i={5} />
          </Col>
        </Row>
        <Separator />
        <Row>
          {
            otherResidences.map((residence, i) => {
              return <Col lg={otherResidences.length === 1 ? 4 : 3} key={i}>
                <CardItem toggleModal={toggleModal} data={residence} i={i} setSelectedClock={setSelectedClock} />
              </Col>
            })
          }
          {
            otherResidences.length < 4 && <Col lg={3} className='d-flex justify-content-center align-items-center'><AddButton toggleModal={toggleModal} /></Col>
          }
        </Row>
      </Container>
    </div>
    {
      show.delete && <DeleteModal
        selectedClock={selectedClock}
        show={show.delete}
        toggleModal={toggleModal}
        onDeleteClock={onDeleteClock}
      />
    }
    {show.add && <AddModal
      show={show.add}
      toggleModal={toggleModal}
      onCreateClock={onCreateClock}
    />}
  </>)
}

export default App