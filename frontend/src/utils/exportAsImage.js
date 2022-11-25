import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const exportAsImage = async (element, name) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    // download the image
    var doc = new jsPDF({
        unit: "px",
        format: [300 , 600]
    });
    doc.addImage(image,'JPEG',20,20);
    doc.save(name+".pdf");
};