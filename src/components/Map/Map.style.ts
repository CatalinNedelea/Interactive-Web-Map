import styled from "styled-components";

// Container for the entire page
export const PageContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  margin: 0;
  overflow: hidden;
`;

// Container for the map
export const MapContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0; /* Lower z-index to render below buttons */
`;

// Container for the buttons
export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1; /* Higher z-index to render above map */
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    border: 1px solid #000000;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
`;
