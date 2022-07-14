import ContentLoader from 'react-content-loader';

const CardLoader = () => (
  <div className='card-loader-container'>
    <ContentLoader
      speed={2}
      width={320}
      height={320}
      viewBox="0 0 400 460"
      backgroundColor="#ecebeb"
      foregroundColor="#d6d2d2"
    >
      <rect x="0" y="0" rx="2" ry="2" width="300" height="300" />
    </ContentLoader>
  </div>
);

export default CardLoader;
