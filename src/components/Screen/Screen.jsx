import { forwardRef } from "react";

const Screen = forwardRef((props, ref) => {
  return (
      <div ref={ref} className="bg-white shadow-md p-6 w-90 md:w-3/5 lg:w-1/2 border-1 h-100"></div>
    
  );
});

export default Screen;
