import FileSaver from "file-saver";
import { jsPDF } from "jspdf";

const rImageType = /data:(image\/.+);base64,/;

/**
 * This function converts a base64 string to a Blob object.
 * It first extracts the MIME type from the base64 string and stores it in a variable.
 * The base64 string is then decoded and converted to a raw string.
 * The raw string is converted to a Uint8Array, with each character's char code being an element in the array.
 * A Blob object is then created from the Uint8Array, with the MIME type being either the extracted MIME type or a provided MIME type.
 *
 * @param {string} data - The base64 string to be converted to a Blob.
 * @param {string} [toType] - The MIME type to be used for the Blob. If not provided, the MIME type is extracted from the base64 string.
 * @returns {Blob} The Blob object created from the base64 string.
 */
export function base64ToBlob(data: string, toType?: string) {
  let mimeString = "";
  let raw, uInt8Array, i, rawLength;

  raw = data.replace(rImageType, function (header, imageType) {
    mimeString = imageType;
    return "";
  });

  raw = atob(raw);
  rawLength = raw.length;
  uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

  for (i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: toType ? toType : mimeString });
}

/**
 * This function converts a data URL to a File object.
 * It first splits the data URL into two parts: the MIME type and the base64 encoded data.
 * The MIME type is extracted from the first part of the split data URL.
 * The base64 encoded data is decoded and converted to a raw string.
 * The raw string is converted to a Uint8Array, with each character's char code being an element in the array.
 * A File object is then created from the Uint8Array, with the filename and MIME type provided.
 *
 * @param {string} dataUrl - The data URL to be converted to a File.
 * @param {string} filename - The name to be used for the File.
 * @returns {File} The File object created from the data URL.
 */
export function dataURLtoFile(dataUrl: string, filename: string) {
  let arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bStr = atob(arr[1]),
    n = bStr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * This function downloads an image in the specified format.
 * If the format is 'pdf', it creates a new Image object and sets its source to the base64 encoded image data.
 * When the image is fully loaded, it creates a new canvas element and draws the image on it.
 * The canvas is then converted to a data URL representing the canvas's image data.
 * A new PDF document is created, and the image is added to the document.
 * The PDF document is then saved and the download is initiated.
 * If the format is not 'pdf', it uses the FileSaver library to save the base64 encoded image data as a Blob object.
 * The Blob object is then downloaded in the specified format, or 'jpg' if no format is specified.
 *
 * @param {string} fileName - The name to be used for the downloaded file.
 * @param {string} image - The base64 encoded image data to be downloaded.
 * @param {"png" | "jpg" | "pdf" | "webp"} [ext] - The format to be used for the downloaded file. If not provided, 'jpg' is used.
 * @returns {Promise<void>} A Promise that resolves when the download is initiated.
 */
export async function downloadImage(
  fileName: string,
  image: string,
  ext?: "png" | "jpg" | "pdf" | "webp",
) {
  if (ext === "pdf") {
    const img = new Image();

    // Set the source of the image to the base64 encoded image data
    img.src = image;

    // When the image is fully loaded, create a new canvas element and draw the image on it
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, img.width, img.height);

      // Convert the canvas to a data URL representing the canvas's image data
      const dataUrl = canvas.toDataURL("image/png");

      // Create a new PDF document
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add the image to the PDF document
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF document and initiate the download
      pdf.save("image.pdf");
      // downloadImage(imageName, new Blob([pdf], {type: "application/pdf;charset=utf-8"}), "pdf")
    };
  } else {
    //for other ext
    FileSaver.saveAs(base64ToBlob(image), `${fileName}.${ext || "jpg"}`);
  }
}
