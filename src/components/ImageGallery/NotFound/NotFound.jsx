import image from './noposts.jpeg';
import { Wrapper } from './NotFound.styled';

export const NotFound = () => {
  return (
    <Wrapper>
      <img src={image} alt="not found" style={{ width: 300 }} />
    </Wrapper>
  );
};
