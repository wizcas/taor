import { useState, useMemo, useRef } from 'react';
import { useMeasure } from 'react-use';
import classNames from 'classnames';
import styles from './ImageBlock.module.css';
import { ImageLightBox } from './ImageLightBox';

export function ImageBlock(props) {
  const { thumbnail, raw } = props;
  const [ref, { width }] = useMeasure();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState();

  const blockStyle = useMemo(
    () => ({
      height: (width * 9) / 16,
    }),
    [width]
  );

  const thumbnailStyle = useMemo(
    () => ({
      backgroundImage: `url(${thumbnail})`,
    }),
    [thumbnail]
  );

  const lightBoxRef = useRef(null);

  function onImageLoad() {
    setIsLoading(false);
  }
  function onImageError() {
    onImageLoad();
    setHasError(true);
  }

  function showLightBox() {
    console.log({ raw });
    lightBoxRef.current.open(raw);
  }

  return (
    <>
      <div
        className={classNames(styles.imageBlock, {
          [styles.loading]: isLoading,
          [styles.error]: hasError,
        })}
        ref={ref}
        style={blockStyle}
        onClick={showLightBox}
      >
        <div className={styles.imageThumbnail} style={thumbnailStyle}>
          <img
            src={thumbnail}
            alt=""
            onLoad={onImageLoad}
            onError={onImageError}
          />
        </div>
      </div>
      <ImageLightBox ref={lightBoxRef} />
    </>
  );
}
