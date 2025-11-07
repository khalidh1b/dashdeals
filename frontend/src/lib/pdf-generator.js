import { jsPDF } from "jspdf"

export class OrderInvoiceGenerator {
  static generateInvoice(order) {
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15

      // Header
      doc.setFillColor(21, 15, 15)
      doc.rect(0, 0, pageWidth, 30, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(20)
      doc.text("INVOICE", margin, 20)

      // Reset text color
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(10)

      // Order information
      let yPos = 45
      doc.text(`Order ID: ${order.orderId}`, margin, yPos)
      yPos += 7
      doc.text(`Order Date: ${order.date}`, margin, yPos)
      yPos += 7
      doc.text(`Tracking ID: ${order.trackingId}`, margin, yPos)
      yPos += 7
      doc.text(`Status: ${order.status?.toUpperCase() || 'UNKNOWN'}`, margin, yPos)

      // Items
      yPos += 15
      doc.setFontSize(12)
      doc.text("Order Details:", margin, yPos)
      yPos += 8
      doc.setFontSize(10)
      
      // Format items for PDF
      const itemsText = order.products?.map(p => p.product_title).join(', ') || 'No items'
      const splitItems = doc.splitTextToSize(itemsText, pageWidth - 2 * margin)
      doc.text(splitItems, margin, yPos)
      yPos += splitItems.length * 5 + 10

      // Total
      doc.setFontSize(14)
      doc.setFont(undefined, "bold")
      doc.text(`Total: $${order.total}`, margin, yPos)

      // Footer
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, pageHeight - 10, { align: "center" })

      doc.save(`invoice-${order.orderId}.pdf`)
      return { success: true }
    } catch (error) {
      console.error('Error generating invoice:', error)
      return { success: false, error: error.message }
    }
  }
};