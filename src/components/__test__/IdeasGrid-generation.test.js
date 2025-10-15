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
  // Mock window.open
  const mockWindowOpen = jest.fn();
  global.window.open = mockWindowOpen;

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

  describe('View Generated Image Button', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      imageGeneration.mockResolvedValue('https://example.com/test-image.jpg');
    });

    test('should not show "View Generated Image" button initially', () => {
      // Arrange & Act
      render(<IdeasGrid attributes={mockAttributes} />);

      // Assert
      expect(screen.queryByText('View Generated Image')).not.toBeInTheDocument();
    });

    test('should show "View Generated Image" button after successful image generation', async () => {
      // Arrange
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Act - Generate an image first
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);

      // Wait for image generation to complete
      await screen.findByAltText('Generated Character Image');

      // Close modal
      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);

      // Assert
      expect(screen.getByText('View Generated Image')).toBeInTheDocument();
    });

    test('should reopen modal when "View Generated Image" button is clicked', async () => {
      // Arrange
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Generate image first
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);
      await screen.findByAltText('Generated Character Image');
      
      // Close modal
      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);

      // Act - Click "View Generated Image"
      const viewImageButton = screen.getByText('View Generated Image');
      fireEvent.click(viewImageButton);

      // Assert
      expect(screen.getByText('Generated Character')).toBeInTheDocument();
      expect(screen.getByAltText('Generated Character Image')).toBeInTheDocument();
    });

    test('should maintain image URL when modal is closed and reopened', async () => {
      // Arrange
      const testImageUrl = 'https://example.com/test-character.jpg';
      imageGeneration.mockResolvedValue(testImageUrl);
      
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Generate image
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);
      await screen.findByAltText('Generated Character Image');
      
      // Verify initial image source
      const initialImage = screen.getByAltText('Generated Character Image');
      expect(initialImage).toHaveAttribute('src', testImageUrl);
      
      // Close modal
      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);

      // Reopen modal
      const viewImageButton = screen.getByText('View Generated Image');
      fireEvent.click(viewImageButton);

      // Assert - Same image URL should be preserved
      const reopenedImage = screen.getByAltText('Generated Character Image');
      expect(reopenedImage).toHaveAttribute('src', testImageUrl);
    });
  });

  describe('Maximize Image Button', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      imageGeneration.mockResolvedValue('https://example.com/test-image.jpg');
    });

    test('should not show maximize button during loading state', async () => {
      // Arrange
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Act - Start image generation
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);

      // Assert - During loading, maximize button should not be visible
      expect(screen.queryByText('Maximize')).not.toBeInTheDocument();
      expect(screen.getByText('Generating illustration of Image Idea. Please wait')).toBeInTheDocument();
    });

    test('should show maximize button when image is loaded', async () => {
      // Arrange
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Act - Generate image
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);

      // Wait for image to load
      await screen.findByAltText('Generated Character Image');

      // Assert
      expect(screen.getByText('Maximize')).toBeInTheDocument();
    });

    test('should open image in new tab when maximize button is clicked', async () => {
      // Arrange
      const testImageUrl = 'https://example.com/test-character.jpg';
      imageGeneration.mockResolvedValue(testImageUrl);
      
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Generate image
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);
      await screen.findByAltText('Generated Character Image');

      // Act - Click maximize button
      const maximizeButton = screen.getByText('Maximize');
      fireEvent.click(maximizeButton);

      // Assert
      expect(mockWindowOpen).toHaveBeenCalledWith(testImageUrl, '_blank');
    });

    test('should have proper tooltip on maximize button', async () => {
      // Arrange
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Generate image
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);
      await screen.findByAltText('Generated Character Image');

      // Assert
      const maximizeButton = screen.getByText('Maximize');
      expect(maximizeButton).toHaveAttribute('title', 'Open image in new tab to zoom, save, or view full size');
    });

    test('should preserve maximize functionality when modal is reopened', async () => {
      // Arrange
      const testImageUrl = 'https://example.com/maximize-test.jpg';
      imageGeneration.mockResolvedValue(testImageUrl);
      
      render(<IdeasGrid attributes={mockAttributes} />);
      
      // Generate image and close modal
      const generateButton = screen.getByText('Generate Image from Idea');
      fireEvent.click(generateButton);
      await screen.findByAltText('Generated Character Image');
      
      const closeButton = screen.getByText('×');
      fireEvent.click(closeButton);

      // Reopen modal
      const viewImageButton = screen.getByText('View Generated Image');
      fireEvent.click(viewImageButton);

      // Act - Click maximize in reopened modal
      const maximizeButton = screen.getByText('Maximize');
      fireEvent.click(maximizeButton);

      // Assert
      expect(mockWindowOpen).toHaveBeenCalledWith(testImageUrl, '_blank');
    });
  });
});
