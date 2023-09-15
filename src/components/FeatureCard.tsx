"use client";
import { inter, worksans } from "@/app/fonts";
import { motion } from "framer-motion";

export default function FeatureCard({
  title,
  svg,
  description,
}: {
  title: string;
  svg: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
      className="mb-12 lg:mb-0"
    >
      <div className="block h-full rounded-lg bg-main shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
        <div className="flex justify-center">
          <div className="-mt-8 inline-block rounded-full bg-primary-100 p-4 text-primary shadow-md bg-custom-red">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>
        </div>
        <div className="p-6">
          <h5 className={`${inter.className} mb-4 text-xl font-semibold`}>
            {title}
          </h5>
          <p className={`${worksans.className} text-base text-justify`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
