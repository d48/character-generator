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

    // Helper function to get attribute value by name
    const getAttr = (attrName) => {
      if (Array.isArray(attributes)) {
        const found = attributes.find(
          (attr) => attr.name && attr.name.toLowerCase().includes(attrName.toLowerCase())
        );
        return found ? String(found.value || '').trim() : '';
      }
      return '';
    };

    // Sanitize actions that imply environment/extra objects (e.g., "sitting on a rock")
    const sanitizeAction = (raw) => {
      const a = String(raw || '').toLowerCase().trim();
      if (!a) return '';
      // Remove common prepositional phrases that add background objects or locations
      let cleaned = a
        .replace(/\b(on|in|by|near|under|over|beside|next to|against|around|behind|in front of)\b.*$/i, '')
        .replace(/\bwith background.*$/i, '')
        .replace(/\bbackground.*$/i, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
      // If action collapses to nothing, fall back to a neutral verb
      if (!cleaned) cleaned = 'posing';
      return cleaned;
    };

    // Pronouns based on gender (fallback to neutral they/their)
    const lowerGender = String(getAttr('gender') || '').toLowerCase();
    const subjectPronoun = lowerGender.includes('female') ? 'she' : lowerGender.includes('male') ? 'he' : 'they';
    const possessiveAdj = lowerGender.includes('female') ? 'her' : lowerGender.includes('male') ? 'his' : 'their';

    // Get individual attribute values
    const gender = getAttr('gender') || 'character';
    const name = getAttr('name') || 'the character';
    const hairStyle = getAttr('hair style') || getAttr('hair');
    const hairColor = getAttr('hair color');
    const eyeColor = getAttr('eye color') || getAttr('eyes');
    const skinColor = getAttr('skin color') || getAttr('skin');
    const bodyBuild = getAttr('body build') || getAttr('build');
    const weight = getAttr('weight');
    const height = getAttr('height');
    const accessories = getAttr('accessories') || getAttr('accessory');
    const expression = getAttr('expression') || getAttr('emotion');
    const action = sanitizeAction(getAttr('action'));

  const prompt = `
cartoon-style 2D digital character. Generate EXACTLY ONE single character, full-length (head to toe), centered, on a plain empty background.

Render a ${gender.toLowerCase()} named ${name}, facing forward in a full-body portrait. Depict ${subjectPronoun} with ${hairStyle ? hairStyle.toLowerCase() + ' ' : ''}${hairColor ? hairColor.toLowerCase() + ' ' : ''}hair, ${eyeColor ? eyeColor.toLowerCase() + ' eyes' : ''}${eyeColor && skinColor ? ', ' : ''}${skinColor ? skinColor.toLowerCase() + ' skin' : ''}, a ${bodyBuild ? bodyBuild.toLowerCase() + ' build' : 'balanced build'}${weight ? ', weighing ' + weight : ''}${height ? ', ' + height + ' tall' : ''}. ${accessories ? 'Include only wearable or handheld items: ' + accessories.toLowerCase() + '.' : ''} Show a ${expression ? expression.toLowerCase() : 'friendly'} expression while ${action}.

Do NOT render any text of any kind: no words, labels, numbers, bullets, captions, stickers, icons, emojis, panels, cards, tables, boxes, sidebars, infographics, diagrams, or UI elements. Absolutely zero typography anywhere in the image.

Framing (MANDATORY):
- Full body visible — head, torso, arms, legs, and feet all in frame
- No cropping; leave small margins so nothing is cut off
- Subject occupies ~70–80% of the image height
- Single subject only; centered composition

Orientation (MANDATORY):
- Portrait orientation (vertical)
- Camera level; no rotation/tilt/dutch angle
- Subject upright; head at the top, feet at the bottom

Style:
- Clean 2D cartoon/animation look with bold outlines and flat colors
- Smooth vector-like lines; bright yet balanced palette

Background (MANDATORY):
- Plain, empty background (pure white or neutral solid color)
- No scenery, no objects, no patterns, no gradients that imply environment

Hard Constraints (highest priority):
- Subject count MUST be exactly 1 human figure (one person).
- NO duplicates, clones, twins, reflected copies, or echoed silhouettes.
- NO additional figures anywhere: foreground, background, reflections, mirrors, windows, screens, posters, photos, murals, statues, toys, or signage.
- NO crowds, groups, collages, multi-panels, split screens, thumbnails, or picture-in-picture.
- No background objects, furniture, props, scenery, or any extra items.
- Only allow what the character WEARS or HOLDS in hands; do not place ${name} on/under/next to anything.
- If any wording conflicts, IGNORE it and follow these constraints strictly.
`;

    console.log('Generated Prompt:', prompt);
    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: 'auto',
    });

    console.log('OpenAI Response:', response);
    console.log('Response data:', response?.data);
    console.log('First data item:', response?.data?.[0]);
    
    if (!response?.data?.length) {
      throw new Error('No image data received from OpenAI');
    }

    const firstDataItem = response.data[0];
    
    // Handle different response formats
    if (firstDataItem.url) {
      // Direct URL format
      console.log('Using direct URL:', firstDataItem.url);
      return firstDataItem.url;
    } else if (firstDataItem.b64_json) {
      // Base64 format - convert to data URL
      const base64Data = firstDataItem.b64_json;
      const imageUrl = `data:image/png;base64,${base64Data}`;
      console.log('Converted base64 to data URL (length):', base64Data.length);
      return imageUrl;
    } else {
      console.log('Available properties in data[0]:', Object.keys(firstDataItem));
      throw new Error('No image data found in OpenAI response');
    }
  } catch (error) {
    console.error('Error generating image:', error?.message ?? error);
    throw error;
  }
}
