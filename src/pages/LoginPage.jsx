import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { validateEmail, validateUFBAEmail } from '../utils/Helpers'
import { TextField } from "@mui/material";
import { login } from "../services/login";
import { showErrorToast } from "../utils/Toasts";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  function handleLoginClick() {
    console.log(email)
    console.log(password)

    let valid = true;

    if (email === '') {
      setEmailError('O e-mail não pode ser vazio.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('E-mail inválido.');
      valid = false
    } else if (!validateUFBAEmail(email)) {
      setEmailError('Utilize o email @ufba.br.');
      valid = false
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('A senha não pode ser vazia.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve conter mais de 6 caracteres.');
    } else {
      setPasswordError('');
    }

    if (valid) {
      login(email, password)
      .then((response) => {
        navigate('/home')
      })
      .catch((error) => {
        console.log(error)
        showErrorToast(error)
      })
    }
  }

  return (
    <Root>
      <LoginDiv>
        <LoginForm>
          <h1>Login</h1>
          <TextField
            id="outlined-helperText"
            style={{paddingBottom: '10px'}}
            label="E-mail"
            helperText={emailError ? emailError : "Utilize o seu e-mail institucional"}
            value={email}
            error={emailError !== ''}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            id="outlined-password-input"
            style={{paddingBottom: '10px'}}
            label="Senha"
            type="password"
            autoComplete="current-password"
            value={password}
            error={passwordError !== ''}
            helperText={passwordError}
            onChange={(event) => setPassword(event.target.value)}
          />

          <p>
            Ainda não possui cadastro?{' '}
            <Link to={'/register'}>Cadastrar</Link>
          </p>

          <Button onClick={() => handleLoginClick()}>Entrar</Button>
        </LoginForm>
      </LoginDiv>
    </Root>
  )
}

const Root = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginDiv = styled.div`
  width: 40%;
  height: auto;
  min-height: 400px;
  min-width: 400px;
  border-radius: 25px;
  border: 6px solid #000000;
  background-color: #EEEEEE;
  align-items: center;
  justify-content: center;
  display: flex
`
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 90%;
  justify-content: space-between;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #088586;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #076969;
  }
`;