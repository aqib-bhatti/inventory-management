import React, { useEffect, useState } from 'react';
import { Input, Title, Container, Button, Message, Label, Form, Th, Td, Tr, Table, Thead } from '../global/Style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory } from '../slices/inventoryslice';
import { createSale } from '../slices/stockSlice';

export default function Sales() {
  const dispatch = useDispatch();

  const { items: products = [], loading: inventoryLoading, error: inventoryError } = useSelector((state) => state.inventory);

  const { loading: saleLoading, error: saleError } = useSelector((state) => state.stock);

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleProductSelect = (selectedName) => {
    setProductName(selectedName);
    const selected = products.find((p) => p.name === selectedName);
    if (selected) {
      setProductId(selected._id);
      // Immediate stock check
      if (selected.quantity === 0) {
        setMessage('Out of stock!');
      } else {
        setMessage('');
      }
    } else {
      setProductId('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProduct = products.find((p) => p._id === productId);

    if (!selectedProduct) {
      setMessage('Please select a valid product');
      return;
    }

    if (Number(quantity) > selectedProduct.quantity || selectedProduct.quantity === 0) {
      setMessage('Out of stock! Available: ' + selectedProduct.quantity);
      return;
    }

    try {
      const res = await dispatch(createSale({ productId, quantity })).unwrap();

      setMessage(res.message || 'Sale recorded');
      setQuantity('');
      setProductId('');
      setProductName('');

      dispatch(fetchInventory());
    } catch (err) {
      setMessage(err || 'Sale failed');
    }
  };

  const selectedProduct = products.find((p) => p._id === productId);
  const totalPrice = selectedProduct && quantity ? Number(selectedProduct.salePrice) * Number(quantity) : 0;

  const isOutOfStock = selectedProduct?.quantity === 0;

  return (
    <Container>
      <Title>Record a Sale</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Enter Product</Label>
          <Input list="products" value={productName} onChange={(e) => handleProductSelect(e.target.value)} required />
          <datalist id="products">
            {Array.isArray(products) &&
              products.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name} (Stock: {p.quantity})
                </option>
              ))}
          </datalist>
        </div>

        <div>
          <Label>Quantity</Label>
          <Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required disabled={isOutOfStock} />
        </div>

        <Button type="submit" disabled={saleLoading || isOutOfStock}>
          {saleLoading ? 'Processing...' : `Sell ${totalPrice > 0 ? `(Total: ${totalPrice})` : ''}`}
        </Button>
      </Form>

      {(message || inventoryError || saleError) && (
        <Message $error={message.toLowerCase().includes('failed') || message.toLowerCase().includes('out of stock') || inventoryError || saleError}>
          {message || inventoryError || saleError}
        </Message>
      )}

      {/* --- All Products List --- */}
      <div style={{ marginTop: '2rem' }}>
        <Title>📦 All Products</Title>

        {inventoryLoading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <Table>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Product Name</Th>
                <Th>Stock</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            <tbody>
              {products.map((p, index) => (
                <Tr
                  key={p._id}
                  style={{
                    backgroundColor: p.quantity === 0 ? '#ffe5e5' : 'transparent',
                  }}
                >
                  <Td>{index + 1}</Td>
                  <Td>{p.name}</Td>
                  <Td>{p.quantity}</Td>
                  <Td>{p.salePrice}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </Container>
  );
}
