import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { isOnlyNumbers, validateEmail, validateUFBAEmail } from '../utils/Helpers'
import { register } from "../services/register";
import { showErrorToast, showSuccessToast } from "../utils/Toasts";
import { getCourses } from "../services/getCourses";
import { roles } from '../constants/roles'

export default function RegisterPage() {
  const [courses, setCourses] = useState({id: "0", name: "Selecione um curso"})
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [registrationNumberError, setRegistrationNumberError] = useState('');

  const [selectedRole, setSelectedRole] = useState('student');
  const [selectedRoleError, setSelectedRoleError] = useState('');

  const [selectedCourse, setSelectedCourse] = useState('Selecione um curso')
  const [selectedCourseError, setSelectedCourseError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getCourses().then((response) => {
      setCourses(response)
    })
    .catch((error) => showErrorToast(error))
  }, [])

  function handleRegistrationClick() {
    console.log(name)
    console.log(email)
    console.log(registrationNumber)
    console.log(selectedRole)
    console.log(password)
    console.log(confirmPassword)

    let valid = true;

    let trimName = name.trim()

    if (trimName === '') {
      setNameError('O nome não pode ser vazio.');
      valid = false;
    } else if (trimName.split(' ').length === 1) {
      setNameError('O nome deve conter pelo menos um sobrenome.')
      valid = false;
    } else {
      setNameError('');
    }

    if (email === '') {
      setEmailError('O e-mail não pode ser vazio.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('E-mail inválido.');
      valid = false
    } else if (!validateUFBAEmail(email)) {
      setEmailError('O e-mail deve pertencer ao domínio ufba.br');
      valid = false;
    } else {
      setEmailError('');
    }

    if (registrationNumber === '') {
      setRegistrationNumberError('O número de matrícula não pode ser vazio.');
      valid = false;
    } else if (!isOnlyNumbers(registrationNumber)) {
      setRegistrationNumberError('O número de matrícula não pode conter letras.');
      valid = false;
    } else {
      setRegistrationNumberError('');
    }

    if (selectedRole === '') {
      setSelectedRoleError('O perfil não pode ser vazio.');
      valid = false;
    } else {
      setSelectedRoleError('');
    }

    if (selectedCourse === 'Selecione um curso' && selectedRole === 'student') {
      setSelectedCourseError('Você deve escolher um curso.');
      valid = false;
    } else {
      setSelectedCourseError('');
    }

    if (password === '') {
      setPasswordError('A senha não pode ser vazia.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve conter mais de 6 caracteres.');
    } else {
      setPasswordError('');
    }

    if (confirmPassword === '') {
      setConfirmPasswordError('A confirmação de senha não pode ser vazia.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não coincidem.');
      valid = false;
      return;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      let splitName = name.split(' ')
      let firstName = splitName[0]
      let lastName = splitName.slice(1).join(" ");
      register(firstName, lastName, email, selectedRole, selectedCourse, password, confirmPassword)
      .then(() => {
        navigate('/')
        showSuccessToast('Cadastro concluído com sucesso. Faça o login para entrar na plataforma.')
      })
      .catch((error) => {
        console.log(error)
        showErrorToast(error)
      })
    }
  }

  return (
    <Root>
      <RegisterDiv>
        <RegisterForm>
          <h1>Cadastro</h1>
          <TextField
            id="outlined-helperText"
            style={{paddingBottom: '10px'}}
            label="Nome completo"
            value={name}
            error={nameError !== ''}
            helperText={nameError}
            onChange={(event) => setName(event.target.value)}
          />

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
            id="outlined-helperText"
            style={{paddingBottom: '10px'}}
            label="Número de matrícula"
            value={registrationNumber}
            error={registrationNumberError !== ''}
            helperText={registrationNumberError}
            onChange={(event) => setRegistrationNumber(event.target.value)}
          />

          <TextField
            id="outlined-select-currency"
            style={{paddingBottom: '10px'}}
            select
            label="Perfil"
            defaultValue="student"
            error={selectedRoleError !== ''}
            helperText={selectedRoleError}
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

          {courses.length > 0 && (
              <TextField
                id="outlined-select-currency"
                style={{ paddingBottom: "10px" }}
                select
                label="Curso"
                defaultValue={"Selecione um curso"}
                value={selectedCourse}
                error={selectedCourseError !== ""}
                helperText={selectedCourseError}
                onChange={(event) => setSelectedCourse(event.target.value)}
              >
                <MenuItem key={"0"} value={"Selecione um curso"}>
                  {"Selecione um curso"}
                </MenuItem>
                {courses.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            )
          }

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

          <TextField
            id="outlined-password-input"
            style={{paddingBottom: '10px'}}
            label="Confirmar senha"
            type="password"
            autoComplete="current-password"
            value={confirmPassword}
            error={confirmPasswordError !== ''}
            helperText={confirmPasswordError}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <p>
            Já possui cadastro?{' '}
            <Link to={'/'}>Entrar</Link>
          </p>

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
  height: auto;
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