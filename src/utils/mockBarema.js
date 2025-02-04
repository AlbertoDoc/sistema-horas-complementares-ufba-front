export const mockBarema = [
    {
      id: "111",
      name: "Extensão",
      subcategories: [
        {
          id: "222",
          name: "Ensino",
          maximoHoras: 2,
          activities: [],
        },
        {
          id: "333",
          name: "Monitoria",
          maximoHoras: 2,
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
          maximoHoras: 2,
          activities: [
            {
              id: "666",
              name: "Contrato CLT",
              cargaHoraria: 1,
              periodo: "hour",
            },
            {
              id: "777",
              name: "Contrato Estágio",
              cargaHoraria: 1,
              periodo: "hour",
            },
          ],
        },
        {
          id: "888",
          name: "Palestras",
          maximoHoras: 2,
          activities: [
            {
              id: "999",
              name: "Palestras on-line",
              cargaHoraria: 1,
              periodo: "hour",
            },
            {
              id: "122",
              name: "Palestras Presenciais",
              cargaHoraria: 1,
              periodo: "hour",
            },
          ],
        },
      ],
    }
  ]