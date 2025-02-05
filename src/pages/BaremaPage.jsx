import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import { TextField, Button, Typography, Container, Grid, Paper, IconButton, MenuItem } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import {v4 as uuidv4} from 'uuid';
import { isActivitiesHoursGreaterThanSubCategoriesMaxHours, isActivityHoursLessOrEqualZero, isActivityNameEmpty, isBaremaEmpty, isCategoryNameEmpty, isSubCategoryMaxHoursLessOrEqualZero, isSubCategoryNameEmpty } from "../utils/BaremaRules"
import { showErrorToast, showSuccessToast } from "../utils/Toasts"
import { isNumeric, isUserLogged } from "../utils/Helpers"
import CoordinatorTopBar from "../components/CoordinatorTopBar"
import StudentTopBar from "../components/StudentTopBar"
import { useNavigate } from "react-router-dom"
import { registerBarema } from "../services/registerBarema"

function BaremaForm({ isVisualization }) {
  const [categories, setCategories] = useState([
    {
      id: uuidv4(),
      name: "",
      subcategories: [
        {
          id: uuidv4(),
          name: "",
          maxHours: 0,
          activities: [{ id: uuidv4(), name: "", maxHours: 0, period: "hour" }],
        },
      ],
    },
  ])

  const periods = [
    {
      value: 'semester',
      label: 'Semestre'
    },
    {
      value: 'hour',
      label: 'Horas'
    },
    {
      value: 'year',
      label: 'Ano'
    },
    {
      value: 'publication',
      label: 'Publicação'
    },
    {
      value: 'mandate',
      label: 'Mandato'
    },
    {
      value: 'event',
      label: 'Evento'
    },
    {
      value: 'service',
      label: 'Serviço'
    },
    {
      value: 'certificate',
      label: 'Certificado'
    },
    {
      value: 'premiation',
      label: 'Premiação'
    },
    {
      value: 'activity',
      label: 'Atividade'
    },
    {
      value: 'level',
      label: 'Nível'
    },
    {
      value: 'discipline',
      label: 'Disciplina'
    }
  ]

  const [error, setError] = useState("");

  const handleCategoryChange = (categoryIndex, value) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].name = value
    setCategories(newCategories)
  }

  const handleSubcategoryChange = (categoryIndex, subcategoryIndex, field, value) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories[subcategoryIndex][field] = value
    setCategories(newCategories)
  }

  const handleActivityChange = (categoryIndex, subcategoryIndex, activityIndex, field, value) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories[subcategoryIndex].activities[activityIndex][field] = value
    setCategories(newCategories)
  }

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        id: uuidv4(),
        name: "",
        subcategories: [
          {
            id: uuidv4(),
            name: "",
            maxHours: 0,
            activities: [{ id: uuidv4(), name: "", maxHours: 0, period: "hour" }],
          },
        ],
      },
    ])
  }

  const removeCategory = (index) => {
    const newCategories = categories.filter((_, i) => i !== index)
    setCategories(newCategories)
  }

  const addSubcategory = (categoryIndex) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories.push({
      id: uuidv4(),
      name: "",
      maxHours: "",
      activities: [{ name: "", maxHours: 0, period: "hour" }],
    })
    setCategories(newCategories)
  }

  const removeSubcategory = (categoryIndex, subcategoryIndex) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories = newCategories[categoryIndex].subcategories.filter(
      (_, i) => i !== subcategoryIndex,
    )
    setCategories(newCategories)
  }

  const addActivity = (categoryIndex, subcategoryIndex) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories[subcategoryIndex].activities.push({
      id: uuidv4(),
      name: "",
      maxHours: 0,
      period: "hour",
    })
    setCategories(newCategories)
  }

  const removeActivity = (categoryIndex, subcategoryIndex, activityIndex) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories[subcategoryIndex].activities = newCategories[
      categoryIndex
    ].subcategories[subcategoryIndex].activities.filter((_, i) => i !== activityIndex)
    setCategories(newCategories)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form data:", { categories })
    
    if (validateBarema()) {
      registerBarema(categories)
      .then(() => {
        showSuccessToast("Barema cadastrado com sucesso.")
        navigate('/home')
      })
      .catch((error) => showErrorToast(error))
    }
  }

  function validateBarema() {
    if (isBaremaEmpty(categories)) {
      setError("O Barema deve conter pelo menos 1 categoria.")
      return false
    }

    categories.forEach((category) => {
      if (isCategoryNameEmpty(category)) {
        setError("O nome da categoria não pode ser vazio.")
        return false
      }

      category.subcategories.forEach((subCategory) => {
        if (isSubCategoryNameEmpty(subCategory)) {
          setError(`A categoria ${category.name} contém uma subcategoria com nome vazio`)
          return false
        }

        if (isSubCategoryMaxHoursLessOrEqualZero(subCategory)) {
          setError(`A categoria ${category.name} contém uma subcategoria com máximo de horas menor que 1`)
          return false
        }

        subCategory.activities.forEach((activity) => {
          if (isActivityNameEmpty(activity)) {
            setError(`A categoria ${category.name} contém uma subcategoria de nome ${subCategory.name} que contém uma atividade sem nome`)
            return false
          }

          if (isActivityHoursLessOrEqualZero(activity)) {
            setError(`A categoria ${category.name} contém uma subcategoria de nome ${subCategory.name} que contém uma atividade com máximo de ${activity.period} menor que 1`)
            return false
          }
        })

        if (isActivitiesHoursGreaterThanSubCategoriesMaxHours(subCategory)) {
          setError(`A categoria ${category.name} contém uma subcategoria onde as atividades dela excedem o máximo permitido pela subcategoria`)
          return false
        }
      })
    })
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
  }, [error])

  return (
    <>
      { isVisualization ?
        <StudentTopBar userName={"Usuário teste"} />
        :
        <CoordinatorTopBar userName={"Usuário teste"} />
      }
      <Container maxWidth="xl">
        <FormContainer elevation={0}>
          <form onSubmit={handleSubmit}>
            { !isVisualization ?
              <Title variant="h4" gutterBottom>
                Cadastro de Barema - Ciência da Computação
              </Title>
              :
              <Title variant="h4" gutterBottom>
                Barema - Ciência da Computação
              </Title>
            }

            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <TextField
                      fullWidth
                      label={`Categoria ${categoryIndex + 1}`}
                      value={category.name}
                      onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                      variant="outlined"
                      disabled={isVisualization}
                    />
                  </Grid>
                  { !isVisualization && 
                    <Grid item>
                      <IconButton onClick={() => removeCategory(categoryIndex)} aria-label="Remover categoria">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  }
                </Grid>

                {category.subcategories.map((subcategory, subcategoryIndex) => (
                  <div key={subcategoryIndex}>
                    <Grid container spacing={3} style={{ marginTop: "10px" }}>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          fullWidth
                          label="SubCategoria"
                          value={subcategory.name}
                          onChange={(e) =>
                            handleSubcategoryChange(categoryIndex, subcategoryIndex, "name", e.target.value)
                          }
                          placeholder="Nome da SubCategoria..."
                          variant="outlined"
                          disabled={isVisualization}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <TextField
                          type="number"
                          fullWidth
                          label="Máximo de Horas"
                          value={subcategory.maxHours}
                          onChange={(e) =>
                            handleSubcategoryChange(categoryIndex, subcategoryIndex, "maxHours", e.target.value)
                          }
                          placeholder="Horas da SubCategoria..."
                          variant="outlined"
                          onKeyDown={(e) => {
                            if (!isNumeric(e.key)) {
                              e.preventDefault()
                            }
                          }}
                          disabled={isVisualization}
                        />
                      </Grid>
                      { !isVisualization && 
                        <Grid item xs={12} sm={2}>
                          <IconButton
                            onClick={() => removeSubcategory(categoryIndex, subcategoryIndex)}
                            aria-label="Remover subcategoria"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      }
                    </Grid>

                    {subcategory.activities.map((activity, activityIndex) => (
                      <Grid container spacing={3} key={activityIndex} style={{ marginTop: "10px", marginLeft: "20px" }}>
                        <Grid item xs={12} sm={5}>
                          <TextField
                            fullWidth
                            label="Nome da Atividade"
                            value={activity.name}
                            onChange={(e) =>
                              handleActivityChange(
                                categoryIndex,
                                subcategoryIndex,
                                activityIndex,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Nome da Atividade..."
                            variant="outlined"
                            disabled={isVisualization}
                          />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <TextField
                            type="number"
                            fullWidth
                            label="Carga Horária Máxima Permitida"
                            value={activity.maxHours}
                            onChange={(e) =>
                              handleActivityChange(
                                categoryIndex,
                                subcategoryIndex,
                                activityIndex,
                                "maxHours",
                                e.target.value,
                              )
                            }
                            placeholder="Carga horária..."
                            variant="outlined"
                            onKeyDown={(e) => {
                              if (!isNumeric(e.key)) {
                                e.preventDefault()
                              }
                            }}
                            disabled={isVisualization}
                          />
                        </Grid>
                        { !isVisualization && 
                          <Grid item xs={12} sm={2}>
                            <IconButton
                              onClick={() => removeActivity(categoryIndex, subcategoryIndex, activityIndex)}
                              aria-label="Remover atividade"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        }
                        <Grid item xs={12}>
                          <TextField
                            id="outlined-select-currency"
                            style={{paddingBottom: '10px'}}
                            select
                            label="Período"
                            defaultValue="hour"
                            onChange={(e) => 
                              handleActivityChange(
                                categoryIndex,
                                subcategoryIndex,
                                activityIndex,
                                "period",
                                e.target.value,
                              )
                            }
                            disabled={isVisualization}
                          >
                            {
                              periods.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))
                            }
                          </TextField>
                        </Grid>
                      </Grid>
                    ))}

                    {!isVisualization &&
                      <Button
                        startIcon={<AddIcon />}
                        onClick={() => addActivity(categoryIndex, subcategoryIndex)}
                        style={{ marginTop: "10px", marginLeft: "20px" }}
                      >
                        Adicionar Atividade
                      </Button>
                    }
                  </div>
                ))}

                {!isVisualization && 
                  <>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => addSubcategory(categoryIndex)}
                      style={{ marginTop: "20px" }}
                    >
                      Adicionar Subcategoria
                    </Button>
                    <Divider style={{ margin: "20px 0" }} />
                  </>
                }
              </div>
            ))}

            {!isVisualization && 
              <>
                <Button startIcon={<AddIcon />} onClick={addCategory} style={{ marginBottom: "20px" }}>
                  Adicionar Categoria
                </Button>

                <Grid container justifyContent="center">
                  <StyledButton type="submit" variant="contained" color="secondary" size="large">
                    Cadastrar Barema
                  </StyledButton>
                </Grid>
              </>
            }
          </form>
        </FormContainer>
      </Container>
    </>
  )
}

const FormContainer = styled(Paper)(() => ({
  padding: "20px",
  borderRadius: "8px",
}))

const Title = styled(Typography)`
  font-weight: bold;
  border-bottom: 2px solid #ffd700;
  display: inline-block;
  margin-bottom: 40px;
`

const CategoryTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 20px;
`

const Divider = styled.div`
  border-bottom: 2px solid #ffd700;
  margin: 30px 0;
`

const StyledButton = styled(Button)`
  padding: 16px 32px;
  font-size: 16px;
  border-radius: 9999px;
  background-color: #088586;
  cursor: pointer;

  &:hover {
    background-color: #076969;
  }
`

export default BaremaForm

