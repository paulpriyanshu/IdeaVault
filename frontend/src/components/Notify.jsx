import React from 'react';

function Notify({ show }) {
  if(!show) return null
  return (
    <div className="mb-4 rounded-lg bg-warning-100 px-6 py-5 text-base text-warning-800" role="alert">
      Saved
    </div>
  );
}

export default Notify;
