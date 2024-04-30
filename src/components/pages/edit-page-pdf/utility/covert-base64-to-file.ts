export function base64ToBlobPDF(base64:any, mimeType:any) {
  // Decode Base64 string
  const byteString = atob(base64.split(",")[1]);

  // Create a Uint8Array from byte string
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  // Create Blob from the typed array
  const blob = new Blob([intArray], { type: mimeType });
  return blob;
}
export function appendBlobToFormData(blob: any) {
  const formData = new FormData();
  formData.append("file", blob);
  return formData;
}