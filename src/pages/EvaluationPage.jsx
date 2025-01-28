import { useEffect, useState } from "react"
import styled from "styled-components"
import { TextField, Paper } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CoordinatorTopBar from "../components/CoordinatorTopBar";
import { useNavigate } from "react-router-dom";
import { isUserLogged } from "../utils/Helpers";

const mockRequestData = {
  studentName: "João Silva",
  email: "joao.silva@ufba.br",
  registration: "2021001234",
  queuePosition: 5,
  category: "Atividades Acadêmicas",
  subcategory: "Monitoria",
  activityStartDate: "2024-01-01",
  activityEndDate: "2024-01-31",
  openingDate: "2024-01-15",
  documents: [
    {
      id: "doc1",
      name: "Certificado de Monitoria",
      url: "/documents/certificado.pdf",
    },
    {
      id: "doc2",
      name: "Relatório de Atividades",
      url: "/documents/relatorio.pdf",
    },
    {
      id: "doc3",
      name: "Declaração do Professor",
      url: "/documents/declaracao.pdf",
    },
  ],
  studentComment:
    "Solicito a análise das horas complementares referentes à monitoria realizada na disciplina de Programação Web durante o semestre 2023.2.",
  evaluations: [
    {
      id: "eval1",
      comment: "Documentação completa e atividade pertinente à área.",
      date: "2024-01-20",
    },
  ],
}

export default function EvaluationPage() {
  const [requestData, setRequestData] = useState(mockRequestData)
  const [newEvaluation, setNewEvaluation] = useState("")

  const addEvaluation = () => {
    if (!newEvaluation.trim()) return

    const evaluation = {
      id: `eval${Date.now()}`,
      comment: newEvaluation,
      date: new Date().toISOString().split("T")[0],
    }

    setRequestData((prev) => ({
      ...prev,
      evaluations: [...prev.evaluations, evaluation],
    }))
    setNewEvaluation("")
  }

  const deleteEvaluation = (id) => {
    setRequestData((prev) => ({
      ...prev,
      evaluations: prev.evaluations.filter((evaluation) => evaluation.id !== id),
    }))
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/')
    }
  }, [])


  return (
    <Container>
      <CoordinatorTopBar />
      <Section>
        <Title>Dados do Pedido</Title>
        <Grid>
          <TextField label="Nome do Aluno" value={requestData.studentName} fullWidth disabled />
          <TextField label="Posição na Fila" value={requestData.queuePosition} fullWidth disabled />
          <TextField label="Data Inicial da Atividade" value={requestData.activityStartDate} fullWidth disabled />
          <TextField label="Email do Aluno" value={requestData.email} fullWidth disabled />
          <TextField label="Categoria" value={requestData.category} fullWidth disabled />
          <TextField label="Data Final da Atividade" value={requestData.activityEndDate} fullWidth disabled />
          <TextField label="Matrícula" value={requestData.registration} fullWidth disabled />
          <TextField label="Subcategoria" value={requestData.subcategory} fullWidth disabled />
          <TextField label="Data de Abertura" value={requestData.openingDate} fullWidth disabled />
        </Grid>
      </Section>

      <Section>
        <Title>Baixar Documentos Anexados</Title>
        {requestData.documents.map((doc) => (
          <DownloadButton key={doc.id} onClick={() => window.open(doc.url)}>
            <DownloadIcon size={20} />
            {doc.name}
          </DownloadButton>
        ))}
      </Section>

      <Section>
        <CommentBox elevation={1}>
          <CommentTitle>Comentário do Aluno</CommentTitle>
          <CommentText>{requestData.studentComment}</CommentText>
        </CommentBox>
      </Section>

      <Section>
        <Title>Avaliação</Title>

        {requestData.evaluations.map((evaluation) => (
          <EvaluationBox key={evaluation.id} elevation={1}>
            <DeleteButton onClick={() => deleteEvaluation(evaluation.id)}>
              <DeleteIcon size={18} />
            </DeleteButton>
            <CommentText>{evaluation.comment}</CommentText>
            <EvaluationDate>{evaluation.date}</EvaluationDate>
          </EvaluationBox>
        ))}

        <TextArea
          placeholder="ADICIONE UM COMENTÁRIO AQUI..."
          value={newEvaluation}
          onChange={(e) => setNewEvaluation(e.target.value)}
        />
        <Button variant="feedback" onClick={addEvaluation}>
          ADICIONAR FEEDBACK
        </Button>
      </Section>

      <ActionButtons>
        <Button variant="reject">REJEITAR PEDIDO</Button>
        <Button variant="accept">ACEITAR PEDIDO</Button>
      </ActionButtons>
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

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #2f7d6e;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  margin-bottom: 12px;
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #266a5d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    padding: 8px;
    transition: all 0.3s ease;
  }

  &:hover .icon-wrapper {
    background-color: rgba(255, 255, 255, 0.3);
    transform: rotate(15deg);
  }

  .button-text {
    flex: 1;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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

const EvaluationBox = styled(Paper)`
  padding: 20px;
  margin-bottom: 16px;
  position: relative;
`

const EvaluationDate = styled.span`
  font-size: 12px;
  color: #666;
`

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #ff3b30;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    opacity: 0.8;
  }
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