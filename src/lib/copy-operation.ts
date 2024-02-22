interface ArgType {
  text?: string;
  styleMode?: boolean;
  cb?: (v: "checked" | "copy") => void;
}
export async function copyOperation({
  text = "",
  styleMode = false,
  cb = v => {},
}: ArgType) {
  text = text.trim();
  const parent = document.createElement("div");

  if (styleMode) {
    text = text.replaceAll("\n", "<br/>");
    parent.innerHTML = text;
    const type = "text/html";
    const blob = new Blob([parent.outerHTML.toString()], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  } else {
    parent.innerHTML = text;
    await navigator.clipboard.writeText(parent.innerText);
  }

  cb("checked");
  setTimeout(() => {
    cb("copy");
  }, 1000);
}
