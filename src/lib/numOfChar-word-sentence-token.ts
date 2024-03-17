import type { WordType } from "@/services/types";

export function numberOfTextContent(type: WordType, value: string) {
  switch (type) {
    case "char": {
      return value.length;
    }
    case "word": {
      return value.split(" ").filter(item => {
        return item.trim() != "";
      }).length;
    }
    case "sentence": {
      return value.split(/\w[.?!]/).filter(item => {
        return item.trim() != "";
      }).length;
    }
    case "token": {
      return 0;
    }
  }
}
