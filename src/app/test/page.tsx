import { times } from 'lodash'
import React from 'react'
import BoxContent from './BoxContent'

const items = [
  {
    id: 1,
    name: 'Col 1',
    cards: times(10, (index) => ({
      id: `card-${index + 1}`,
      name: `Card ${index + 1}`,
    })),
  },
  {
    id: 2,
    name: 'Col 2',
    cards: times(10, (index) => ({
      id: `card-2-${index + 1}`,
      name: `Card 2 ${index + 1}`,
    })),
  },
  {
    id: 3,
    name: 'Col 3',
    cards: times(10, (index) => ({
      id: `card-3-${index + 1}`,
      name: `Card 3 ${index + 1}`,
    })),
  },
  {
    id: 4,
    name: 'Col 4',
    cards: times(10, (index) => ({
      id: `card-4-${index + 1}`,
      name: `Card 4 ${index + 1}`,
    })),
  },
  {
    id: 5,
    name: 'Col 5',
    cards: times(10, (index) => ({
      id: `card-5-${index + 1}`,
      name: `Card 5 ${index + 1}`,
    })),
  },
  {
    id: 6,
    name: 'Col 6',
    cards: times(10, (index) => ({
      id: `card-6-${index + 1}`,
      name: `Card 7 ${index + 1}`,
    })),
  },
]

const page: React.FC = () => {
  return (
    <div>
      <BoxContent items={items} />
    </div>
  )
}

export default page
