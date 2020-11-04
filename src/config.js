import weightRandomizer from './plugins/weightRandomizer.js';
import poundConversion from './plugins/poundConversion.js';
import heightConversion from './plugins/heightConversion.js';

const SETTINGS = {
    title: 'Character Generator',
    description: 'Select attributes to include for the character.',
    buttonLabel: 'Generate Character'
};

const ATTRIBUTES = [
  { name: 'Hair style', description: 'Spikey, long, short, etc', values: ['Spikey', 'Long', 'Short', 'Bob cut', 'Bun', 'Man-bun', 'Bald', 'Straight', 'Wavy', 'Curly', 'Afro', 'Mohawk'] },
  { name: 'Hair color', description: 'Hazel, dark blue, glowing, etc', values: ['Hazel', 'Dark blue', 'Black', 'Green', 'Brown', 'Grey', 'White', 'Red', 'Yellow', 'Orange'] },
  { name: 'Weight', description: '', values: weightRandomizer, format: poundConversion },
  { name: 'Height', description: '', values: [36, 48, 60, 72, 88, 102, 123], format: heightConversion },
  { name: 'Eye color', description: 'Hazel, dark blue, glowing, etc', values: ['Hazel', 'Dark blue', 'Black', 'Green', 'Brown', 'Grey', 'White', 'Red', 'Yellow', 'Orange'] },
  { name: 'Skin color', description: 'Tan, spotted, albino, etc', values: ['Tan', 'Golden', 'Black', 'White', 'Brown', 'Orange', 'Yellow'] },
  { name: 'Body build', description: '', values: ['Frail', 'Fat', 'Thick', 'Boney', 'Medium', 'Small', 'Large', 'Skinny'] },
  { name: 'Accessories', description: '', values: ['Necklace', 'Hat', 'Watch', 'Ring', 'Earring'] },
  { name: 'Facial expression', description: '', values: ['Pouting', 'Smiling', 'Ecstatic', 'Worried', 'Thinking', 'Scared', 'Calm', 'Delighted', 'Peaceful', 'Content', 'Angry', 'Frightened', 'Mad', 'Sad', 'Excited', 'Serious', 'Annoyed', 'Disgusted', 'Yelling'] },
  { name: 'Action', description: '', values: ['Holding a sword', 'Turning to look behind', 'Smoking a cigarette', 'Sitting on a rock', 'Jumping off a building', 'Crawling', 'Holding a bow', 'Picking something up', 'Looking up at the sky', 'Hands in their pocket', 'Deep in thought', 'Carrying something heavy', 'Holding an object', 'Drinking from a cup', 'Reading a book', 'Looking at their phone', 'Reading the newspaper'] },
  { name: 'Gender', description: '', values: ['Male', 'Female', 'Androgynous'] },
  { name: 'Name', description: '', values: ['Tiberius', 'Aliso', 'Harmony', 'Griggio', 'Eliana', 'Brarben', 'Hauminor'] }
];

const ANATOMY = [
  'Tall',
  'Tiny',
  'Muscular',
  'Short',
  'Angular',
  'Soft',
  'Adolescent',
  'Square',
  'Strong',
  'Slim',
  'Elderly',
  'Athletic',
  'Curvy',
  'Infant',
  'Petite',
  'Elongated',
  'Average',
  'Round',
  'Middle-aged',
  'Broad'
];

export { SETTINGS, ATTRIBUTES, ANATOMY };
