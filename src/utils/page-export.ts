import PDF from "jspdf";
import html2canvas from "html2canvas";

// A4 纸标准宽度 （pt）
const a4w = 595.28;

/**
 *
 * @param selector
 * @param fileName
 */
export async function export2PDF(
  selector: string,
  fileName: string
): Promise<void> {
  const pages = document.querySelectorAll(selector);
  const pdf = new PDF("p", "pt", "a4");

  if (pages) {
    let i = 1;
    // 遍历页面，将每一张页面转化成 Canvas 图片并添加到 PDF 文件中
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
      // 如仍有页面，PDF 文件增加新页面
      if (i <= pages.length) {
        pdf.addPage();
      }
    }

    pdf.save(fileName);
  }
}
