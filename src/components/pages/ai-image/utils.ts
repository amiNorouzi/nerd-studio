import FileSaver from "file-saver";
import { jsPDF } from "jspdf";

const rImageType = /data:(image\/.+);base64,/;

/**
 * Convert base64 to blob
 * @param data base64 string
 * @param toType image ext
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
 * Convert base64 to file
 * @param dataUrl base64 string
 * @param filename image name
 */
export function dataURLtoFile(dataUrl: string, filename: string) {
  let arr = dataUrl.split(","),
    // @ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bStr = atob(arr[1]),
    n = bStr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

/**
 * Download image
 * @param fileName image name
 * @param image base64 string
 * @param ext image ext
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
