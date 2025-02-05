export const progressData = {
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