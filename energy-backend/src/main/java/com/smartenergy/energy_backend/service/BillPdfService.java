package com.smartenergy.energy_backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.smartenergy.energy_backend.model.EnergyUsage;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Service
public class BillPdfService {

    public ByteArrayInputStream generateBillPdf(EnergyUsage usage) {

        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // ✅ Load Unicode Font (for ₹)
            BaseFont baseFont = BaseFont.createFont(
                    "fonts/DejaVuSans.ttf",
                    BaseFont.IDENTITY_H,
                    BaseFont.EMBEDDED
            );

            Font titleFont = new Font(baseFont, 18, Font.BOLD);
            Font labelFont = new Font(baseFont, 12, Font.BOLD);
            Font valueFont = new Font(baseFont, 12);
            Font footerFont = new Font(baseFont, 11, Font.ITALIC);

            // ================= HEADER (TITLE + LOGO CENTERED) =================
            PdfPTable headerTable = new PdfPTable(2);
            headerTable.setWidthPercentage(60);
            headerTable.setWidths(new float[]{3, 1});
            headerTable.setHorizontalAlignment(Element.ALIGN_CENTER);
            headerTable.setSpacingAfter(25);

            // Title
            PdfPCell titleCell = new PdfPCell(
                    new Phrase("Smart Energy Usage Bill", titleFont)
            );
            titleCell.setBorder(Rectangle.NO_BORDER);
            titleCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            titleCell.setHorizontalAlignment(Element.ALIGN_RIGHT);

            // Logo
            Image logo = Image.getInstance(
                    getClass().getClassLoader().getResource("static/logo.png")
            );
            logo.scaleAbsolute(40, 40);

            PdfPCell logoCell = new PdfPCell(logo);
            logoCell.setBorder(Rectangle.NO_BORDER);
            logoCell.setHorizontalAlignment(Element.ALIGN_LEFT);
            logoCell.setVerticalAlignment(Element.ALIGN_MIDDLE);

            headerTable.addCell(titleCell);
            headerTable.addCell(logoCell);

            document.add(headerTable);

            // ================= BILL DETAILS TABLE =================
            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(50);
            table.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.setSpacingAfter(20);
            table.setWidths(new float[]{1.5f, 2f});

            addRow(table, "Date", usage.getDate().toString(), labelFont, valueFont);
            addRow(table, "Units Consumed", String.valueOf(usage.getUnitsConsumed()), labelFont, valueFont);
            addRow(
                    table,
                    "Total Bill Amount",
                    "₹ " + String.format("%.2f", usage.getBillAmount()),
                    labelFont,
                    valueFont
            );

            document.add(table);

            // ================= FOOTER =================
            Paragraph footer = new Paragraph("Thank you for saving energy", footerFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private void addRow(
            PdfPTable table,
            String label,
            String value,
            Font labelFont,
            Font valueFont
    ) {
        PdfPCell cell1 = new PdfPCell(new Phrase(label, labelFont));
        PdfPCell cell2 = new PdfPCell(new Phrase(value, valueFont));

        cell1.setPadding(10);
        cell2.setPadding(10);

        table.addCell(cell1);
        table.addCell(cell2);
    }
}
