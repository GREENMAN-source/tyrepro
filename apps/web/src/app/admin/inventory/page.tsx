import { DataTable } from "@/components/admin/data-table";
import { inventoryRows } from "@/lib/demo-data";

export default function InventoryPage() {
  return (
    <DataTable
      title="Inventory management"
      rows={inventoryRows}
      columns={[
        { key: "sku", label: "SKU/Barcode" },
        { key: "product", label: "Product" },
        { key: "brand", label: "Brand" },
        { key: "batch", label: "Batch" },
        { key: "qty", label: "Qty" },
        { key: "warehouse", label: "Location" },
        { key: "age", label: "Age" },
        { key: "status", label: "Status" }
      ]}
    />
  );
}
