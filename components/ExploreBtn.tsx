'use client';
import { icons } from "lucide-react";
import Image from "next/image";
export default function ExploreBtn() {
    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={()=> console.log('clicked')}>
            <a href="#events">
                ExploreBtn
                <Image src="/icons/arrow-down.svg"  width={24} height={24} alt="arrow-down-button" />
            </a> 
        </button>
    );
}