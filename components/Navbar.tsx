import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
    return (
        <header>
            <nav>
                <Link href="/" className="logo">
                    <Image src="/icons/logo.png" width={24} height={24} alt="icon-image"/>
                    <p >Event Sansar</p>
                </Link>
                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/">Events</Link>
                    <Link href="/">Create Events</Link>
                </ul>
            </nav>
        </header>
    );
}