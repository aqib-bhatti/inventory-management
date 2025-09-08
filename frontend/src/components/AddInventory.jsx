import { useState, useEffect } from "react";
import {
  Heading,
  Container,
  Title,
  Message,
  Form,
  Input,
  Button,
  Tdt,
  Tr,
  Th,
} from "../global/Style";
import {
  fetchInventory,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../slices/inventoryslice";
import { useDispatch, useSelector } from "react-redux";

export default function CreateInventory() {
  const dispatch = useDispatch();
  const { items, loading, message, error } = useSelector(
    (state) => state.inventory
  );
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [unit, setUnit] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all inventory on component mount
  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(
        updateInventoryItem({
          id: editingId,
          name,
          quantity,
          salePrice,
          purchasePrice,
          unit,
        })
      );
      setEditingId(null);
    } else {
      dispatch(addInventoryItem({ name, quantity, salePrice, purchasePrice, unit }));
    }
    setName("");
    setQuantity("");
    setSalePrice("");
    setPurchasePrice("");
    setUnit("");
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setQuantity(item.quantity);
    setSalePrice(item.salePrice);
    setPurchasePrice(item.purchasePrice);
    setUnit(item.unit);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteInventoryItem(id));
      setCurrentPage(1); 
    }
  };

  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <Container>
      <Heading>{editingId ? "Edit Inventory" : "Add Inventory"}</Heading>
      {message && <Message>{message}</Message>}
      {error && <Message style={{ color: "red" }}>{error}</Message>}

      {/* Add/Edit Form */}
      <Form onSubmit={handleAdd}>
        <Input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Sale Price"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Purchase Price"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Set Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update" : "Add"}
        </Button>
      </Form>

      ---

      {/* Show All Inventory */}
      <Title>All Inventory</Title>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
        <thead>
          <Tr>
            <Th>NO.</Th>
            <Th>Name</Th>
            <Th>Quantity</Th>
            <Th>Unit</Th>
            <Th>Purchase Price</Th>
            <Th>Sale Price</Th>
            <Th>Stock In Date</Th>
            <Th>Actions</Th>
          </Tr>
        </thead>
        <tbody>
          {/* We now map over `currentItems` instead of `items` */}
          {currentItems.map((item, index) => (
            <Tr key={item._id}>
              <Tdt>{startIndex + index + 1}</Tdt>
              <Tdt>{item.name}</Tdt>
              <Tdt>{item.quantity}</Tdt>
              <Tdt>{item.unit || "-"}</Tdt>
              <Tdt>{item.purchasePrice}</Tdt>
              <Tdt>{item.salePrice}</Tdt>
              <Tdt>{new Date(item.stockInDate).toLocaleDateString()}</Tdt>
              <Tdt>
                <Button onClick={() => handleEdit(item)} style={{ marginRight: "5px" }}>
                  Edit
                </Button>
                <Button onClick={() => handleDelete(item._id)}>Delete</Button>
              </Tdt>
            </Tr>
          ))}
        </tbody>
      </table>

      ---

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {/* Generate buttons for each page */}
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              margin: "0 5px",
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#f0f0f0",
              color: currentPage === i + 1 ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </Container>
  );
}