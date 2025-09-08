import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockSummary } from '../slices/stockSlice';
import {
  ProductListWrapper,
  ProductItem,
  ProductName,
  StockStatus,
  StockBadge,
  InventoryTableWrapper,
  InventoryTable,
  Thead,
  Th,
  Tr,
  Td,
  StatusBadgeTable,
  ChartContainer,
  DashboardChartsWrapper,
} from '../global/Summery';
import { CardSummery, Container, Grid, Heading } from '../global/Style';
import ProfitGraph from './ProfitGraph';
import FruitStockChart from './FruitStockChart';

function DashboardBlocks() {
  const dispatch = useDispatch();
  const { summary, loading, error, lastFetched } = useSelector((state) => state.stock);

  useEffect(() => {
    const cacheTime = 5 * 60 * 1000;
    const now = Date.now();

    if (!summary || !lastFetched || now - lastFetched > cacheTime) {
      dispatch(fetchStockSummary());
    }
  }, [dispatch, summary, lastFetched]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!summary) return <div>Data not available.</div>;

  return (
    <Container>
      {/* Existing Summary Grid */}
      <Grid>
        <CardSummery>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Heading style={{ marginBottom: '0' }}>Total Products</Heading>
            <span style={{ fontSize: '1.5rem', color: '#6b7280' }}></span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{summary.totalProducts}</p>
        </CardSummery>

        <CardSummery>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Heading style={{ marginBottom: '0' }}>Total Stock</Heading>
            <span style={{ fontSize: '1.5rem', color: '#6b7280' }}></span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{summary.remainingstock}</p>
        </CardSummery>

        <CardSummery>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Heading style={{ marginBottom: '0' }}>Low Stock Items</Heading>
            <span style={{ fontSize: '1.5rem', color: '#dc2626' }}></span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626', margin: '0.5rem 0' }}>{summary.lowStockItems}</p>
        </CardSummery>

        <CardSummery>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Heading style={{ marginBottom: '0' }}>Total Value</Heading>
            <span style={{ fontSize: '1.5rem', color: '#6b7280' }}>$</span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0' }}>{Number(summary.totalValue).toFixed(2)}</p>
        </CardSummery>
      </Grid>

      <DashboardChartsWrapper>
        <ChartContainer>
        <ProfitGraph />
        </ChartContainer>
        <ChartContainer>
        <FruitStockChart />
        </ChartContainer>
      </DashboardChartsWrapper>
      {/* Product List Section (Now filtered for low and out of stock) */}
      <ProductListWrapper>
        <Heading style={{ marginBottom: '1rem' }}>Low Stock and Out of Stock Products</Heading>
        {summary.items &&
          summary.items
            .filter((item) => {
              const quantity = Number(item.remaining);
              return quantity <= 5;
            })
            .map((item) => {
              const quantity = Number(item.remaining);
              const isOutOfStock = quantity === 0;
              const isLowStock = quantity > 0 && quantity <= 5;

              return (
                <ProductItem key={item._id}>
                  <ProductName>{item.name}</ProductName>
                  <StockStatus>
                    <span style={{ color: '#6b7280' }}>
                      Current: {quantity} {item.unit}
                    </span>
                    {isOutOfStock && <StockBadge $isOutOfStock>Out of Stock</StockBadge>}
                    {isLowStock && <StockBadge $isLowStock>Low Stock</StockBadge>}
                  </StockStatus>
                </ProductItem>
              );
            })}
      </ProductListWrapper>

      {/* Corrected Inventory Overview Table */}
      <InventoryTableWrapper>
        <Heading style={{ marginBottom: '0.5rem' }}>Inventory Overview</Heading>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Complete list of products with current stock levels</p>

        <InventoryTable>
          <Thead>
            <Tr>
              <Th>Product ID</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Stock</Th>
              <Th>Purchase Price</Th>
              <Th>Sale Price</Th>
              <Th>Supplier</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <tbody>
            {summary.items &&
              summary.items.map((item) => {
                let status = 'In Stock';
                const quantity = Number(item.remaining);
                if (quantity === 0) {
                  status = 'Out of Stock';
                } else if (quantity <= 5) {
                  status = 'Low Stock';
                }

                return (
                  <Tr key={item._id}>
                    <Td>{item.productID || 'N/A'}</Td>
                    <Td>{item.name || 'N/A'}</Td>
                    <Td>{item.category || 'Fruit'}</Td>
                    <Td>{item.remaining || 'N/A'}</Td>
                    <Td>PKR{Number(item.purchasePrice)}</Td>
                    <Td>PKR{Number(item.salePrice)}</Td>
                    <Td>{item.supplier || 'MANA Farms'}</Td>
                    <Td>
                      <StatusBadgeTable $status={status}>{status}</StatusBadgeTable>
                    </Td>
                  </Tr>
                );
              })}
          </tbody>
        </InventoryTable>
      </InventoryTableWrapper>
    </Container>
  );
}

export default DashboardBlocks;
