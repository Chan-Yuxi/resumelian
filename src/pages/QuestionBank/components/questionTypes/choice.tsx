import { Question } from "@/types/definition";
import { combineClassNames } from "@/utils";

export default function Choice({
  question,
  onResultChange,
}: {
  question: Question;
  onResultChange: (flag: string) => void;
}) {
  const options = question
    ? ["a", "b", "c", "d"].map((flag) => ({
        flag: flag.toUpperCase(),
        description: question[flag as keyof Question],
      }))
    : [];

  return (
    question && (
      <article>
        <section>
          <p className="text-base">
            <span className="text-slate-500">【单选题】</span>
            <span className="text-slate-500">【5分】</span>
            <span>{question.question}</span>
          </p>
        </section>
        <section>
          <ul className="flex flex-col items-start gap-4 my-6">
            {options.map(({ flag, description }, index) => (
              <li
                className="flex items-center cursor-pointer group"
                key={index}
                onClick={() => onResultChange(flag)}
              >
                <span
                  className={combineClassNames(
                    "inline-block w-8 h-8 leading-8 text-center rounded-full border-base group-hover:text-blue-500 group-hover:!border-blue-500",
                    question.result === flag
                      ? "text-blue-500 bg-blue-200 !border-blue-500"
                      : "!border-black"
                  )}
                >
                  {flag.toUpperCase()}
                </span>
                <span
                  className={combineClassNames(
                    "ms-2 group-hover:text-blue-500",
                    question.result === flag ? "text-blue-500 " : ""
                  )}
                >
                  {description}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    )
  );
}
