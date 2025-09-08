import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesmanLogs } from "../slices/stockSlice";
import { Container, Th, Td, Table, ButtonGroup, ProfitBox, LoadingText, Title, Button } from "../global/Style";

export default function SalesmanLogs() {
  const [range, setRange] = useState("daily");
  const dispatch = useDispatch();
  const { salesmanLogs, loading , error } = useSelector((state) => state.stock);
  const data = salesmanLogs[range];

  useEffect(() => {
    dispatch(fetchSalesmanLogs(range));
  }, [range, dispatch]);
  return (
    <Container>
      <Title>Sales Reports</Title>

      {/* Filter Buttons */}
      <ButtonGroup>
        <Button $active={range === "daily"} onClick={() => setRange("daily")}>
          Daily
        </Button>
        <Button $active={range === "monthly"} onClick={() => setRange("monthly")}>
          Monthly
        </Button>
        <Button $active={range === "yearly"} onClick={() => setRange("yearly")}>
          Yearly
        </Button>
      </ButtonGroup>

      {/* Loading */}
      {loading && <LoadingText>Loading reports...</LoadingText>}

      {error && <LoadingText style={{ color: "red" }}>Error: {error}</LoadingText>}

      {/* Data */}
      {data && (
        <>
          

          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th>Purchase Price</Th>
                <Th>Sale Price</Th>
                <Th>Profit</Th>
                <Th>Sold By</Th>
                <Th>Date</Th>
              </tr>
            </thead>
            <tbody>
              {data.logs.map((log, idx) => (
                <tr key={log._id}>
                  <Td>{idx + 1}</Td>
                  <Td>{log.productName}</Td>
                  <Td>{log.quantity}{log.unit}</Td>
                  <Td>Rs {log.purchasePrice}</Td>
                  <Td>Rs {log.salePrice}</Td>
                  <Td>Rs {log.profit}</Td>
                  <Td>{log.salesmanName}</Td>
                  <Td>{new Date(log.soldAt).toLocaleString()}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}
