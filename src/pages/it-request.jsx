import { Helmet } from 'react-helmet-async';

import { RequestView } from 'src/sections/it-request/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <RequestView />
    </>
  );
}
