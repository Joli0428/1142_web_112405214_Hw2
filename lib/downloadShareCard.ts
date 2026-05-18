import html2canvas from "html2canvas";

export async function downloadShareCard(
  element: HTMLElement,
  filename: string
) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const canvas = await html2canvas(element, {
    backgroundColor: "#0a0805",
    scale: Math.min(3, Math.max(2, window.devicePixelRatio)),
    useCORS: true,
    logging: false,
    onclone: (_doc, cloned) => {
      const card = cloned as HTMLElement;
      const bg = getComputedStyle(element).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)") {
        card.style.background = bg;
      } else {
        card.style.background = "rgba(46, 33, 22, 0.92)";
      }
    },
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
