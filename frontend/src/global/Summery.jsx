import styled from "styled-components";


export const ProductListWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  &:last-child {
    border-bottom: none;
  }
`;

export const ProductName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const StockStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StockBadge = styled.span`
  background-color: ${props => {
    if (props.$isOutOfStock) return '#fee2e2';
    if (props.$isLowStock) return '#fef9c3';
    return '#d1fae5';
  }};
  color: ${props => {
    if (props.$isOutOfStock) return '#dc2626';
    if (props.$isLowStock) return '#d97706';
    return '#047857';
  }};
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
`;

// Styled components for the Inventory Table
export const InventoryTableWrapper = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

export const InventoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: #f9fafb;
`;

export const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  color: #1f2937;
`;

export const StatusBadgeTable = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
  color: #fff;
  background-color: ${props => {
    if (props.$status === 'Out of Stock') return '#ef4444';
    if (props.$status === 'Low Stock') return '#f97316';
    return '#22c55e';
  }};
`;


export const GraphContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 20px auto;
`;



export const GraphHeader = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    color: #777;
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
`;


export const DashboardChartsWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ChartContainer = styled.div`
  flex: 1;
  min-width: 400px;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;