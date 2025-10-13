import { OpenAI } from 'openai';

function openAiConfig() {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenAI API key in environment variables');
  }
  return {
    apiKey,
    dangerouslyAllowBrowser: true,
  };
}

const SYSTEM_MESSAGE =
  'You are an illustration generator that creates cartoon-style 2D digital characters based on a set of provided attributes. Always produce a clean, bold, flat-color cartoon with thick outlines, expressive facial features, and a playful aesthetic. The character must embody all attributes given (such as hairstyle, skin color, weight, height, clothing, props, emotions, and actions). Show the full character in a neutral background, posed naturally to match the description. Ensure proportions and details clearly reflect the attributes in a fun, exaggerated cartoon style';

export default async function imageGeneration(attributes) {
  try {
    const openai = new OpenAI(openAiConfig());

    // Build a clear prompt from the system message and provided attributes
    const attrsString =
      typeof attributes === 'string' ? attributes : JSON.stringify(attributes);
    const prompt = `${SYSTEM_MESSAGE}. Character attributes: ${attrsString}`;

    console.log('Generating image with prompt:', prompt);

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1792x1024',
    });

    console.log('OpenAI Response:', response);
    if (!response?.data?.length) {
      throw new Error('No image data received from OpenAI');
    }

    const imageUrl = response.data[0].url;
    // Return the image URL that can be displayed in the browser
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error?.message ?? error);
    throw error;
  }
}
