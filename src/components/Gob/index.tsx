import { combineClassNames } from "@/utils";

export default function Gob({
  prefix,
  suffix,
  children,
  className,
}: {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={combineClassNames("inline-flex items-center *:h-full", className)}>
      {prefix && prefix}
      <span
        className={combineClassNames(
          prefix ? "ms-1" : "",
          suffix ? "ms-1" : ""
        )}
      >
        {children}
      </span>
      {suffix && suffix}
    </div>
  );
}
