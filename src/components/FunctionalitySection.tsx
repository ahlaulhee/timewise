import FeatureBox from "./FeatureBox";
import { inter, quicksand } from "@/app/fonts";

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

export default function FunctionalitySection() {
  return (
    <section className="text-custom-white space-y-2 py-12">
      <h2 className={`${inter.className} text-3xl text-center`}>
        How Does This Work?
      </h2>
      <div className={`${quicksand.className} p-4 text-justify space-y-3`}>
        <div>
          <p className="text-base indent-8 mx-10">
            Our password generation algorithm is designed with both security and
            convenience in mind. It takes two essential arguments: the
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
          By combining a unique and user-friendly password generation algorithm
          with strong encryption and local storage, we aim to provide you with a
          secure and convenient solution for managing and protecting your online
          passwords. Your online security is our top priority, and we
          continuously strive to maintain the highest standards in password
          management.
        </p>
      </div>
    </section>
  );
}
