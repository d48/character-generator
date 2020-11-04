import React from "react";
import PropTypes from "prop-types";
import CharacterGeneratorHeader from "./CharacterGeneratorHeader";
import AttributeSelector from "./AttributeSelector";
import Tabs from "./Tabs";

const CharacterGenerator = (props) => {
  const { attributes, settings } = props;

  return (
    <section>
      <CharacterGeneratorHeader
        title={settings.title}
        description={settings.description}
      />
      <Tabs>
        <AttributeSelector
          buttonLabel={settings.buttonLabel}
          attributes={attributes}
        />
      </Tabs>
    </section>
  );
};

CharacterGenerator.propTypes = {
  attributes: PropTypes.array,
  settings: PropTypes.object,
};

export default CharacterGenerator;
