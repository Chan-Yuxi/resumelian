const CaseCard = () => {
  return (
    <figure className="w-full md:w-[300px] p-4 bg-blue-100/80">
      <div className="flex">
        <div className="shrink-0 w-[90px] aspect-[3/4] border-0 bg-gradient-to-tl from-blue-300/50 to-blue-300" />
        <figcaption className="ms-4">
          <h4>事业单位简历案例</h4>
          <p className="text-slate-500">
            事业单或国企简历范文突出，教师岗位，具有丰富教师经验...
          </p>
        </figcaption>
      </div>
    </figure>
  );
};

export default CaseCard;
