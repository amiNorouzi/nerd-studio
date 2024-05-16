export interface History {
  answers: Answer[];
}

export interface Answer {
  id: number;
  answer_text: string;
  uuid: string;
  app_type: string;
  created_at: string;
  updated_at:string;
  urls:string[];
  versions: Version[];
}

export interface HistoryVersion {
  answer: Answer;
  versions: Version[];
}
interface getPdfs {
  path: string;
}

export interface Version {
  id: number;
  answer_text: string;
  created_at: string;
  updated_at
}
