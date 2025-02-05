export const mockBarema = [
    {
      id: "111",
      name: "Extensão",
      subcategories: [
        {
          id: "222",
          name: "Ensino",
          maxHours: 2,
          activities: [],
        },
        {
          id: "333",
          name: "Monitoria",
          maxHours: 2,
          activities: [],
        },
      ],
    },
    {
      id: "444",
      name: "Atividades Complementares",
      subcategories: [
        {
          id: "555",
          name: "Vivências Profissionais",
          maxHours: 2,
          activities: [
            {
              id: "666",
              name: "Contrato CLT",
              maxHours: 1,
              period: "hour",
            },
            {
              id: "777",
              name: "Contrato Estágio",
              maxHours: 1,
              period: "hour",
            },
          ],
        },
        {
          id: "888",
          name: "Palestras",
          maxHours: 2,
          activities: [
            {
              id: "999",
              name: "Palestras on-line",
              maxHours: 1,
              period: "hour",
            },
            {
              id: "122",
              name: "Palestras Presenciais",
              maxHours: 1,
              period: "hour",
            },
          ],
        },
      ],
    }
  ]