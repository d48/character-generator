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

const SYSTEM_MESSAGE = 'Create a full-body, head-to-toe cartoon-style 2D digital character with bold outlines, flat colors, and expressive features. The character should reflect all given attributes (hairstyle, skin tone, body type, height, clothing, props, emotion, and action). Use a playful, clean, and polished art style with exaggerated proportions. Center the character on a neutral background. No text, logos, or extra shapes — only the character.'

export default async function imageGeneration(attributes) {
  try {
    const openai = new OpenAI(openAiConfig());

    // Build a clear prompt from the system message and provided attributes
    let attrsString;
    if (typeof attributes === 'string') {
      attrsString = attributes;
    } else if (Array.isArray(attributes)) {
      // Extract only the values (character descriptions) from attribute objects
      attrsString = attributes
        .map(attr => attr.value || attr)
        .join(', ');
    } else {
      attrsString = JSON.stringify(attributes);
    }
    const prompt = `${SYSTEM_MESSAGE}. Character description: ${attrsString}`;
    console.log('Generated Prompt:', prompt);
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
