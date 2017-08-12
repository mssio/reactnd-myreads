import React from 'react';
import styles from './styles';
import image from './image.svg';

export default function NotFound () {
  return (
    <div style={styles.imageContainer}>
      <img src={image} alt="logo" />
    </div>
  );
}
