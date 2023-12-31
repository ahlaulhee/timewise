export default function FeatureBox({
  feature,
  description,
}: {
  feature: string;
  description: string;
}) {
  return (
    <div className="mb-3 mt-3">
      <div className="flex">
        <div className="shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="mr-3 h-5 w-5 text-success"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-2 grow">
          <p className="mb-1 font-bold">{feature}</p>
          <p className="text-neutral-500 dark:text-neutral-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
