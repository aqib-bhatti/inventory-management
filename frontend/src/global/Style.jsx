import styled from "styled-components";

export const SignupFrom = styled.div`
  width: 300px;
  margin: 80px auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(76, 236, 13, 0.4);
`;

export const Heading = styled.h1`
  font-size: 24px;
  color: #008000;
  text-align: center;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

export const SignupButton = styled.button`
  background-color: #008000;
  cursor: pointer;
  border-radius: 20px;
  border: none;
  padding: 10px 20px;
  text-decoration: none;
  color: white;
`;

// -----------------

export const DashboardContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 2rem;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

export const Header = styled.h1`
  font-size: 2.5rem;
  color: #065f46;
  margin-bottom: 1rem;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  font-size: 1.1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  border-bottom: 4px solid transparent;
  color: ${(props) => (props.$active ? "#065f46" : "#555")};
  border-bottom-color: ${(props) =>
    props.$active ? "#065f46" : "transparent"};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #065f46;
  }
`;

export const ContentContainer = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background: ${(props) => props.bgColor || "#f8f9fa"};
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 5px solid ${(props) => props.borderColor || "#065f46"};
  h3 {
    margin-top: 0;
    color: #333;
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    color: #065f46;
    margin: 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
`;

export const Th = styled.th`
  background-color: #eef2f7;
  text-align: center;
  color: #333;
  padding: 0.8rem 1rem;

  font-weight: 600;
`;

export const Td = styled.td`
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #e5e5e5;
`;

export const Tr = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
`;

export const ActionButton = styled.button`
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

export const AddButton = styled(ActionButton)`
  background-color: #065f46;
  font-size: 1rem;
  padding: 10px 20px;
`;

// add inventory

export const Container = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const Message = styled.p`
  text-align: center;

  margin-bottom: 15px;
  font-weight: bold;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #065f46;
  }
`;

export const Button = styled.button`
  padding: 10px 18px;
  background: #065f46;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #065f46;
  }
`;

export const Tdt = styled.td`
  flex: 1;

  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #065f46;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const CardSummery = styled.div`
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.bg || "#f5f5f5"};

  h2 {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    margin: 4px 0;
  }
`;

export const ItemsWrapper = styled.div`
  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

export const Thead = styled.thead`
  background: #f0f0f0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const ProfitBox = styled.div`
  background-color: #d1fae5;
  color: #065f46;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export const LoadingText = styled.p`
  font-size: 16px;
  color: #555;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #444;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const LogoutButton2 = styled.button`
  background-color: white; /* Red */
  color: #ef4444;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
`;

// src/global/SidebarStyle.js

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 93vh;
  background-color: #065f46; /* Dark sidebar background */
  color: #ecf0f1; /* Light text color */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const SidebarHeader = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  font-size: 1.5rem;
`;

export const SidebarMenuItem = styled.div`
  padding: 15px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-weight: 500;

  background-color: ${(props) =>
    props.$active ? " #087d5cff" : "transparent"};

  &:hover {
    background-color: #087d5cff;
  }
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #087d5cff;
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

export const DashboardContainerFlex = styled.div`
  display: flex; /* This is the key change */
  height: 95vh;
  width: 100%;
  background-color: #f4f7f9;
`;

export const ContentContainerFlex = styled.main`
  flex-grow: 1; /* This makes the content container take up the remaining space */
  padding: 20px;
  overflow-y: auto; /* Allows scrolling if content overflows */
`;

export const LabelC = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
`;

export const InputC = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensures padding doesn't affect total width */
`;

export const SelectC = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export const FormContainerC = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; /* Increased gap for better spacing */
`;

export const CreateEmployeesFrom = styled.div`
  width: 600px;
  margin: 80px auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(76, 236, 13, 0.4);
`;

// src/global/Style.js

export const ActionButton2 = styled.button`
  background-color: ${(props) => (props.danger ? "#e74c3c" : "#2ecc71")};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-right: 8px;

  &:hover {
    opacity: 0.8;
  }
`;




// Summary Section
export const Container2 = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
`;

export const CardSummery2 = styled.div`
  background: ${(props) => props.bg};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;

  p {
    font-size: 1rem;
    color: #4b5563;
    margin: 0.5rem 0;
  }
`;

// Items Table Section
export const ItemsWrapper2 = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

export const Heading2 = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const Table2 = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const Thead2= styled.thead`
  background-color: #f3f4f6;
  color: #374151;
`;

export const Tr2 = styled.tr`
  &:nth-child(even) {
    background-color: #f9fafb;
  }
`;

export const Th2 = styled.th`
  padding: 0.75rem 1rem;
  font-weight: 600;
  border: 1px solid #e5e7eb;
`;

export const Tdt2 = styled.td`
  padding: 0.75rem 1rem;
  color: #4b5563;
  border: 1px solid #e5e7eb;
  &.stock-in-daily,
  &.stock-in-monthly,
  &.stock-in-yearly {
    color: #10b981;
    font-weight: 600;
  }
  &.stock-out-daily,
  &.stock-out-monthly,
  &.stock-out-yearly {
    color: #ef4444;
    font-weight: 600;
  }
`;