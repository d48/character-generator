import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ActionBar from './ActionBar';
import IdeasTable from './IdeasTable';
import IdeasList from './IdeasList';
import { colorShade } from './helpers';
import { getRandomIndex } from '../utils/helpers';

const COLORS = [
  { PURPLE: '#bc3adc' },
  { BLUE: '#295efb' },
  { RED: '#fc3232' },
  { ORANGE: '#e58103' },
  { YELLOW: '#ffff00' },
  { YELLOWGREEN: '#9acd32' },
  { GREEN: '#008000' },
];

const createIdeaTable = (attributes) => {
  const results = [];

  attributes.forEach((attribute, index) => {
    let backgroundShade = colorShade(Object.values(COLORS[index])[0], 80);
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

const IdeasGrid = (props) => {
  const { attributes } = props;
  const [view, setView] = useState(true);
  const [ideaTable, setIdeaTable] = useState([]);

  const refreshSelection = () => {
    setIdeaTable(createIdeaTable(attributes));
  };

  useEffect(() => {
    setIdeaTable(createIdeaTable(attributes));
  }, [attributes]);

  return (
    <>
      <section className="row">
        <ActionBar
          onClickHandler={refreshSelection}
          buttonLabel="Shuffle Idea"
        />
        <ActionBar
          type="button"
          onClickHandler={() => {
            setView((state) => !state);
          }}
          buttonLabel={view ? 'View Category Lists' : '<- Back to Ideas Grid'}
        />
      </section>
      <section>
        {view ? <IdeasTable table={ideaTable} /> : ''}
        {!view ? (
          <section>
            <IdeasList attributes={attributes} ideaTable={ideaTable} />
          </section>
        ) : (
          ''
        )}
      </section>
    </>
  );
};

IdeasGrid.propTypes = {
  attributes: PropTypes.array,
};

export default IdeasGrid;
