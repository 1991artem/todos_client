import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const emailHandler = (value: string) =>{
    setEmail(value)
  }

  const passwordHandler = (value: string) =>{
    setPassword(value)
  }

  const buttonHandler = () => {
    console.log(email)
    if(email && password) {
      localStorage.setItem('user', JSON.stringify({email, password}))
    }
    navigate('/todos')
  }
  return (
    <div className='auth-form'>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event)=>emailHandler(event.target.value)}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event)=>passwordHandler(event.target.value)}/>
        </Form.Group>
        <Button variant="primary" onClick={buttonHandler}>
          Login
        </Button>
      </Form>
    </div> 
    );
}

export default Login;