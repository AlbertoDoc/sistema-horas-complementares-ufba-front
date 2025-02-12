import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import StudentTopBar from "../components/StudentTopBar";
import { isUserLogged } from "../utils/Helpers";
import { useNavigate } from "react-router-dom";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { getRequestsByUserId } from "../services/getRequestsByUserId";
import { showErrorToast } from "../utils/Toasts";

const StudentHomePage = () => {
  const [requests, setRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeStatus, setActiveStatus] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/')
    } else {
      getRequestsByUserId()
      .then(response => {
        console.log(response)
        let queueCount = 1
        const filteredRequests = response.filter((request) => {
          request.pos = queueCount
          queueCount++
          const matchesSearch = request.id.includes(searchTerm)
          const matchesStatus = !activeStatus || request.status === activeStatus
          return matchesSearch && matchesStatus
        })
        setRequests(filteredRequests)
      })
      .catch(error => showErrorToast(error))
    }
  }, [searchTerm, activeStatus])

  const handleStatusClick = (status) => {
    setActiveStatus((prevStatus) => (prevStatus === status ? null : status))
  }

  return (
    <Container>
      <StudentTopBar userName={"Usuário teste"} />
      <Header>
        <Title>Seus pedidos</Title>
        <SearchContainer>
          <SearchInput>
            <SearchIcon />
            <input placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </SearchInput>
          <StatusLegend>
            {["APROVADO", "REJEITADO", "PENDENTE"].map((status) => (
              <StatusItem key={status} active={activeStatus === status} onClick={() => handleStatusClick(status)}>
                <StatusDot status={status} />
                <span>{status}</span>
              </StatusItem>
            ))}
          </StatusLegend>
        </SearchContainer>
      </Header>

      <RequestsList>
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            status={request.status}
            onClick={() => navigate(`/evaluation/${request.id}/visualization`)}
          >
            <RequestContent>
              <RequestInfo>
                <div className="number">N. {request.id}</div>
                <div>MATRÍCULA: {request.registration}</div>
              </RequestInfo>
              <RequestStatus>
                {request.pos && <div>POSIÇÃO: {request.pos}</div>}
                <div>CH: {request.requestedHours} HORAS</div>
                <div>STATUS: {request.status}</div>
              </RequestStatus>
            </RequestContent>
          </RequestCard>
        ))}
      </RequestsList>
      <Fab color="primary" aria-label="add" style={{position: "absolute", right: "0", margin: "24px"}} onClick={() => navigate("/hours/register")}>
        <AddIcon />
      </Fab>
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const SearchInput = styled.div`
  position: relative;
  width: 260px;
  padding-right: 30px;

  input {
    width: 100%;
    padding: 8px 8px 8px 36px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: #3182ce;
    }
  }

  svg {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: #718096;
    width: 16px;
    height: 16px;
  }
`

const StatusLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const StatusItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`

const StatusDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.status) {
      case "APROVADO":
        return "#2F855A"
      case "PENDENTE":
        return "#2B6CB0"
      case "REJEITADO":
        return "#C53030"
      default:
        return "#718096"
    }
  }};
`

const RequestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 24px;
  padding-right: 24px;
`

const RequestCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  color: white;
  background-color: ${(props) => {
    switch (props.status) {
      case "APROVADO":
        return "#2F855A"
      case "PENDENTE":
        return "#2B6CB0"
      case "REJEITADO":
        return "#C53030"
      default:
        return "#718096"
    }
  }};
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

const RequestContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RequestInfo = styled.div`
  .number {
    font-size: 18px;
    margin-bottom: 4px;
  }
`

const RequestStatus = styled.div`
  text-align: right;
`

export default StudentHomePage