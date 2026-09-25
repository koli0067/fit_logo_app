import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo.png";
import NavLink from "./Navlink";
import NavCounters from "./NavCounters";


const Navbar = () => {
  const navLinks = [
    { name: "Workouts", href: "/workouts" },
    { name: "My Plan", href: "/my-plan" },
  ];

  // const planCount = 0;
  // const savedCount = 0;

  return (
    <nav className="bg-[#15171d] py-4 shadow-sm">
      <div className="navbar container mx-auto">
       
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
              className="menu menu-sm dropdown-content z-[1] mt-3 w-52 rounded-box border border-gray-800 bg-[#15171d] p-2 text-white shadow"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href}>{link.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/" className="flex items-center gap-2 text-2xl font-semibold text-white">
            <Image src={logo} alt="Fitlog Logo" width={32} height={32} />
            FITLOG
          </Link>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-6 px-1 text-[18px] font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      
      <NavCounters />
        
        {/* <div className="navbar-end gap-3">
          
          <div className="flex items-center gap-2 rounded-full  px-3 py-1 text-sm font-semibold text-white">
            <span>Plan</span>
            <span className="flex h-5 w-5 items-center justify-center bg-[#ccff00] rounded-full text-xs text-black">
              {planCount}
            </span>
          </div>

          
          <div className="flex items-center gap-2 px-3 py-1 text-sm font-semibold text-white">
            <span>Saved</span>
            <span className="flex h-5 w-5 items-center justify-center border-gray-500 bg-gray-700 border rounded-full  text-xs">
              {savedCount}
            </span>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;