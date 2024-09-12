import React from 'react';

import SinglePeoplePage from '@/components/people/SinglePeoplePage';

const PeoplePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='w-full bg-[#151517] rounded-l-lg pb-10'>
      <SinglePeoplePage id={params.id} />
    </div>
  );
};

export default PeoplePage;
