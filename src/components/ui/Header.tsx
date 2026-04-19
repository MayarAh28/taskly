import Image from "next/image";

export default function Header() {
    return (
        <header className="transparent p-4 flex items-center">
            <Image src="/Logo.png" alt="Logo" width={106} height={28} className="inline-block mr-2" />
        </header>
    );
    }
