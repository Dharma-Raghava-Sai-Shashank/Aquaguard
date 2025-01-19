import React from "react";

function footer() {
  return (
    <footer class="bg-gray-800 text-white py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h1 class="text-xl font-bold">YourBrand</h1>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="hover:underline">
              About
            </a>
            <a href="#" class="hover:underline">
              Services
            </a>
            <a href="#" class="hover:underline">
              Contact
            </a>
            <a href="#" class="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
        <div class="mt-6 border-t border-gray-700 pt-4">
          <p class="text-center text-sm text-gray-400">
            © 2025 YourBrand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default footer;
