interface History {
  answers: Answer[];
}

interface Answer {
  id: number;
  answer_text: string;
  uuid: string;
  app_type: string;
  created_at: string;
}
