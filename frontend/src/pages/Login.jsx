import { useState } from 'react';
import { SignupFrom, Heading, FormContainer, SignupButton } from '../global/Style';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authslices';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, token } = await dispatch(login({ email, password })).unwrap();

      // ✅ yahan token ko manually cookie me save karo
      Cookies.set('token', token, {
        expires: 1, // 1 din
        secure: false, // localhost pe false rakho
        sameSite: 'lax',
      });

      // ✅ role check
      const commonDashboardRoles = ['manager', 'admin'];
      if (commonDashboardRoles.includes(user.role)) {
        navigate('/dashboard');
      } else if (user.role === 'salesman') {
        navigate('/salesdashboard');
      } else {
        setMessage('Unauthorized role');
      }
    } catch (err) {
      setMessage(err || 'Login failed');
    }
  };

  return (
    <SignupFrom>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <Heading>Login</Heading>
      <FormContainer onSubmit={handleLogin}>
        <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <SignupButton type="submit">Login</SignupButton>
      </FormContainer>
    </SignupFrom>
  );
}

export default Login;
