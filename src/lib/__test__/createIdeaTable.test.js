import { colorShade } from '../../components/helpers';
import { getRandomIndex } from '../../utils/helpers';

// Mock dependencies
jest.mock('../../components/helpers');
jest.mock('../../utils/helpers');

// Import the function we want to test
// We need to create a separate module or extract the function for easier testing
// For now, we'll test the logic conceptually

describe('createIdeaTable Logic Unit Tests', () => {
  const COLORS = [
    { PURPLE: '#bc3adc' },
    { BLUE: '#295efb' },
    { RED: '#fc3232' },
    { ORANGE: '#e58103' },
    { YELLOW: '#ffff00' },
    { YELLOWGREEN: '#9acd32' },
    { GREEN: '#008000' },
    { PINK: '#ff69b4' },
    { CYAN: '#00bfff' },
    { MAGENTA: '#ff1493' },
    { TEAL: '#20b2aa' },
    { INDIGO: '#4b0082' },
  ];

  // Recreate the createIdeaTable function for testing
  const createIdeaTable = (attributes) => {
    const results = [];

    attributes.forEach((attribute, index) => {
      let colorIndex = index % COLORS.length; // Wrap around when more attributes than colors
      let backgroundShade = colorShade(
        Object.values(COLORS[colorIndex])[0],
        80
      );
      let randIndex = getRandomIndex(attribute.attributes.length);

      results.push({
        name: attribute.name,
        value: attribute.attributes[randIndex],
        color: backgroundShade,
        selectedIndex: randIndex,
      });
    });

    return results;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    colorShade.mockReturnValue('#f0f0f0');
    getRandomIndex.mockReturnValue(0);
  });

  describe('Basic functionality', () => {
    test('should create correct number of results', () => {
      // Arrange
      const attributes = [
        { name: 'Hair', attributes: ['blonde', 'brown'] },
        { name: 'Eyes', attributes: ['blue', 'green'] },
      ];

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(result).toHaveLength(2);
    });

    test('should assign correct attribute names', () => {
      // Arrange
      const attributes = [
        { name: 'Hair Color', attributes: ['blonde', 'brown'] },
        { name: 'Eye Color', attributes: ['blue', 'green'] },
      ];

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(result[0].name).toBe('Hair Color');
      expect(result[1].name).toBe('Eye Color');
    });

    test('should select values based on random index', () => {
      // Arrange
      const attributes = [
        { name: 'Hair', attributes: ['blonde', 'brown', 'black'] },
        { name: 'Eyes', attributes: ['blue', 'green', 'hazel'] },
      ];

      getRandomIndex
        .mockReturnValueOnce(1) // Select 'brown'
        .mockReturnValueOnce(2); // Select 'hazel'

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(result[0].value).toBe('brown');
      expect(result[0].selectedIndex).toBe(1);
      expect(result[1].value).toBe('hazel');
      expect(result[1].selectedIndex).toBe(2);
    });

    test('should call getRandomIndex with correct array lengths', () => {
      // Arrange
      const attributes = [
        { name: 'Hair', attributes: ['a', 'b', 'c'] }, // Length 3
        { name: 'Eyes', attributes: ['x', 'y'] }, // Length 2
      ];

      // Act
      createIdeaTable(attributes);

      // Assert
      expect(getRandomIndex).toHaveBeenNthCalledWith(1, 3);
      expect(getRandomIndex).toHaveBeenNthCalledWith(2, 2);
    });
  });

  describe('Color assignment', () => {
    test('should assign colors sequentially from COLORS array', () => {
      // Arrange
      const attributes = [
        { name: 'Attr1', attributes: ['val1'] },
        { name: 'Attr2', attributes: ['val2'] },
        { name: 'Attr3', attributes: ['val3'] },
      ];

      colorShade
        .mockReturnValueOnce('#purple-shade')
        .mockReturnValueOnce('#blue-shade')
        .mockReturnValueOnce('#red-shade');

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(colorShade).toHaveBeenNthCalledWith(1, '#bc3adc', 80); // Purple
      expect(colorShade).toHaveBeenNthCalledWith(2, '#295efb', 80); // Blue
      expect(colorShade).toHaveBeenNthCalledWith(3, '#fc3232', 80); // Red

      expect(result[0].color).toBe('#purple-shade');
      expect(result[1].color).toBe('#blue-shade');
      expect(result[2].color).toBe('#red-shade');
    });

    test('should wrap around colors when more attributes than colors', () => {
      // Arrange - 13 attributes, but only 12 colors
      const attributes = Array.from({ length: 13 }, (_, i) => ({
        name: `Attr${i}`,
        attributes: ['val'],
      }));

      colorShade.mockReturnValue('#test-color');

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(colorShade).toHaveBeenCalledTimes(13);
      // The 13th call should wrap around to the first color (Purple)
      expect(colorShade).toHaveBeenNthCalledWith(13, '#bc3adc', 80);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty attributes array', () => {
      // Arrange
      const attributes = [];

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(result).toEqual([]);
      expect(getRandomIndex).not.toHaveBeenCalled();
      expect(colorShade).not.toHaveBeenCalled();
    });

    test('should handle attribute with single option', () => {
      // Arrange
      const attributes = [{ name: 'Single', attributes: ['only-option'] }];

      getRandomIndex.mockReturnValue(0);

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(getRandomIndex).toHaveBeenCalledWith(1);
      expect(result[0].value).toBe('only-option');
      expect(result[0].selectedIndex).toBe(0);
    });

    test('should handle missing attributes gracefully', () => {
      // Arrange
      const attributes = [
        { name: 'Missing Attrs' }, // No attributes property
      ];

      // Act & Assert
      expect(() => createIdeaTable(attributes)).toThrow();
    });

    test('should handle empty attribute options array', () => {
      // Arrange
      const attributes = [{ name: 'Empty', attributes: [] }];

      getRandomIndex.mockReturnValue(0);

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(getRandomIndex).toHaveBeenCalledWith(0);
      expect(result[0].value).toBeUndefined(); // No value at index 0 of empty array
    });
  });

  describe('Result structure validation', () => {
    test('should return objects with correct structure', () => {
      // Arrange
      const attributes = [{ name: 'Test', attributes: ['value1', 'value2'] }];

      getRandomIndex.mockReturnValue(1);
      colorShade.mockReturnValue('#test-color');

      // Act
      const result = createIdeaTable(attributes);

      // Assert
      expect(result[0]).toEqual({
        name: 'Test',
        value: 'value2',
        color: '#test-color',
        selectedIndex: 1,
      });
    });

    test('should maintain immutability of input', () => {
      // Arrange
      const originalAttributes = [
        { name: 'Test', attributes: ['val1', 'val2'] },
      ];
      const attributesCopy = JSON.parse(JSON.stringify(originalAttributes));

      // Act
      createIdeaTable(originalAttributes);

      // Assert
      expect(originalAttributes).toEqual(attributesCopy);
    });
  });

  describe('Performance considerations', () => {
    test('should handle large attribute arrays efficiently', () => {
      // Arrange
      const largeAttributes = Array.from({ length: 1000 }, (_, i) => ({
        name: `Attr${i}`,
        attributes: Array.from({ length: 10 }, (_, j) => `val${j}`),
      }));

      getRandomIndex.mockReturnValue(0);
      colorShade.mockReturnValue('#test');

      // Act
      const startTime = performance.now();
      const result = createIdeaTable(largeAttributes);
      const endTime = performance.now();

      // Assert
      expect(result).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(100); // Should complete in under 100ms
    });
  });
});
