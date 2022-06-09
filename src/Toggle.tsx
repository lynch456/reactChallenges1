import { useState } from "react";
import styled from "styled-components";
const Button = styled.button`
  width: 50px;
  height: 30px;
`;
function Toggle() {
  const [toggle, setToggle] = useState("dark");
  const textChange = () => setToggle(toggle === "dark" ? "light" : "dark");
  return (
    <Button>
      <span onClick={textChange}>{toggle}</span>
    </Button>
  );
}

export default Toggle;
