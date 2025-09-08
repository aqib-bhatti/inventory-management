import ContentLoader from 'react-content-loader';
import { Tr, Td } from '../../global/Summery';

const TableSkeleton = (props) => (
  <>
    {[...Array(5)].map((_, index) => (
      <Tr key={index}>
        <Td>
          <ContentLoader speed={2} width={100} height={20} viewBox="0 0 100 20" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
            <rect x="0" y="0" rx="3" ry="3" width="100" height="20" />
          </ContentLoader>
        </Td>
        <Td>...</Td>
      </Tr>
    ))}
  </>
);

export default TableSkeleton;
