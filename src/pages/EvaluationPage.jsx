import { useEffect, useState } from "react"
import styled from "styled-components"
import { TextField, Paper, TextareaAutosize } from "@mui/material"
import CoordinatorTopBar from "../components/CoordinatorTopBar";
import { useNavigate, useParams } from "react-router-dom";
import { isUserLogged } from "../utils/Helpers";
import { getRequestById } from "../services/getRequestById";
import { showErrorToast, showSuccessToast } from "../utils/Toasts";
import { postEvaluation } from "../services/postEvaluation";
import StudentTopBar from "../components/StudentTopBar";

export default function EvaluationPage({ isVisualization }) {
  const [evaluation, setEvaluation] = useState("")
  const { requestId } = useParams();
  const [request, setRequest] = useState({
    activityStartDate: "",
    activityEndDate: "",
    submissionDate: "",
    studentComment: "",
    requestedHours: "",
    name: "",
    email: "",
    activity: "",
    subcategory: "",
    category: "",
    documents: "",
    enrollmentNumber: 0,
    comment: "",
  })

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/')
    } else {
      getRequestById(requestId)
      .then(response => setRequest(response))
      .catch(error => showErrorToast(error))
    }
  }, [])

  function handleAcceptRequest() {
    postEvaluation(requestId, true, evaluation, request.requestedHours)
    .then(response => {
      showSuccessToast("Avaliação submetida com sucesso!")
      navigate("/home")
    })
    .then(error => showErrorToast(error))
  }

  function handleRejectRequest() {
    postEvaluation(requestId, false, evaluation, request.requestedHours)
    .then(response => {
      showSuccessToast("Avaliação submetida com sucesso!")
      navigate("/home")
    })
    .then(error => showErrorToast(error))
  }

  return (
    <Container>
      {localStorage.getItem("role") === "student" ? <StudentTopBar/> : <CoordinatorTopBar /> }
      <Section>
        <Title>Dados do Pedido</Title>
        <Grid>
          <TextField label="Nome do Aluno" value={request.name} fullWidth disabled />
          <TextField label="Data Inicial da Atividade" value={request.activityStartDate} fullWidth disabled />
          <TextField label="Email do Aluno" value={request.email} fullWidth disabled />
          <TextField label="Categoria" value={request.category} fullWidth disabled />
          <TextField label="Data Final da Atividade" value={request.activityEndDate} fullWidth disabled />
          <TextField label="Matrícula" value={request.enrollmentNumber} fullWidth disabled />
          <TextField label="Subcategoria" value={request.subcategory} fullWidth disabled />
          <TextField label="Data de Abertura" value={request.submissionDate} fullWidth disabled />
          <TextField label="Horas" value={request.requestedHours} fullWidth disabled />
          <TextField label="Atividade" value={request.activity} fullWidth disabled />
        </Grid>
      </Section>

      <Section>
        <Title>Link para documentos</Title>
        <TextareaAutosize
          minRows={3}
          placeholder="Insira detalhes da atividade realizada"
          style={{ width: "100%", padding: "8px", marginBottom: "2rem" }}
          name="documents"
          value={request.documents}
          disabled={true}
        />
      </Section>

      <Section>
        <CommentBox elevation={1}>
          <CommentTitle>Comentário do Aluno</CommentTitle>
          <CommentText>{request.studentComment ? request.studentComment : "Nenhum comentário adicionado."}</CommentText>
        </CommentBox>
      </Section>

      {isVisualization == false ? 
      <>
        <Section>
          <Title>Avaliação</Title>

          <TextArea
            placeholder="ADICIONE UM COMENTÁRIO AQUI..."
            value={evaluation}
            onChange={(e) => setEvaluation(e.target.value)}
          />
        </Section>

        <ActionButtons>
          <Button variant="reject" onClick={handleRejectRequest}>REJEITAR PEDIDO</Button>
          <Button variant="accept" onClick={handleAcceptRequest}>ACEITAR PEDIDO</Button>
        </ActionButtons>
      </>
      :
      <>
        <Section>
          <Title>Avaliação</Title>

          <TextArea
            placeholder=""
            value={request.comment ? request.comment : "Pedido não avaliado."}
            onChange={(e) => setEvaluation(e.target.value)}
            disabled
          />
        </Section>
      </>
      }
    </Container>
  )
}

const Container = styled.div`
  margin: 0 auto;
`

const Section = styled.section`
  margin-bottom: 40px;
  margin-left: 40px;
  margin-right: 40px;
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ffd700;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`

const CommentBox = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`

const CommentTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`

const CommentText = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  min-height: 100px;
  resize: vertical;
`

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  margin-bottom: 40px;
`

const Button = styled.button`
  padding: 12px 24px;
  border-radius: ${(props) => (props.variant === "feedback" ? "4px" : "25px")};
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: opacity 0.2s;

  ${({ variant }) =>
    variant === "reject" &&
    `
    background-color: white;
    color: #ff3b30;
    border: 2px solid #ff3b30;
  `}

  ${({ variant }) =>
    variant === "accept" &&
    `
    background-color: #2f7d6e;
    color: white;
  `}

  ${({ variant }) =>
    variant === "feedback" &&
    `
    background-color: #2f7d6e;
    color: white;
    margin-left: auto;
    display: block;
  `}

  &:hover {
    opacity: 0.8;
  }
`