export default function Header() {
  return (
    <header className="header-section w-full h-[120px] flex items-center justify-between bg-gradient-to-r from-[#fcb900] to-[#ff7a00] text-white">
      {/* Logo Section */}
      <div className="flex flex-col select-none cursor-pointer">
        <img src="img/logo-white.png" alt="Logo" className="navbar-brand" />
      </div>

      {/* Navigation - Center Pill */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
        <ul className="navigation_navigation__container">
          <li className="navigation_navigation__item">
            <a href="#" className="hover:opacity-80 transition-opacity">
              SHOP
            </a>
          </li>
          <li className="navigation_navigation__item">
            <a href="#" className="hover:opacity-80 transition-opacity">
              ABOUT
            </a>
          </li>
        </ul>
      </nav>
      {/* Action - Right Pill */}
      <div className="flex items-center">
        <button className="cta-btn">
          <span><a href="#">CART</a></span>
        </button>
      </div>
    </header>
  );
}
