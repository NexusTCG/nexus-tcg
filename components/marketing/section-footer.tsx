import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";

export default function SectionFooter() {
  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <Image src="/logo.svg" alt="Nexus Logo" width={120} height={40} />
            <p className="mt-4">Create, play, and share custom card games.</p>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/cards">Cards</Link></li>
              <li><Link href="/learn">Learn</Link></li>
              <li><Link href="/community">Community</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl"><FaTwitter /></a>
              <a href="#" className="text-2xl"><FaDiscord /></a>
              <a href="#" className="text-2xl"><FaGithub /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Nexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}