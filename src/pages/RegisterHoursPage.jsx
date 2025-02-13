import { useState, useEffect } from "react"
import styled from "styled-components"
import { TextField, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from "@mui/material"
import StudentTopBar from "../components/StudentTopBar"
import { progressData } from "../utils/mockProgressData"
import { Category } from "./ProgressPage"
import { useNavigate } from "react-router-dom"
import { isUserLogged } from "../utils/Helpers"
import { showErrorToast, showSuccessToast } from "../utils/Toasts"
import { getBaremaByCourseId } from "../services/getBaremaByCourseId"
import { registerHours } from "../services/registerHours"

export default function RegisterHoursPage() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    activity: "",
    hours: "0",
    startDate: "2025-01-01",
    endDate: "2025-01-01",
    observations: "",
    documents: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function getSubCategories() {
    const selectedCategory = categories.find((category) => category.id === formData.category)

    if (selectedCategory !== undefined) {
      return selectedCategory.subCategories
    }
    return []
  }

  function getActivities() {
    const selectedCategory = categories.find((category) => category.id === formData.category)

    if (selectedCategory !== undefined) {
      const selectedSubcategory = selectedCategory.subCategories.find((subcategory) => subcategory.id === formData.subcategory)

      if (selectedSubcategory !== undefined) {
        return selectedSubcategory.activities.length > 0 ? selectedSubcategory.activities : null
      }
    }

    return null
  }

  function handleSubmitButton(event) {
    event.preventDefault()
    console.log(formData)

    if (validateSubmission()) {
      registerHours(formData.category, formData.hours, formData.subcategory, formData.activity, formData.startDate, formData.endDate, formData.observations, formData.documents)
      .then(response => {
        showSuccessToast("Pedido cadastrado com sucesso!")
        navigate("/home/student")
      })
      .catch(error => showErrorToast(error))
    }
  }

  function validateSubmission() {
    if (!formData.category) {
      setError("Selecione uma categoria.")
      return false
    }

    if (!formData.subcategory) {
      setError("Selecione uma subcategoria.")
      return false
    }

    if (getActivities() !== null && !formData.activity) {
      setError("Selecione uma atividade.")
      return false
    }

    if (formData.hours <= 0) {
      setError("CH deve ser maior ou igual a 1.")
      return false
    }

    return true
  }

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isUserLogged()) {
      navigate('/')
    }

    if (error !== "") {
      showErrorToast(error)
      setError("")
    }

    getBaremaByCourseId()
    .then(response => setCategories(response.categories))
    .catch(error => showErrorToast(error))
  }, [error])

  return (
    <>
      <StudentTopBar />
      <Container>
        <ProgressSection>
          <Title>Seu progresso</Title>
          <Category {...progressData.total} />
          {progressData.categories.map((category) => (
            <Category key={category.id} {...category} />
          ))}
        </ProgressSection>

        <Title>Informações sobre a atividade realizada</Title>
        <FormGrid>
          <FormControl fullWidth>
            <InputLabel>Categoria</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange} label="Categoria">
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="CH (Horas)"
            type="number"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Subcategoria</InputLabel>
            <Select name="subcategory" value={formData.subcategory} onChange={handleChange} label="Subcategoria">
              {getSubCategories().map((subcategory) => (
                <MenuItem key={subcategory.id} value={subcategory.id}>{subcategory.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Data final"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          {getActivities() !== null ? 
            <FormControl fullWidth>
              <InputLabel>Atividade</InputLabel>
              <Select name="activity" value={formData.activity} onChange={handleChange} label="Atividade">
                {getActivities().map((activity) => (
                  <MenuItem key={activity.id} value={activity.id}>{activity.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            :
            <></>
          }

          <TextField
            label="Data inicial"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </FormGrid>

        <TextareaAutosize
          minRows={3}
          placeholder="Insira detalhes da atividade realizada"
          style={{ width: "100%", padding: "8px", marginBottom: "2rem" }}
          name="observations"
          value={formData.observations}
          onChange={handleChange}
        />

        <Title>Comprovantes</Title>
        <TextareaAutosize
          minRows={3}
          placeholder="Insira os links para download dos documentos"
          style={{ width: "100%", padding: "8px", marginBottom: "2rem" }}
          name="documents"
          value={formData.documents}
          onChange={handleChange}
        />

        <SubmitButton onClick={handleSubmitButton}>SUBMETER PEDIDO</SubmitButton>
      </Container>
    </>
  )
}

const Container = styled.div`
  padding: 2rem;
  margin: 0 auto;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #4339F2;
`

const ProgressSection = styled.div`
  margin-bottom: 2rem;
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #f9f9f9;
  }
`

const FileList = styled.div`
  margin: 1rem 0;
`

const FileItem = styled.div`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SubmitButton = styled.button`
  background: #2A877E;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: #236E66;
  }
`

const HiddenInput = styled.input`
  display: none;
`
