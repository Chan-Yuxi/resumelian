type P = {
  //
};

import TradeCard from "./components/TradeCard";

const ResourceMall: React.FC<P> = () => {
  return (
    <main className="min-h-reach-bottom">
      <section className="p-6 sm:px-64 sm:py-8">
        <div className="flex flex-wrap gap-2">
          {new Array(10).fill(0).map((_, i) => {
            return <TradeCard key={i} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default ResourceMall;
