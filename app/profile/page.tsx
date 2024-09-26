"use client";

import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import Spinner from "../components/Spinner";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null); // Profile data state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.get("/api/auth/profile/");
        console.log(response);
        setProfile(response); // Assuming API returns data in `data` field
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching the profile."
        );
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchProfile(); // Call the function when the component mounts
  }, []); // Empty dependency array means this useEffect runs once on mount

  console.log(profile);

  if (loading) {
    return (
      
          <Spinner/>
        
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Profile</h2>
      {profile && (
        <div className="space-y-8">
          <div className="flex items-center space-x-6">
            <img
              src={profile.image || "/profile_pic_1.jpg"} // Default avatar if not set
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full border-4 border-airbnb"
            />
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                {profile.full_name || "Full Name Not Provided"}
              </h3>
              <h5 className="text-lg font-semibold text-gray-900">
                {profile.headline || "No Headline Available"}
              </h5>
              <p className="text-md text-gray-600">
                {profile.user?.email || "Email Not Available"}
              </p>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">Address</h4>
            <p className="text-gray-800">
              {profile?.full_address || "Address Not Provided"}
            </p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">City</h4>
            <p className="text-gray-800">
              {profile?.profile?.city || "City Not Provided"}
            </p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h4 className="text-lg font-semibold text-gray-700">About Me</h4>
            <p className="text-gray-800">
              {profile?.about || "About Information Not Provided"}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8">
            <button
              onClick={() => alert("Edit Profile feature coming soon!")}
              className="w-full bg-airbnb hover:bg-airbnb-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Profile;
