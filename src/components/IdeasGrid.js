import React from 'react';

const IdeasGrid = (props) => {
  const { attributes } = props;
  return attributes.map((attribute, index) => {
    return (
      <div key={index}>
        <h3>{attribute.name}</h3>
        <ul>
          {attribute.attributes.map((attrib, index) => {
            return <li key={index}>{attrib}</li>;
          })}
        </ul>
      </div>
    );
  });
};

export default IdeasGrid;
