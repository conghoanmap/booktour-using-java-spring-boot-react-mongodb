import { SearchIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

const HotelSearchBox = () => {
  return (
    <div className="grid md:grid-cols-4 gap-3 my-5">
      <div>
        <div className="mt-1">
          <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
          </select>
        </div>
      </div>
      <div>
        <div className="mt-1">
          <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
          </select>
        </div>
      </div>
      <div>
        <div className="mt-1">
          <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
          </select>
        </div>
      </div>
      <div>
        <Link
          to="/tours"
          className="h-full w-full mt-auto mb-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          Tìm kiếm
        </Link>
      </div>
    </div>
  )
}

export default HotelSearchBox