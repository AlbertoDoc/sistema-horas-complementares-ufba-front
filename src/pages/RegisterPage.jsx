import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import styled from 'styled-components';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('Student');
  const [courseName, setCourseName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const roles = [
    {
      value: 'Student',
      label: 'Estudante'
    },
    {
      value: 'Coordinator',
      label: 'Coordenador'
    }
  ]

  function handleRegistrationClick() {
    console.log(name)
    console.log(email)
    console.log(registrationNumber)
    console.log(selectedRole)
    console.log(courseName)
    console.log(password)
    console.log(confirmPassword)

    // TODO implementar regras de validação dos campos e integração com backend
  }

  return (
    <Root>
      <RegisterDiv>
        <RegisterForm>
          <h1>Cadastro</h1>
          <TextField
            id="outlined-helperText"
            style={{paddingBottom: '10px'}}
            label="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <TextField
            id="outlined-helperText"
            style={{paddingBottom: '10px'}}
            label="E-mail"
            helperText="Utilize o seu e-mail institucional"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <TextField
            id="outlined-helperText"
            style={{paddingBottom: '10px'}}
            label="Número de matrícula"
            value={registrationNumber}
            onChange={(event) => setRegistrationNumber(event.target.value)}
          />

          <TextField
            id="outlined-select-currency"
            style={{paddingBottom: '10px'}}
            select
            label="Perfil"
            defaultValue="Student"
            onChange={(event) => setSelectedRole(event.target.value)}
          >
            {
              roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            }
          </TextField>

          {selectedRole === "Coordinator" && 
            <TextField
              id="outlined-helperText"
              style={{paddingBottom: '10px'}}
              label="Nome do curso"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
          }

          <TextField
            id="outlined-password-input"
            style={{paddingBottom: '10px'}}
            label="Senha"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <TextField
            id="outlined-password-input"
            style={{paddingBottom: '10px'}}
            label="Confirmar senha"
            type="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <Button onClick={() => handleRegistrationClick()}>Cadastrar</Button>
        </RegisterForm>
      </RegisterDiv>
    </Root>
  )
}

const Root = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RegisterDiv = styled.div`
  width: 40%;
  height: 75%;
  min-height: 700px;
  min-width: 400px;
  border-radius: 25px;
  border: 6px solid #000000;
  background-color: #EEEEEE;
  align-items: center;
  justify-content: center;
  display: flex
`
const RegisterForm = styled.div`
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