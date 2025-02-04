import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useState } from "react"
import styled from "styled-components"
import StudentTopBar from "../components/StudentTopBar"
import { Typography } from "@mui/material"

const progressData = {
  total: {
    id: "total",
    name: "Total",
    current: 800,
    total: 1000,
    color: "#8B8BF9",
    subcategories: [],
  },
  categories: [
    {
      id: "A",
      name: "Categoria A",
      current: 200,
      total: 250,
      color: "#4CAF50",
      subcategories: [
        {
          id: "A1",
          name: "Subcategoria A1",
          current: 100,
          total: 100,
          activities: [
            { id: 1, name: "Atividade 1", current: 50, total: 50 },
            { id: 2, name: "Atividade 2", current: 50, total: 50 },
          ],
        },
        {
          id: "A2",
          name: "Subcategoria A2",
          current: 100,
          total: 100,
          activities: [
            { id: 3, name: "Atividade 3", current: 50, total: 50 },
            { id: 4, name: "Atividade 4", current: 50, total: 50 },
          ],
        },
        {
          id: "A3",
          name: "Subcategoria A3",
          current: 0,
          total: 50,
          activities: [{ id: 5, name: "Atividade 5", current: 0, total: 50 }],
        },
      ],
    },
    {
      id: "B",
      name: "Categoria B",
      current: 200,
      total: 250,
      color: "#F44336",
      subcategories: [],
    },
    {
      id: "C",
      name: "Categoria C",
      current: 200,
      total: 250,
      color: "#E7D63F",
      subcategories: [],
    },
    {
      id: "D",
      name: "Categoria D",
      current: 200,
      total: 250,
      color: "#8B8BF9",
      subcategories: [],
    },
  ],
}

function ProgressItem({ name, current, total, color, children, hasChildren }) {
  const [isOpen, setIsOpen] = useState(true)
  const percentage = Math.round((current / total) * 100)

  return (
    <ItemContainer>
      <ItemHeader color={color} hasChildren={hasChildren} onClick={() => hasChildren && setIsOpen(!isOpen)}>
        <ItemContent>
          <Text>{name}</Text>
          <ProgressBarContainer>
            <ProgressBar percentage={percentage} />
          </ProgressBarContainer>
        </ItemContent>
        <ItemInfo>
          <Text>
            {current}/{total}
          </Text>
          <Percentage>{percentage}%</Percentage>
          {hasChildren && (isOpen ? <ExpandLess size={20} /> : <ExpandMore size={20} />)}
        </ItemInfo>
      </ItemHeader>
      {isOpen && children && <ChildrenContainer>{children}</ChildrenContainer>}
    </ItemContainer>
  )
}

function SubCategory({ name, current, total, activities }) {
  return (
    <ProgressItem name={name} current={current} total={total} color="#6CE95D" hasChildren={activities.length > 0}>
      {activities.map((activity) => (
        <ProgressItem
          key={activity.id}
          name={activity.name}
          current={activity.current}
          total={activity.total}
          color="#6CE95D"
          hasChildren={false}
        />
      ))}
    </ProgressItem>
  )
}

function Category({ name, current, total, color, subcategories }) {
  return (
    <ProgressItem name={name} current={current} total={total} color={color} hasChildren={subcategories.length > 0}>
      {subcategories.map((subcategory) => (
        <SubCategory key={subcategory.id} {...subcategory} />
      ))}
    </ProgressItem>
  )
}

export default function ProgressPage() {
  return (
    <>
      <StudentTopBar />
      <Container>
      <Title variant="h4" gutterBottom>Seu Progresso</Title>
        <Category {...progressData.total} />
        {progressData.categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

const ItemContainer = styled.div`
  margin-bottom: 8px;
`

const ItemHeader = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 25px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${(props) => (props.hasChildren ? "pointer" : "default")};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

const ItemContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
  color: white;
`

const ProgressBarContainer = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`

const ProgressBar = styled.div`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background: white;
  transition: width 0.3s ease;
`

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
`

const ChildrenContainer = styled.div`
  padding-left: 32px;
  margin-top: 8px;
`

const Text = styled.span`
  font-size: 16px;
  font-weight: 500;
`

const Percentage = styled.span`
  min-width: 4rem;
  text-align: right;
`

const Title = styled(Typography)`
  font-weight: bold;
  border-bottom: 2px solid #ffd700;
  display: inline-block;
  margin-bottom: 40px;
`
