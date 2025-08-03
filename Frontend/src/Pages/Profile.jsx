import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../Store/authSlice';
import { toast } from 'react-toastify';

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    toast.success('Profile updated successfully');
    const profile  = document.getElementById('edit-profile');
    profile.style.display = 'none';
  };

  const toggleprofile = () => {
    const profile  = document.getElementById('edit-profile');
    profile.style.display = 'block';
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Header>
          <h4 className="mb-0">My Profile</h4>
        </Card.Header>
        <Card.Body>
            <p>Name : {user.name}</p>
            <p>Email Address : {user.email}</p>
            <p>Phone : {user.phone}</p>
            <Button onClick= {toggleprofile} variant="primary">
              Update Profile
            </Button>
        </Card.Body>
      </Card>
      <Card id="edit-profile" className = "my-4" style={{ display: 'none' }}>
        <Card.Header>
          <h4 className="mb-0">My Profile</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;