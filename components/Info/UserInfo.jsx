"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function UserInfo() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const config = {
    headers: { Authorization: `bearer ${sessionStorage.getItem("jwt")}` },
  };
  useEffect(() => {
    fetch("https://capstone.marcusnguyen.dev/api/users/current", config)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setUser(data);
      });
  }, []);

  return (
    <div className="w-full col-span-1 bg-white rounded-md p-4 text-black">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="font-bold text-4xl text-black underline">Info</div>
          <div className="text-xl">
            <label className="font-bold">Email:</label>{" "}
            <label>{user.Email}</label>
          </div>
          <br />
          <div className="text-xl">
            <label className="font-bold">Credit:</label> {user.Credits}
          </div>

          <div className="text-xl">
            <label className="font-bold">Badges owned:</label>{" "}
            {user.Badges.length}
          </div>
          <div className="text-xl">
            <label className="font-bold">Outfits owned:</label>{" "}
            {user.OutfitsInventory.length}
          </div>
          <div className="text-xl">
            <label className="font-bold">Outfits owned:</label>{" "}
            {user.Inventory.length}
          </div>
        </div>
      )}
    </div>
  );
}
