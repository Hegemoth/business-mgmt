import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import OrgSelect from '../components/OrgSelect';
import { useGetOrganizationsQuery } from '../redux/api/organizationApi';
import { getCurrentOrg } from '../redux/slices/appContextSlice';

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({ children }: MainWrapperProps) => {
  const currentOrg = useSelector(getCurrentOrg);

  const { orgs, isFetchingOrgs } = useGetOrganizationsQuery(
    {},
    {
      selectFromResult: (r) => ({
        orgs: r.data?.items || [],
        isFetchingOrgs: r.isFetching,
      }),
    }
  );

  if (isFetchingOrgs) {
    return <Loading />;
  }

  if (!currentOrg?.id) {
    return orgs.length ? <OrgSelect orgs={orgs} /> : <div>Brak dostępu</div>;
  }

  return <Box>{children}</Box>;
};

export default MainWrapper;
