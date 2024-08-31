const descripcionRegex = (
  description: string,
  colorChange: boolean,
  id: string
) => {
  const replacedDescription = description?.replace(/\n\n/g, "\n \n");
  const lines = replacedDescription?.split(/[\r\n]+/);

  const styledLines = lines?.map((line: string) => {
    const words = line.split(/(?=[@#])|\s+/);
    const styledWords = words.map((word) => {
      if (word[0] === "#") {
        return colorChange
          ? `<em onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" id="hashtags" style="color: #f9ed00; font-style: normal; word-break: break-all; margin-right: 4px; cursor: pointer;">${word}</em>`
          : `<em onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" id="hashtags" style="color: #d4412eb3; font-style: normal; word-break: break-all; margin-right: 4px; cursor: pointer;">${word}</em>`;
      } else if (word[0] === "@") {
        const link = `https://cypher.digitalax.xyz/autograph/${
          word?.includes(".lens")
            ? word?.replace(".lens", "").replace("@", "")
            : word?.replace("@", "")
        }`;
        return colorChange
          ? ` <a onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" href="${link}" rel="noreferrer" target="_blank" style="word-break: break-all; margin-right: 4px; cursor: pointer;"> <span style="color: #f9ed00;">${word}</span> </a> `
          : ` <a onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" href="${link}" target="_blank" rel="noreferrer" style="word-break: break-all; margin-right: 4px; cursor: pointer;"> <span style="color: #d4412eb3;">${word}</span> </a> `;
      } else if (
        word.startsWith("http") ||
        word.startsWith("www.") ||
        word.endsWith(".xyz") ||
        word.endsWith(".com")
      ) {
        const url = word?.includes("//") ? word : `//${word}`;
        return colorChange
          ? ` <a onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" href="${url}" style="word-break: break-all; margin-right: 4px; cursor: pointer;" target="_blank" rel="noreferrer"> <span style="color: #f9ed00;">${word}</span> </a> `
          : ` <a onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" href="${url}" style="word-break: break-all; margin-right: 4px; cursor: pointer;" target="_blank" rel="noreferrer"> <span style="color: #d4412eb3;">${word}</span> </a> `;
      } else {
        return word;
      }
    });
    return styledWords.join(" ");
  });
  const formattedDescription = styledLines.join("<br />");
  const conEstilo = `<span onmouseout="this.style.opacity='1';" onmouseover="this.style.opacity='0.7';" style="cursor: pointer;" onclick="window.mostrarDetallesHandler('${id}')">${formattedDescription}</span>`;
  return `<div style="word-wrap: break-word; max-width: 100%; ">${conEstilo}</div>`;
};

export default descripcionRegex;
