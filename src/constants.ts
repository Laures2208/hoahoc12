import { Lesson, QuizQuestion } from './types';

export const LESSONS: Lesson[] = [
  {
    id: 'intro',
    title: 'Introduction to Metal Extraction',
    description: 'Learn the basics of how metals are found and extracted from the Earth.',
    icon: 'Pickaxe',
    content: `
      Metals are rarely found in their pure form in nature. Instead, they are found as **ores**—rocks that contain a high enough concentration of a metal compound to make extraction profitable.
      
      The method used to extract a metal depends on its **reactivity**. More reactive metals form stronger bonds with other elements and require more energy to extract.
      
      ### Key Concepts
      - **Ore**: A naturally occurring solid material from which a metal or valuable mineral can be profitably extracted.
      - **Reactivity Series**: A list of metals arranged in order of their decreasing chemical reactivity.
      - **Reduction**: The process of removing oxygen from a compound to obtain the pure metal.
    `
  },
  {
    id: 'pyro',
    title: 'Pyrometallurgy',
    description: 'Thermal reduction using Carbon or Carbon Monoxide.',
    icon: 'Flame',
    content: `
      Pyrometallurgy involves using high temperatures to reduce metal oxides. This method is typically used for metals in the middle of the reactivity series, like **Iron (Fe)**, **Zinc (Zn)**, and **Lead (Pb)**.
      
      The most common reducing agent is **Carbon (C)** or **Carbon Monoxide (CO)**.
      
      ### The Blast Furnace
      In a blast furnace, iron ore (hematite) is heated with coke (carbon) and limestone.
      1. Coke burns to produce heat and CO2.
      2. CO2 reacts with more coke to form CO.
      3. CO reduces the iron oxide to molten iron.
      
      **Chemical Equation:**
      Fe2O3 + 3CO → 2Fe + 3CO2
    `
  },
  {
    id: 'hydro',
    title: 'Hydrometallurgy',
    description: 'Metal displacement in aqueous solutions.',
    icon: 'Droplets',
    content: `
      Hydrometallurgy uses aqueous (water-based) solutions to extract metals. It often involves two main steps: **leaching** and **displacement**.
      
      ### Leaching
      The ore is dissolved in a solvent (like an acid or cyanide solution) to create a "pregnant" solution containing the metal ions.
      
      ### Displacement (Cementation)
      A more reactive metal is added to the solution. The more reactive metal "displaces" the less reactive metal from the solution.
      
      **Example:**
      Extracting Copper (Cu) using Scrap Iron (Fe).
      Fe(s) + CuSO4(aq) → FeSO4(aq) + Cu(s)
    `
  },
  {
    id: 'electro',
    title: 'Molten Electrolysis',
    description: 'Using electricity to extract highly reactive metals.',
    icon: 'Zap',
    content: `
      Highly reactive metals like **Aluminium (Al)** and **Sodium (Na)** cannot be reduced by carbon. They are extracted using **electrolysis** of their molten ores.
      
      ### The Hall-Héroult Process
      Aluminium is extracted from bauxite ore.
      1. Bauxite is purified to Alumina (Al2O3).
      2. Alumina is dissolved in molten **cryolite** to lower its melting point.
      3. Electricity is passed through the molten mixture.
      
      - **At the Cathode (-):** Al3+ + 3e- → Al (Liquid metal)
      - **At the Anode (+):** 2O2- → O2 + 4e-
    `
  }
];

export const QUIZZES: Record<string, QuizQuestion[]> = {
  intro: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is an ore?',
      options: ['A pure metal found in nature', 'A rock containing a profitable amount of metal compound', 'A synthetic metal alloy', 'A type of fossil fuel'],
      answer: 'A rock containing a profitable amount of metal compound',
      explanation: 'Ores are naturally occurring rocks that contain enough metal to make it worth extracting.'
    },
    {
      id: 'q2',
      type: 'tf',
      question: 'More reactive metals are easier to extract than less reactive metals.',
      answer: false,
      explanation: 'More reactive metals form stronger bonds and require more energy (like electrolysis) to extract.'
    }
  ],
  pyro: [
    {
      id: 'q3',
      type: 'mcq',
      question: 'Which reducing agent is commonly used in a blast furnace?',
      options: ['Oxygen', 'Carbon Monoxide', 'Water', 'Nitrogen'],
      answer: 'Carbon Monoxide',
      explanation: 'Carbon monoxide (CO) is the primary reducing agent that reacts with iron ore in the blast furnace.'
    }
  ],
  hydro: [
    {
      id: 'q4',
      type: 'mcq',
      question: 'In hydrometallurgy, what happens during displacement?',
      options: ['A metal is melted at high heat', 'A more reactive metal replaces a less reactive one in solution', 'Electricity is used to split a compound', 'The ore is crushed into powder'],
      answer: 'A more reactive metal replaces a less reactive one in solution',
      explanation: 'Displacement uses the reactivity series to push a less reactive metal out of a solution.'
    }
  ],
  electro: [
    {
      id: 'q5',
      type: 'mcq',
      question: 'Why is cryolite added to alumina during the extraction of aluminium?',
      options: ['To make it more reactive', 'To lower the melting point', 'To change its color', 'To prevent oxidation'],
      answer: 'To lower the melting point',
      explanation: 'Alumina has a very high melting point (>2000°C). Dissolving it in cryolite lowers the melting point to about 950°C, saving energy.'
    }
  ]
};
