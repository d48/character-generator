import React from 'react';
import styles from './IdeasGrid.module.css';
import { colorShade } from './helpers';

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
  return attributes.map((attribute, index) => {
    return (
      <div key={index} className={styles.ideaTopic}>
        <h3
          className={styles.header}
          style={{
            backgroundColor: colorShade(Object.values(COLORS[index])[0], 60),
          }}
        >
          {attribute.name}
        </h3>
        <ul>
          {attribute.attributes.map((attrib, index) => {
            return (
              <li key={index} className={styles.idea}>
                {attrib}
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
};

export default IdeasGrid;
