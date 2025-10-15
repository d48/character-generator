import { OpenAI } from 'openai';
import imageGeneration from '../../lib/openai';

// Mock the OpenAI module
jest.mock('openai');

// Mock environment variables
const originalEnv = process.env;

describe('OpenAI Image Generation', () => {
  let mockOpenAI;
  let mockGenerate;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock console methods to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Setup OpenAI mock
    mockGenerate = jest.fn();
    mockOpenAI = {
      images: {
        generate: mockGenerate,
      },
    };

    OpenAI.mockImplementation(() => mockOpenAI);

    // Setup environment variables
    process.env = {
      ...originalEnv,
      REACT_APP_OPENAI_API_KEY: 'test-api-key',
    };
  });

  afterEach(() => {
    // Restore environment variables
    process.env = originalEnv;

    // Restore console methods
    console.log.mockRestore();
    console.error.mockRestore();
  });

  describe('Successful image generation', () => {
    test('should generate image with string attributes', async () => {
      // Arrange
      const attributes = 'tall, blonde hair, blue eyes';
      const mockResponse = {
        data: [
          {
            url: 'https://example.com/generated-image.jpg',
          },
        ],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      const result = await imageGeneration(attributes);

      // Assert
      expect(result).toBe('https://example.com/generated-image.jpg');
      expect(mockGenerate).toHaveBeenCalledWith({
        model: 'dall-e-3',
        prompt: expect.stringContaining(attributes),
        n: 1,
        size: '1792x1024',
      });
    });

    test('should generate image with array attributes', async () => {
      // Arrange
      const attributes = [
        { name: 'Hair', value: 'blonde' },
        { name: 'Eyes', value: 'blue' },
        { name: 'Height', value: 'tall' },
      ];
      const mockResponse = {
        data: [
          {
            url: 'https://example.com/generated-image.jpg',
          },
        ],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      const result = await imageGeneration(attributes);

      // Assert
      expect(result).toBe('https://example.com/generated-image.jpg');
      expect(mockGenerate).toHaveBeenCalledWith({
        model: 'dall-e-3',
        prompt: expect.stringContaining('blonde, blue, tall'),
        n: 1,
        size: '1792x1024',
      });
    });

    test('should include system message in prompt', async () => {
      // Arrange
      const attributes = 'red hair, green eyes';
      const mockResponse = {
        data: [{ url: 'https://example.com/image.jpg' }],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      await imageGeneration(attributes);

      // Assert
      const calledPrompt = mockGenerate.mock.calls[0][0].prompt;
      expect(calledPrompt).toContain('cartoon-style 2D digital character');
      expect(calledPrompt).toContain('Character description:');
      expect(calledPrompt).toContain(attributes);
    });

    test('should use correct OpenAI configuration', async () => {
      // Arrange
      const attributes = 'test attributes';
      const mockResponse = {
        data: [{ url: 'https://example.com/image.jpg' }],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      await imageGeneration(attributes);

      // Assert
      expect(OpenAI).toHaveBeenCalledWith({
        apiKey: 'test-api-key',
        dangerouslyAllowBrowser: true,
      });
    });
  });

  describe('Error handling', () => {
    test('should throw error when API key is missing', async () => {
      // Arrange
      delete process.env.REACT_APP_OPENAI_API_KEY;
      const attributes = 'test attributes';

      // Act & Assert
      await expect(imageGeneration(attributes)).rejects.toThrow(
        'Missing OpenAI API key in environment variables'
      );
    });

    test('should throw error when OpenAI API fails', async () => {
      // Arrange
      const attributes = 'test attributes';
      const apiError = new Error('API Error');
      mockGenerate.mockRejectedValue(apiError);

      // Act & Assert
      await expect(imageGeneration(attributes)).rejects.toThrow('API Error');
      expect(console.error).toHaveBeenCalledWith(
        'Error generating image:',
        'API Error'
      );
    });

    test('should throw error when no image data is received', async () => {
      // Arrange
      const attributes = 'test attributes';
      const mockResponse = {
        data: [],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act & Assert
      await expect(imageGeneration(attributes)).rejects.toThrow(
        'No image data received from OpenAI'
      );
    });

    test('should throw error when response is undefined', async () => {
      // Arrange
      const attributes = 'test attributes';
      mockGenerate.mockResolvedValue(undefined);

      // Act & Assert
      await expect(imageGeneration(attributes)).rejects.toThrow(
        'No image data received from OpenAI'
      );
    });

    test('should throw error when response data is undefined', async () => {
      // Arrange
      const attributes = 'test attributes';
      const mockResponse = {};
      mockGenerate.mockResolvedValue(mockResponse);

      // Act & Assert
      await expect(imageGeneration(attributes)).rejects.toThrow(
        'No image data received from OpenAI'
      );
    });
  });

  describe('Prompt generation', () => {
    test('should handle empty string attributes', async () => {
      // Arrange
      const attributes = '';
      const mockResponse = {
        data: [{ url: 'https://example.com/image.jpg' }],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      await imageGeneration(attributes);

      // Assert
      const calledPrompt = mockGenerate.mock.calls[0][0].prompt;
      expect(calledPrompt).toContain('Character description: ');
    });

    test('should handle complex object attributes', async () => {
      // Arrange
      const attributes = {
        hair: { color: 'blonde', style: 'curly' },
        eyes: { color: 'blue', shape: 'round' },
        clothing: ['shirt', 'pants'],
      };
      const mockResponse = {
        data: [{ url: 'https://example.com/image.jpg' }],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      await imageGeneration(attributes);

      // Assert
      const calledPrompt = mockGenerate.mock.calls[0][0].prompt;
      expect(calledPrompt).toContain(JSON.stringify(attributes));
    });
  });

  describe('Configuration validation', () => {
    test('should log generation details', async () => {
      // Arrange
      const attributes = 'test attributes';
      const mockResponse = {
        data: [{ url: 'https://example.com/image.jpg' }],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      await imageGeneration(attributes);

      // Assert
      expect(console.log).toHaveBeenCalledWith(
        'Generating image with prompt:',
        expect.any(String)
      );
      expect(console.log).toHaveBeenCalledWith(
        'OpenAI Response:',
        mockResponse
      );
    });

    test('should use correct DALL-E 3 parameters', async () => {
      // Arrange
      const attributes = 'test';
      const mockResponse = {
        data: [{ url: 'https://example.com/image.jpg' }],
      };
      mockGenerate.mockResolvedValue(mockResponse);

      // Act
      await imageGeneration(attributes);

      // Assert
      expect(mockGenerate).toHaveBeenCalledWith({
        model: 'dall-e-3',
        prompt: expect.any(String),
        n: 1,
        size: '1792x1024',
      });
    });
  });
});
