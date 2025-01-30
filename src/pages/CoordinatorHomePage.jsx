import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import TopBar from "../components/CoordinatorTopBar";
import { useNavigate } from "react-router-dom";
import { isUserLogged } from "../utils/Helpers";

const CoordinatorHomePage = () => {
  const initialRequests = [
    { number: "5568", registration: "2019215088", hours: 80, status: "ACEITO" },
    { number: "5569", registration: "2019215087", hours: 20, status: "PENDENTE" },
    { number: "5570", registration: "2019215086", hours: 100, status: "REJEITADO" },
    { number: "5571", registration: "2019215016", hours: 30, status: "REJEITADO" },
    { number: "5572", registration: "2018215026", hours: 70, status: "ACEITO" },
    { number: "5573", registration: "2013215012", hours: 25, status: "PENDENTE" },
  ]

  const [requests, setRequests] = useState(initialRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeStatus, setActiveStatus] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/')
    }

    const filteredRequests = initialRequests.filter((request) => {
      const matchesSearch = request.number.includes(searchTerm)
      const matchesStatus = !activeStatus || request.status === activeStatus
      return matchesSearch && matchesStatus
    })
    setRequests(filteredRequests)
  }, [searchTerm, activeStatus])

  const handleStatusClick = (status) => {
    setActiveStatus((prevStatus) => (prevStatus === status ? null : status))
  }

  return (
    <Container>
      <TopBar userName={"Usuário teste"} />
      <Header>
        <Title>Pedidos</Title>
        <SearchContainer>
          <SearchInput>
            <SearchIcon />
            <input placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </SearchInput>
          <StatusLegend>
            {["ACEITO", "REJEITADO", "PENDENTE"].map((status) => (
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
            key={request.number}
            status={request.status}
            onClick={() => console.log(`Clicked on request ${request.number}`)}
          >
            <RequestContent>
              <RequestInfo>
                <div className="number">N. {request.number}</div>
                <div>MATRÍCULA: {request.registration}</div>
              </RequestInfo>
              <RequestStatus>
                <div>CH: {request.hours} HORAS</div>
                <div>STATUS: {request.status}</div>
              </RequestStatus>
            </RequestContent>
          </RequestCard>
        ))}
      </RequestsList>
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
      case "ACEITO":
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
      case "ACEITO":
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

export default CoordinatorHomePage