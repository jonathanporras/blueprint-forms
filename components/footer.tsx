const Footer = () => {
  return (
    <footer className="text-white py-12 w-full bg-[#1E3A5F]">
      <div className="max-w-6xl mx-auto px-4  my-8 flex flex-col justify-between items-center">
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/contact" className="hover:underline">
            About
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy
          </a>
          <a href="/privacy" className="hover:underline">
            Terms
          </a>
        </div>
        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} QuickForm Pro.</p>
      </div>
    </footer>
  );
};

export default Footer;
