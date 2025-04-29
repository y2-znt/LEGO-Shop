import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const socialLinks = [
  { href: "#", label: "Facebook", icon: FaFacebook },
  { href: "#", label: "X", icon: FaXTwitter },
  { href: "#", label: "Instagram", icon: FaInstagram },
  { href: "#", label: "YouTube", icon: FaYoutube },
];

const footerLinks = [
  {
    title: "Services",
    links: [
      "1on1 Coaching",
      "Company Review",
      "Accounts Review",
      "HR Consulting",
      "SEO Optimisation",
    ],
  },
  {
    title: "Company",
    links: ["About", "Meet the Team", "Accounts Review"],
  },
  {
    title: "Helpful Links",
    links: ["Contact", "FAQs", "Live Chat"],
  },
  {
    title: "Legal",
    links: [
      "Accessibility",
      "Returns Policy",
      "Refund Policy",
      "Hiring Statistics",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#201D48] text-white">
      <div className="mx-auto max-w-(--breakpoint-xl) space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Image
              src="/assets/LEGO_logo.png"
              width={75}
              height={75}
              alt="LEGO logo"
            />
            <p className="mt-4 max-w-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>
            <ul className="mt-8 flex gap-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                    className="transition hover:opacity-75"
                  >
                    <span className="sr-only">{label}</span>
                    <Icon size={25} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {footerLinks.map(({ title, links }) => (
              <div key={title}>
                <p className="font-medium">{title}</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition hover:opacity-75">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs">&copy; 2024. LEGO. All rights reserved.</p>
      </div>
    </footer>
  );
}
