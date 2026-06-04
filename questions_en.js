/* questions_en.js — English translations of quiz questions and result levels */

const quizQuestions_en = [
  {
    id: 1,
    statement: "Before visiting this exhibition, I could have spontaneously named at least three Chinese women from the Republican period (1912–1949).",
    awareAnswer: "agree",
    explanation: "Chinese women of the Republican period were revolutionaries, writers, politicians — and are globally almost unknown. This ignorance is not a personal failing, but a structural outcome of historiography."
  },
  {
    id: 2,
    statement: "If women are missing from history books, it is mainly because they actually contributed less to history.",
    awareAnswer: "disagree",
    explanation: "Women are missing because history was written for a long time by men for men — not because women contributed less. The absence is a product of historiography, not of history."
  },
  {
    id: 3,
    statement: "Feminism is fundamentally a Western concept that does not transfer well to cultures like China.",
    awareAnswer: "disagree",
    explanation: "Chinese women fought for their rights independently and in parallel to Western movements at the end of the 19th and beginning of the 20th centuries. Labeling feminism as 'Western' makes these struggles invisible."
  },
  {
    id: 4,
    statement: "The image of the 'traditional, obedient Chinese woman' accurately describes the historical reality of most Chinese women.",
    awareAnswer: "disagree",
    explanation: "This image is a construct — arising from patriarchal interests and Western Orientalism. Chinese women have resisted, acted, and rebelled at every time."
  },
  {
    id: 5,
    statement: "History can be objective and complete without explicitly including gender perspectives.",
    awareAnswer: "disagree",
    explanation: "History without a gender perspective is not neutral history — it is male history that passes as the norm. Objectivity arises from more perspectives, not from fewer."
  },
  {
    id: 6,
    statement: "Women of the Chinese Republican period were primarily victims of circumstances — less active shapers of history.",
    awareAnswer: "disagree",
    explanation: "Women like Qiu Jin, Xiang Jingyu, or He Xiangning were revolutionaries, journalists, politicians. Reducing them to 'victims' is a form of retroactive disempowerment."
  },
  {
    id: 7,
    statement: "I learned significantly more about men than women in history class.",
    awareAnswer: "agree",
    explanation: "This is true for the vast majority — and should be perceived as a structural problem, not as something self-evident."
  },
  {
    id: 8,
    statement: "It is justifiable to summarize the role of women in a history course on China in one paragraph.",
    awareAnswer: "disagree",
    explanation: "Women make up half the population. Reducing their history to one paragraph is not a pedagogical decision — it is a decision to declare half of history irrelevant."
  },
  {
    id: 9,
    statement: "The fact that this exhibition specifically reports on women seems politically motivated to me.",
    awareAnswer: "disagree",
    explanation: "Exhibitions about men are rarely considered political. If the deliberate visibility of women is perceived as 'political,' it shows how much the male perspective passes as 'normal.'"
  },
  {
    id: 10,
    statement: "The concept of the 'traditional female role' is primarily a natural development — not a construction imposed by power relations.",
    awareAnswer: "disagree",
    explanation: "Female roles were historically actively enforced and defended through law, religion, and social structures. What is called 'traditional' is the result of power relations — not nature."
  },
  {
    id: 11,
    statement: "Chinese women of the Republican period advocated primarily for nationalist goals — feminism was secondary to them.",
    awareAnswer: "disagree",
    explanation: "Many women linked feminism and nationalism rather than prioritizing one. This simplification underestimates the complexity of their political identities and serves mainly to downplay feminism."
  },
  {
    id: 12,
    statement: "Women's history is an important, independent field of study — not a 'special topic' on the margins of real history.",
    awareAnswer: "agree",
    explanation: "Women's history is the history of half of humanity. Without it, historical scholarship is fundamentally incomplete — not just in need of supplementation."
  },
  {
    id: 13,
    statement: "Women are still significantly underrepresented in history books and history class today.",
    awareAnswer: "agree",
    explanation: "Numerous studies confirm this. Being aware of this is the first step — questioning curricula is the second."
  },
  {
    id: 14,
    statement: "My mental image of 'Chinese history' is primarily shaped by male protagonists.",
    awareAnswer: "agree",
    explanation: "This is almost universal. Recognizing that one's own view of history is one-sided is not a defeat — but a prerequisite for a more complete understanding."
  },
  {
    id: 15,
    statement: "An exhibition that deliberately places women in the center changes how I think about history — or should at least.",
    awareAnswer: "agree",
    explanation: "Anyone who answers 'no' to this question refuses engagement — but that is precisely the goal of this exhibition. Art and exhibitions are always also political."
  }
];

const resultLevels_en = [
  {
    min: 0,
    max: 8,
    label: "Structurally Uninformed",
    color: "#C41E3A",
    description: "You have answered the most basic questions about women's history and feminism incorrectly. This is the result of an education system that has systematically marginalized women's history. The knowledge you lack is now available. Also for you."
  },
  {
    min: 9,
    max: 15,
    label: "Superficially Informed",
    color: "#C41E3A",
    description: "You know that feminism exists and that women have been oppressed. But your understanding remains politically harmless — you recognize the problem without understanding its mechanisms. Half-knowledge does not protect against complicity."
  },
  {
    min: 16,
    max: 22,
    label: "Informed, but Comfortable",
    color: "#B8860B",
    description: "You have many right instincts — but comfortable answers where it becomes uncomfortable. Your awareness doesn't extend to the places where it really hurts. Knowledge without consequence is decoration."
  },
  {
    min: 23,
    max: 27,
    label: "Aware, with Gaps",
    color: "#2E7D32",
    description: "You understand the structures. But you hesitate at theses that have concrete consequences. Awareness that does not lead to action remains incomplete."
  },
  {
    min: 28,
    max: 30,
    label: "Thoughtfully Feminist",
    color: "#1B5E20",
    description: "You understand the structural dimensions of women's history and feminism. That puts you in a minority. The question is no longer whether you know it — but what you do with it."
  }
];
