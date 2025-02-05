import { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { TextField, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from "@mui/material"
import { CloudUpload, Close } from "@mui/icons-material"
import StudentTopBar from "../components/StudentTopBar"
import { progressData } from "../utils/mockProgressData"
import { Category } from "./ProgressPage"
import { mockBarema } from "../utils/mockBarema"
import { useNavigate } from "react-router-dom"
import { isUserLogged } from "../utils/Helpers"
import { showErrorToast } from "../utils/Toasts"

export default function RegisterHoursPage() {
  const [error, setError] = useState("");
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    activity: "",
    hours: "10",
    startDate: "2025-01-01",
    endDate: "2025-01-01",
    observations: "",
  })

  const fileInputRef = useRef()

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files)
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles((prev) => [...prev, ...droppedFiles])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function getSubCategories() {
    const selectedCategory = mockBarema.find((category) => category.id === formData.category)

    if (selectedCategory !== undefined) {
      return selectedCategory.subcategories
    }
    return []
  }

  function getActivities() {
    const selectedCategory = mockBarema.find((category) => category.id === formData.category)

    if (selectedCategory !== undefined) {
      const selectedSubcategory = selectedCategory.subcategories.find((subcategory) => subcategory.id === formData.subcategory)

      if (selectedSubcategory !== undefined) {
        return selectedSubcategory.activities.length > 0 ? selectedSubcategory.activities : null
      }
    }

    return null
  }

  function handleSubmitButton(event) {
    event.preventDefault()
    console.log(formData)
    console.log(files)

    if (validateSubmission()) {

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
    }

    if (files.length === 0) {
      setError("Insira pelo menos um comprovante.")
    }
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
              {mockBarema.map((category) => (
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
        <HiddenInput type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept=".jpg,.jpeg,.png,.pdf" />

        <UploadArea onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => fileInputRef.current.click()}>
          <CloudUpload style={{ fontSize: 48, color: "#4339F2", marginBottom: "1rem" }} />
          <p>
            Arraste e solte arquivos ou <span style={{ color: "#4339F2" }}>Navegue</span>
          </p>
          <small style={{ color: "#666" }}>Formatos aceitos: JPEG, PNG, PDF</small>
        </UploadArea>

        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              {file.name}
              <Close style={{ cursor: "pointer", color: "#ff4444" }} onClick={() => removeFile(index)} />
            </FileItem>
          ))}
        </FileList>

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
