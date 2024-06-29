import { Helmet } from 'react-helmet-async';

import { ProgramAdd } from 'src/sections/programAdd/view';


// ----------------------------------------------------------------------

export default function ProgramAddPage() {
  return (
    <>
      <Helmet>
        <title> Program | Add </title>
      </Helmet>


      <ProgramAdd />
      
    </>
  );
}


