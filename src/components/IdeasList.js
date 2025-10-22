import React from 'react';
import styles from './IdeasGrid.module.css';

const IdeasList = (props) => {
  const { attributes, ideaTable } = props;

  const fullAttributeList = attributes.map((attribute, index) => {
    let backgroundShade = ideaTable[index].color;
    let randIndex = ideaTable[index].selectedIndex;

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

  return fullAttributeList;
};

export default IdeasList;
