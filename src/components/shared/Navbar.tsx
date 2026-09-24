import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navLinks = [
    { name: "workOuts", href: "/workOuts" },
    { name: "myPlan", href: "/myPlan" },
  ];

  const planCount = 0;
  const savedCount = 0;

  return (
    <nav className="bg-[#15171d] py-4 shadow-sm">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white focus:!text-[#c2f800] active:!text-[#c2f800]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 text-2xl font-semibold text-white">
            <Image src={logo} alt="Company Logo" />
            FITLOG
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[18px] font-medium text-white">
            
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white focus:!text-[#c2f800] active:!text-[#c2f800]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Plan</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#a3e635] text-xs font-bold text-black">
              {planCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-300">Saved</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500 text-xs font-bold text-white">
              {savedCount}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;