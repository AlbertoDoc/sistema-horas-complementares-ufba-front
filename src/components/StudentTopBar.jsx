import styled from "styled-components"
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";

const CoordinatorTopBar = ({ userName }) => {
  const navigate = useNavigate()

  function handleLogoutClick() {
    if (confirm("Você tem certeza que deseja sair?")) {
      localStorage.removeItem("accessToken")
      navigate('/')
    }
  }

  return (
    <TopBarContainer>
      <Logo>UniHoras</Logo>
      <Navigation>
        <NavLink to="/studentHome">Página Inicial</NavLink>
        <NavLink to="/barema">Barema</NavLink>
        <NavLink to="/progress">Progresso</NavLink>
      </Navigation>
      <UserSection>
        <IconButton aria-label="Perfil do usuário">
          <PersonIcon size={20} />
        </IconButton>
        <UserName>{userName}</UserName>
        <IconButton aria-label="Sair" onClick={handleLogoutClick}>
          <LogoutIcon size={20} />
        </IconButton>
      </UserSection>
    </TopBarContainer>
  )
}

const TopBarContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #076969;
  color: white;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

const Navigation = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const UserName = styled.span`
  @media (max-width: 768px) {
    display: none;
  }
`

export default CoordinatorTopBar

