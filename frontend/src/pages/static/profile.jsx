import React from 'react'

function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-red-600">Profile</h2>

        {/* Profile Picture and Info Section */}
        <div className="flex items-center space-x-8 mb-6">
          {/* Profile Picture */}
          <div className="relative">
            <img className="rounded-full w-44 h-47" src={ritik} alt="Avatar" />
            <p className="text-red-500 text-sm mt-6 text-center mt-">
              Change Profile Picture
            </p>
          </div>
          {/* Personal Information */}
          <div className="w-full">
            <h3 className="text-xl font-semibold text-red-600">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Admin"
                  className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className=" text-sm font-medium text-gray-700"
                >
                 
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  className="mt-1  w-full border-gray-300 rounded-md  bg-gray-100 "
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Mobile Number{" "}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="mobile"
                  placeholder="+91 9876543210"
                  className=" bg-gray-100 mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pl-44">
          <h3 className="text-xl font-semibold text-red-600">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option>India</option>
                {/* Add more countries if needed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <select
                id="state"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option>Delhi</option>
                {/* Add more states if needed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="New Delhi"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              <div>
                <textarea
                  type="text"
                  id="city"
                  placeholder="Address"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-8 pl-44 ">
          <button className="w-auto bg-red-600 text-white py-2 px-4 rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile;
