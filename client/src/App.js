import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './Components/Header';
import ImageCard from './Components/ImageCard';
import Search from './Components/Search';
import Welcome from './Components/Welcome';

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.27:5050';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImages([{ ...data, title: word }, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };
  const handleDelete = (id) => {
    let newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };
  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {images.length > 0 ? (
          <Row xs={1} md={2} lg={3}>
            {images.map((image, idx) => {
              return (
                <Col key={idx} className="pb-4">
                  <ImageCard image={image} deleteImage={handleDelete} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
