import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="main-container">
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex font-bold uppercase items-center">
          <p className="text-lg">vote</p>
          <p className="text-green-500 text-2xl">UP</p>
        </div>
        <div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            <Link href={"/"}>Go back</Link>
          </button>
        </div>
      </header>
      <div className="flex justify-center m-9">
        <SignIn path="/sign-in" routing="path" />
      </div>
    </div>
  );
}
