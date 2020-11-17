import React, { useState } from 'react';
import styles from './IdeasGrid.module.css';
import { colorShade } from './helpers';
import { getRandomIndex } from '../utils/helpers';
import ActionBar from './ActionBar';
import IdeasTable from './IdeasTable';

const COLORS = [
  { PURPLE: '#bc3adc' },
  { BLUE: '#295efb' },
  { RED: '#fc3232' },
  { ORANGE: '#e58103' },
  { YELLOW: '#ffff00' },
  { YELLOWGREEN: '#9acd32' },
  { GREEN: '#008000' },
];

const IdeasGrid = (props) => {
  const { attributes } = props;
  const [refresh, setRefresh] = useState(false);
  const ideaTable = []

  /*
    {
      name: 'Anatomy',
      value: 'Skinny'
    }
  */

  const refreshSelection = () => {
    setRefresh(!refresh);
  };

  const output = attributes.map((attribute, index) => {
    let backgroundShade = colorShade(Object.values(COLORS[index])[0], 80);
    let randIndex = getRandomIndex(attribute.attributes.length);

    return (
      <div key={index} className={styles.ideaTopic}>
        <h3
          className={styles.header}
          style={{
            textDecorationColor: backgroundShade,
          }}
        >
          {attribute.name}
        </h3>
        <ul>
          {attribute.attributes.map((attrib, index) => {
            let styleBackgroundShade = {
              backgroundColor: 'transparent',
            };

            if (index === randIndex) {
              styleBackgroundShade.backgroundColor = backgroundShade;
              ideaTable.push({ name: attribute.name, value: attrib, color: backgroundShade })
            }

            return (
              <li
                key={index}
                className={styles.idea}
                style={styleBackgroundShade}
              >
                {attrib}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });

  return (
    <>
      <section className="row">
        <ActionBar
          onClickHandler={refreshSelection}
          buttonLabel="Shuffle Idea"
        />
      </section>
      <IdeasTable table={ideaTable} />
      {output}
    </>
  );
};

export default IdeasGrid;
