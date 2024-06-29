import { Helmet } from 'react-helmet-async';

import { ProgramList } from 'src/sections/program-list/view';


// ----------------------------------------------------------------------

export default function ProgramPage() {
  return (
    <>
      <Helmet>
        <title> Program | List </title>
      </Helmet>


      <ProgramList />
      
    </>
  );
}


