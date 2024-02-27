const TemplateCard = ({ src }: { src: string }) => {
  return (
    // bg-gradient-to-tl from-slate-100 to-slate-300
    <img
      src={src}
      className="w-[45%] sm:w-[180px] aspect-[3/4] hover:shadow-xl hover:cursor-pointer transition-all duration-300"
    />
  );
};

export default TemplateCard;
