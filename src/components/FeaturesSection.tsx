import FeatureCard from "./FeatureCard";
import { poppins } from "@/app/fonts";

const FeatureCardsJSON = [
  {
    svg: "",
    title: "Password Manager",
    description:
      "Say goodbye to weak passwords! Our Password Manager empowers you to create and store rock-solid passwords effortlessly. You have the freedom to define their length, and our intelligent algorithm generates unique passwords based on your email and master password, ensuring maximum security for your online accounts.",
  },
  {
    svg: "",
    title: "To-Do List",
    description:
      "Stay organized and in control with our Todo Lists feature. Easily store and manage your tasks, and watch your productivity soar. Track progress, set timers to measure task completion times, and filter tasks by state (ToDo, In Progress, Done). Streamline your workflow and accomplish more in less time.",
  },
  {
    svg: "",
    title: "Auth",
    description:
      "Protecting your data is our top priority. With our Third-Party Authentication Service, you'll enjoy peace of mind. Log in securely using your email and master password, and let us handle the rest. We employ state-of-the-art security measures to safeguard your credentials, ensuring your online experience is both convenient and secure.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="flex flex-col bg-foreground rounded-lg px-8 py-12 space-y-10  ">
      <h2
        className={`${poppins.className} text-3xl pb-4 text-center text-main`}
      >
        Features
      </h2>
      <div className="grid lg:grid-cols-3 lg:gap-x-12">
        {FeatureCardsJSON.map((feat, index) => (
          <FeatureCard
            key={index}
            svg={feat.svg}
            title={feat.title}
            description={feat.description}
          />
        ))}
      </div>
    </section>
  );
}
