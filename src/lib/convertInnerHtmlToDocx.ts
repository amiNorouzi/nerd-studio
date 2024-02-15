export function convertInnerHtmlToDocx(value: string) {
  const header =
    "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
  const footer = "</body></html>";
  const sourceHTML = header + value + footer;

  const source =
    "data:application/vnd.ms-word;charset=utf-8," +
    encodeURIComponent(sourceHTML);

  return source;
}
