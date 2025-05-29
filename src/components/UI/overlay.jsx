function Overlay({ text = "Generating ..." }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-overlay flex justify-center items-center z-100 block-pointers">
      <span className="text-xxl text-white font-medium text-center">
        {text}
      </span>
    </div>
  );
}

export default Overlay;
