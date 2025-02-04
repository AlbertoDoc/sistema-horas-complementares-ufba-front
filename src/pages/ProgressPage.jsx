import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useState } from "react"
import styled from "styled-components"
import StudentTopBar from "../components/StudentTopBar"
import { Typography } from "@mui/material"
import { progressData } from "../utils/mockProgressData"

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

export function Category({ name, current, total, color, subcategories }) {
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
