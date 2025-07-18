import React, { createContext, useContext, useState } from 'react';
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';

// Create a Theme Context
const ThemeContext = createContext();

// ThemeProvider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={themes[theme]}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
}

// Define light and dark themes
const themes = {
    light: {
        background: '#ffffff',
        color: '#333',
    },
    dark: {
        background: '#333',
        color: '#ffffff',
    },
};

// ThemedComponent using useContext
function ThemedComponent() {
    const { theme } = useContext(ThemeContext);
    return (
        <Container>
            <h1>Current Theme: {theme}</h1>
        </Container>
    );
}

// ToggleButton component
function ToggleButton() {
    const { toggleTheme } = useContext(ThemeContext);
    return <Button onClick={toggleTheme}>Change Theme</Button>;
}

// ThemedParagraph component
function ThemedParagraph() {
    const { theme } = useContext(ThemeContext);
    return (
        <Paragraph>
            This is a themed paragraph. The current theme is {theme}.
        </Paragraph>
    );
}

// ThemedCard component
function ThemedCard() {
    const { theme } = useContext(ThemeContext);
    return (
        <Card>
            <h2>Themed Card</h2>
            <p>The theme is currently set to</p>
        </Card>
    );
}

// Styled components
const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 2rem;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

// Styled components for new components
const Paragraph = styled.p`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-top: 1rem;
`;

// Main component
function ThemeExample() {
    return (
        <ThemeProvider>
            <ThemedComponent />
            <ThemedParagraph />
            <ThemedCard />
            <ToggleButton />
        </ThemeProvider>
    );
}

export default ThemeExample; 