import { LoginButton } from "@/components/LoginButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-white">
      <main className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-black mb-4">COPA AEJ</h1>
        <LoginButton />
      </main>
    </div>
  );
}
