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

interface HistoryVersion {
  answer: Answer;
  versions: Version[];
}
interface getPdfs {
  path: string;
}

interface Version {
  id: number;
  answer_text: string;
  created_at: string;
}
