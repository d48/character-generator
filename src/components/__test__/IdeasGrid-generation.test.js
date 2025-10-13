import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IdeasGrid from '../IdeasGrid';
import imageGeneration from '../../lib/openai';
import { colorShade } from '../helpers';
import { getRandomIndex } from '../../utils/helpers';

// Mock dependencies
jest.mock('../../lib/openai');
jest.mock('../helpers');
jest.mock('../../utils/helpers');
jest.mock('jspdf', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setFontSize: jest.fn(),
    setFont: jest.fn(),
    text: jest.fn(),
    addImage: jest.fn(),
    addPage: jest.fn(),
    save: jest.fn(),
  })),
}));

// Mock console methods
const originalConsole = { ...console };

describe('IdeasGrid Generation Logic', () => {
  const mockAttributes = [
    {
      name: 'Hair Color',
      attributes: ['blonde', 'brown', 'black', 'red'],
    },
    {
      name: 'Eye Color',
      attributes: ['blue', 'brown', 'green', 'hazel'],
    },
    {
      name: 'Height',
      attributes: ['tall', 'medium', 'short'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock console methods
    console.log = jest.fn();
    console.error = jest.fn();

    // Setup default mocks
    colorShade.mockReturnValue('#f0f0f0');
    getRandomIndex.mockReturnValue(0);
    imageGeneration.mockResolvedValue('https://example.com/test-image.jpg');
  });

  afterEach(() => {
    // Restore console
    Object.assign(console, originalConsole);
  });

  describe('createIdeaTable function', () => {
    test('should create idea table with correct structure', () => {
      // Arrange
      getRandomIndex
        .mockReturnValueOnce(1) // Hair Color -> 'brown'
        .mockReturnValueOnce(2) // Eye Color -> 'green'
        .mockReturnValueOnce(0); // Height -> 'tall'

      colorShade
        .mockReturnValueOnce('#bc3adc80') // Purple shade
        .mockReturnValueOnce('#295efb80') // Blue shade
        .mockReturnValueOnce('#fc323280'); // Red shade

      // Act
      render(<IdeasGrid attributes={mockAttributes} />);

      // Assert - Check that getRandomIndex was called correctly
      expect(getRandomIndex).toHaveBeenCalledWith(4); // Hair Color length
      expect(getRandomIndex).toHaveBeenCalledWith(4); // Eye Color length
      expect(getRandomIndex).toHaveBeenCalledWith(3); // Height length

      // Check that colorShade was called for each attribute
      expect(colorShade).toHaveBeenCalledWith('#bc3adc', 80); // Purple
      expect(colorShade).toHaveBeenCalledWith('#295efb', 80); // Blue
      expect(colorShade).toHaveBeenCalledWith('#fc3232', 80); // Red
    });

    test('should handle empty attributes array', () => {
      // Act & Assert - Should not crash with empty array
      expect(() => {
        render(<IdeasGrid attributes={[]} />);
      }).not.toThrow();
    });

    test('should assign colors cyclically when more attributes than colors', () => {
      // Arrange - Create more attributes than available colors (12)
      const manyAttributes = Array.from({ length: 15 }, (_, i) => ({
        name: `Attribute ${i}`,
        attributes: ['option1', 'option2'],
      }));

      getRandomIndex.mockReturnValue(0);
      colorShade.mockReturnValue('#test');

      // Act
      render(<IdeasGrid attributes={manyAttributes} />);

      // Assert - Should use colors cyclically
      expect(colorShade).toHaveBeenCalledTimes(15);
    });
  });

  describe('Shuffle functionality', () => {
    test('should regenerate idea table when shuffle is clicked', () => {
      // Arrange
      const { rerender } = render(<IdeasGrid attributes={mockAttributes} />);
      const shuffleButton = screen.getByText('Shuffle Idea');

      const initialCallCount = getRandomIndex.mock.calls.length;

      // Act
      fireEvent.click(shuffleButton);

      // Assert - getRandomIndex should be called again for new random selections
      expect(getRandomIndex.mock.calls.length).toBeGreaterThan(
        initialCallCount
      );
    });
  });

  describe('Edge cases', () => {
    test('should handle attributes with single option', () => {
      // Arrange
      const singleOptionAttributes = [
        {
          name: 'Single Option',
          attributes: ['only-option'],
        },
      ];

      getRandomIndex.mockReturnValue(0);

      // Act & Assert
      expect(() => {
        render(<IdeasGrid attributes={singleOptionAttributes} />);
      }).not.toThrow();

      expect(getRandomIndex).toHaveBeenCalledWith(1);
    });

    test('should handle missing attribute properties', () => {
      // Arrange
      const malformedAttributes = [
        { name: 'Test' }, // Missing attributes array
      ];

      // Act & Assert - Should handle gracefully
      expect(() => {
        render(<IdeasGrid attributes={malformedAttributes} />);
      }).not.toThrow();
    });
  });
});
