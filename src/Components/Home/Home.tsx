
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="py-5 bg-light text-center h-100">
      {/* Hero Section */}
      <Container className="mb-5">
        <h1 className="display-4 fw-bold">User Management System</h1>
        <p className="lead text-muted">
          Simplify how you manage users with an intuitive and efficient interface.
        </p>
        <div className="d-flex justify-content-center gap-3 ">
         <Button
  className="btn btn-warning text-white custom-hover"
  size="lg"
  onClick={() => navigate('/dashboard/users-list')}
>
  View Users
</Button>

<Button
  className="btn btn-warning text-white custom-hover"
  size="lg"
  onClick={() => navigate('/dashboard/add-user')}
>
  Add User
</Button>

        </div>
      </Container>

      {/* Feature Section */}
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>View Users</Card.Title>
                <Card.Text>Browse all users with details like name, email, and username.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Add Users</Card.Title>
                <Card.Text>Add new users with a simple, validated form.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Edit & Delete</Card.Title>
                <Card.Text>Update or remove user information with confirmation prompts.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
