import Link from "next/link";
import { inter, quicksand, ubuntu, poppins, worksans } from "./fonts";
import FeatureCard from "@/components/FeatureCard";
import FeatureBox from "@/components/FeatureBox";
import Image from "next/image";

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

const FeatureBoxesJSON = [
  {
    feature: "User Inputs",
    description:
      "When you input your email and master password, our algorithm combines these two pieces of information in a secure manner.",
  },
  {
    feature: "Customizable Length",
    description:
      "You have the flexibility to define the length of the generated password. This empowers you to create passwords that align with the specific requirements of the accounts you are securing.",
  },
  {
    feature: "Hashing Process",
    description:
      "The combined email and master password are passed through a cryptographic hashing process. This process ensures that the generated password is not only unique but also secure.",
  },
  {
    feature: "Local Storage",
    description:
      "Passwords are stored locally on your device. This means that your sensitive information never leaves your computer, reducing the risk of exposure.",
  },
  {
    feature: "Encryption with bcrypt",
    description:
      "Before being stored, your passwords are encrypted using the bcrypt hashing algorithm. bcrypt is known for its robust security features, making it extremely difficult for malicious actors to gain access to your stored passwords.",
  },
  {
    feature: "Export Functionality",
    description:
      "We value your data portability. That's why we provide an easy way for you to export your passwords. Whether you want to switch browsers, use your passwords on a different computer, or simply have a backup, our export feature has you covered.",
  },
];

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto space-y-10">
      <section className="flex flex-row text-custom-white py-12">
        {/* LEFT SIDE */}
        <div className="p-4 flex flex-col justify-evenly w-1/2">
          <h1
            className={`${worksans.className} text-3xl font-bold tracking-wide`}
          >
            TimeWise
          </h1>
          <h2 className={`${quicksand.className} text-4xl`}>
            Unlock Peace of Mind: Secure Passwords, Organized Tasks!
          </h2>
          <div className="w-full flex justify-center">
            <Link
              href="/api/auth/signin"
              className={`${ubuntu.className} border border-white px-20 py-4 rounded-lg tracking-wide hover:bg-white hover:text-black duration-200`}
            >
              TRY IT NOW!
            </Link>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            className="h-[29rem] w-[27rem]"
            src="https://lesolson.com/wp-content/uploads/2019/08/Asset-1strong-password.png"
            alt="Hero Section Image"
          />
        </div>
      </section>
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
      <section className="text-custom-white space-y-2 py-12">
        <h2 className={`${inter.className} text-3xl text-center`}>
          How Does This Work?
        </h2>
        <div className={`${quicksand.className} p-4 text-justify space-y-3`}>
          <div>
            <p className="text-base indent-8 mx-10">
              Our password generation algorithm is designed with both security
              and convenience in mind. It takes two essential arguments: the
              user&apos;s email and master password. This unique approach allows
              users to generate the same password whenever needed, ensuring
              consistency and eliminating the risk of losing access when a
              password is deleted.
            </p>
            <p className="indent-8 mx-10">
              We understand the critical importance of safeguarding your
              passwords. Therefore, we take the following measures to ensure the
              highest level of security for your stored passwords:
            </p>
          </div>

          <div className="grid gap-x-2 md:grid-cols-1 lg:grid-cols-2 xl:gap-x-12">
            {FeatureBoxesJSON.map((feat, index) => (
              <FeatureBox
                key={index}
                feature={feat.feature}
                description={feat.description}
              />
            ))}
          </div>
          <p className="indent-8 mx-10">
            By combining a unique and user-friendly password generation
            algorithm with strong encryption and local storage, we aim to
            provide you with a secure and convenient solution for managing and
            protecting your online passwords. Your online security is our top
            priority, and we continuously strive to maintain the highest
            standards in password management.
          </p>
        </div>
      </section>
      <footer className="text-main bg-foreground rounded-t-lg px-4 py-12 flex flex-col justify-center items-center text-center space-y-6">
        <h2 className={`${worksans.className} text-3xl`}>
          This project was made possible by{" "}
          <span className="font-bold text-custom-white uppercase tracking-wide">
            ahlaulhe
          </span>
        </h2>
        <h3 className={`${worksans.className} text-2xl`}>
          YOU CAN FIND ME ON:
        </h3>
        <div className="flex justify-center space-x-12">
          <Link href="https://www.linkedin.com/in/alex-laulhe/">
            <Image
              width={100}
              height={100}
              src="/github.png"
              alt="LOGO GITHUB"
            />
          </Link>
          <Link href="https://github.com/ahlaulhee">
            <Image
              width={100}
              height={100}
              src="/linkedin.png"
              alt="LOGO LINKEDIN"
            />
          </Link>
        </div>
      </footer>
    </main>
  );
}
