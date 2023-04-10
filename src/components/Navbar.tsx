import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center px-10 md:px-8 max-w-[2520px] mx-auto py-4">
        <div className="flex justify-center items-center">
          <Link href="/" className="text-zinc-600 font-medium text-lg">Ubuntu Dream</Link>
        </div>


      </div>
    </nav>
  );
};
export default Navbar;
