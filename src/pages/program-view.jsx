import { Helmet } from 'react-helmet-async';

import { ProgramView } from 'src/sections/program-view/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Program </title>
      </Helmet>

      <ProgramView />
    </>
  );
}
