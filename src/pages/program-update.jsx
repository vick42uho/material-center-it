import { Helmet } from 'react-helmet-async';

import { ProgramUpdate } from 'src/sections/programUpdate/view';


// ----------------------------------------------------------------------

export default function ProgramUpdatePage() {
  return (
    <>
      <Helmet>
        <title> Program Edit | Update </title>
      </Helmet>


      <ProgramUpdate />
      
    </>
  );
}


