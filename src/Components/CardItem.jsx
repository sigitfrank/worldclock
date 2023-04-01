import React from 'react'
import Card from 'react-bootstrap/Card';
import '../styles/CardItem.scss'
import CardCircle from './CardCircle';
import CardDetail from './CardDetail';
import CardHeaderOverlay from './CardOverlay';

const CardItem = ({ toggleModal, deleteable, data, i, setSelectedClock }) => {
    if (!data || !data.city) return null
    const imageUrl = `https://picsum.photos/seed/city-${i}/800/600`;
    return (
        <Card className={`card-item`}>
            <Card.Header>
                <CardHeaderOverlay>
                    <span>{data?.city}</span>
                    <span>{data?.description}</span>
                </CardHeaderOverlay>
                <Card.Img loading='lazy' variant="top" src={imageUrl} />
            </Card.Header>
            <CardCircle text={data?.city?.slice(0, 2).toUpperCase()} style={{ background: data.color }} />
            <Card.Body>
                <Card.Title>{data?.time}</Card.Title>
                {
                    data?.timeDiff && <Card.Subtitle>{data?.timeDiff}</Card.Subtitle>
                }

                <CardDetail
                    setSelectedClock={setSelectedClock}
                    toggleModal={toggleModal}
                    deleteable={deleteable}
                    data={data}
                />
            </Card.Body>
        </Card>
    )
}

export default CardItem
