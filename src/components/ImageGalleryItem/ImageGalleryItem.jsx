import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onClick,
}) => (
  <GalleryItem key={id} onClick={() => onClick(id)}>
    <GalleryItemImage src={webformatURL} alt={largeImageURL} />
  </GalleryItem>
);

ImageGalleryItem.propeTypes = {
  key: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
