import ContentLoader from 'react-content-loader';
import { CardSummery } from '../../global/Summery';

const CardSkeleton = (props) => (
  <CardSummery>
    <ContentLoader speed={2} width={250} height={100} viewBox="0 0 250 100" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
      <rect x="0" y="10" rx="3" ry="3" width="120" height="15" />
      <rect x="0" y="40" rx="3" ry="3" width="80" height="25" />
    </ContentLoader>
  </CardSummery>
);

export default CardSkeleton;
