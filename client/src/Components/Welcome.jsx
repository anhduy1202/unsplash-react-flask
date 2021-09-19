import { Jumbotron, Button } from 'react-bootstrap';
const Welcome = () => {
  return (
    <Jumbotron>
      <h1>Images Gallery</h1>
      <p>
        This is a simple application that implements React as frontend and Flask
        as backend
      </p>
      <p>
        <Button variant="primary" href="https://unsplash.com">
          Learn more
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Welcome;
