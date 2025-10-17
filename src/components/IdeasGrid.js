import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ActionBar from './ActionBar';
import IdeasTable from './IdeasTable';
import { BsArrowRepeat } from 'react-icons/bs';
import { colorShade } from './helpers';
import { getRandomIndex } from '../utils/helpers';
import * as htmlToImage from 'html-to-image';
import * as download from 'downloadjs';
import styles from './IdeasGrid.module.css';
import imageGeneration from '../lib/openai';

const COLORS = [
  { PURPLE: '#bc3adc' },
  { BLUE: '#295efb' },
  { RED: '#fc3232' },
  { ORANGE: '#e58103' },
  { YELLOW: '#ffff00' },
  { YELLOWGREEN: '#9acd32' },
  { GREEN: '#008000' },
  { PINK: '#ff69b4' },
  { CYAN: '#00bfff' },
  { MAGENTA: '#ff1493' },
  { TEAL: '#20b2aa' },
  { INDIGO: '#4b0082' },
];

const createIdeaTable = (attributes) => {
  const results = [];

  attributes.forEach((attribute, index) => {
    // Handle malformed attributes gracefully
    if (
      !attribute ||
      !attribute.attributes ||
      !Array.isArray(attribute.attributes) ||
      attribute.attributes.length === 0
    ) {
      return; // Skip invalid attributes
    }

    let colorIndex = index % COLORS.length; // Wrap around when more attributes than colors
    let backgroundShade = colorShade(Object.values(COLORS[colorIndex])[0], 80);
    let randIndex = getRandomIndex(attribute.attributes.length);

    results.push({
      name: attribute.name || 'Unknown',
      value: attribute.attributes[randIndex],
      color: backgroundShade,
      selectedIndex: randIndex,
    });
  });

  return results;
};

const IdeasGrid = (props) => {
  const { attributes } = props;
  const [ideaTable, setIdeaTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const tableRef = useRef();
  const [url, setUrl] = useState('');
  const modalRef = useRef();

  const handleGenerateImage = async () => {
    setLoading(true);
    setShowImage(true); // Show modal immediately
    setUrl(''); // Clear any previous URL
    
    try {
      // Filter ideaTable to only include checked items
      const checkedAttributes = ideaTable.filter(
        (item) => checkedItems[item.name] === true
      );
      console.log(
        'Creating image with these attributes:',
        checkedAttributes
      );

      const imageUrl = await imageGeneration(checkedAttributes);

      if (imageUrl.status && imageUrl.status === 400) {
        setErrorMessage('Error: Unable to generate image. Please try again.');
        alert(errorMessage);
        setLoading(false);
        setShowImage(false);
        return;
      }
      console.log('Generated Image URL:', imageUrl);
      setUrl(imageUrl);
      setLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setLoading(false);
      setShowImage(false);
    }
  };

  const refreshSelection = () => {
    setIdeaTable(createIdeaTable(attributes));
  };

  useEffect(() => {
    setIdeaTable(createIdeaTable(attributes));
  }, [attributes]);

  return (
    <>
      <section className="row">
        <p>
          A random character idea has been generated for you. Click the{' '}
          <strong>&quot;Shuffle Idea&quot;</strong> button to generate another
          idea.
        </p>
      </section>
      <section>
        <section className="row">
          <ActionBar
            onClickHandler={refreshSelection}
            buttonLabel="Shuffle Idea"
            icon={<BsArrowRepeat className={styles.iconStyle} />}
          />
          <ActionBar
            type="button"
            onClickHandler={handleGenerateImage}
            buttonLabel="Generate Image from Idea"
			icon={<BsArrowRepeat className={styles.iconStyle} />}
          />
          {url && (
            <ActionBar
              type="button"
              onClickHandler={() => setShowImage(true)}
              buttonLabel="View Generated Image"
              icon={<span>🖼️</span>}
            />
          )}
        </section>

        <IdeasTable
          table={ideaTable}
          tableRef={tableRef}
          onCheckedItemsChange={setCheckedItems}
        />
      </section>

      {/* Modal Overlay */}
      {showImage && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
            }}
            onClick={() => {
              setShowImage(false);
            }}
          />

          {/* Modal Content */}
          <div
            ref={modalRef}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: window.innerWidth <= 768 ? '95%' : '90%',
              maxWidth: '1200px',
              maxHeight: '95vh',
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              zIndex: 1001,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #dee2e6',
                flexShrink: 0,
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '18px',
                  color: '#495057',
                  fontWeight: '600',
                }}
              >
                Generated Character
              </h3>
              <button
                onClick={() => {
                  setShowImage(false);
                }}
                style={{
                  background: '#495057',
                  border: 'none',
                  borderRadius: '6px',
                  marginTop: '10px',
                  width: '32px',
                  height: '32px',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={(e) => (e.target.style.background = '#c82333')}
                onMouseOut={(e) => (e.target.style.background = '#495057')}
              >
                ×
              </button>
            </div>

            {/* Content Area */}
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                padding: window.innerWidth <= 768 ? '20px 20px 20px 35px' : '20px 30px',
              }}
            >
              {/* Image or Loading */}
              <div
                style={{
                  marginBottom: '24px',
                  textAlign: 'center',
                  width: '100%',
                  margin: '0 auto',
                }}
              >
                {loading ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: window.innerWidth <= 768 ? '300px' : '400px',
                      backgroundColor: '#f8f9fa',
                      border: '2px dashed #dee2e6',
                      borderRadius: '8px',
                      color: '#495057',
                    }}
                  >
                    <div
                      style={{
                        animation: 'spin 1s linear infinite',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #007bff',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        marginBottom: '16px',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        margin: '0',
                      }}
                    >
                      Generating illustration of Image Idea. Please wait
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                    }}
                  >
                    <img
                      src={url}
                      alt="Generated Character Image"
                      style={{
                        width: '100%',
                        maxHeight: window.innerWidth <= 768 ? '300px' : '400px',
                        objectFit: 'contain',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#f8f9fa',
                      }}
                      onError={(e) => {
                        console.error('Failed to load image:', url);
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    {/* Maximize Button */}
                    <button
                      onClick={() => window.open(url, '_blank')}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease',
                        zIndex: 10,
                      }}
                      onMouseOver={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.9)';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.background = 'rgba(0, 0, 0, 0.7)';
                        e.target.style.transform = 'scale(1)';
                      }}
                      title="Open image in new tab to zoom, save, or view full size"
                    >
                      <span>🔍</span>
                      Maximize
                    </button>
                  </div>
                )}
              </div>

              {/* Attributes List */}
              <div>
                <h4
                  style={{
                    margin: '0 0 16px 0',
					paddingTop: '10px',
                    fontSize: '16px',
                    color: '#495057',
                    borderBottom: '2px solid #e9ecef',
                    paddingBottom: '8px',
                  }}
                >
                  Character Attributes:
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
                    gap: '12px',
					
                  }}
                >
                  {ideaTable
                    .filter((item) => checkedItems[item.name] === true)
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px 16px',
						  margin: '0 auto',
						  width: '80%',
                          borderRadius: '8px',
                          border: '1px solid #dee2e6',
                        }}
                      >
                        <div
                          style={{
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#495057',
                            marginBottom: '4px',
                          }}
                        >
                          {item.name}:
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            color: '#6c757d',
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

IdeasGrid.propTypes = {
  attributes: PropTypes.array,
};

export default IdeasGrid;
