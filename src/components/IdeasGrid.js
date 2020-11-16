import React, { useState } from 'react';
import styles from './IdeasGrid.module.css';
import { colorShade } from './helpers';
import { getRandomIndex } from '../utils/helpers';
import ActionBar from './ActionBar';

const COLORS = [
  { PURPLE: '#800080' },
  { BLUE: '#0000ff' },
  { RED: '#ff0000' },
  { ORANGE: '#ffa500' },
  { YELLOW: '#ffff00' },
  { YELLOWGREEN: '#9acd32' },
  { GREEN: '#008000' },
];

const IdeasGrid = (props) => {
  const { attributes } = props;
  const [refresh, setRefresh] = useState(false);
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
          buttonLabel="Refresh Selection"
        />
      </section>
      {output}
    </>
  );
};

export default IdeasGrid;
