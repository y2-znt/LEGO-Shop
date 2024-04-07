import Link from "next/link";
import { MdMailOutline } from "react-icons/md";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
  const FooterLinks = {
    footer: [
      { name: "Home", href: "/" },
      { name: "About", href: "/" },
      { name: "Services", href: "/" },
      { name: "Vision", href: "/" },
      { name: "Terms & Conditions", href: "/" },
      { name: "FAQ", href: "/" },
    ],
  };

  return (
    <footer className="m-10 mt-28 text-center text-lg font-semibold border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 py-10 sm:py-16 lg:px-6">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
          {FooterLinks.footer.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href}>{item.name}</Link>
            </div>
          ))}
        </nav>
      </div>
      <div className="text-sm underline underline-offset-8 decoration-green-500 rotate-2">
        Yoni Deserbaix 🦇
      </div>
      <div className="mt-3 gap-4 flex items-center justify-center  ">
        <Link
          href="https://www.linkedin.com/in/yoni-deserbaix/"
          target="_blank"
          aria-label="Navigate to the LinkedIn account"
        >
          <SiLinkedin size={15} />
        </Link>
        <Link
          href="https://github.com/Yoni-Deserbaix"
          target="_blank"
          aria-label="Navigate to the Github account"
        >
          <SiGithub size={15} />
        </Link>
        <Link
          href="https://github.com/Yoni-Deserbaix"
          target="_blank"
          aria-label="Navigate to the Github account"
        >
          <MdMailOutline size={15} />
        </Link>
      </div>
    </footer>
  );
}
