import PDF from "jspdf";
import html2canvas from "html2canvas";

const a4w = 595.28;

export async function exportPage2PDF(
  file: string,
  selector = ".page"
): Promise<void> {
  const pages = document.querySelectorAll(selector);
  const pdf = new PDF("p", "pt", "a4");

  if (pages) {
    let i = 1;
    for (const page of pages) {
      const canvas = await html2canvas(page as HTMLElement, { scale: 4 });
      const img = canvas.toDataURL("image/png");

      pdf.addImage(
        img,
        "JPEG",
        0,
        0,
        a4w,
        (a4w / canvas.width) * canvas.height
      );

      i++;
      if (i <= pages.length) {
        pdf.addPage();
      }
    }

    pdf.save(file);
  }
}
