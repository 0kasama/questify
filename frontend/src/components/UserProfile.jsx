"use client";

import { findUser } from "@/fetch/user";
import { findAllLevels } from "@/fetch/level";
import { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState("");
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await findUser();
        if (userData) {
          setUser(userData);
        }

        const levelData = await findAllLevels();
        if (levelData && levelData.levels) {
          setLevels(levelData.levels);
        }
      } catch (error) {
        console.error("Error fetching user or levels:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='flex w-full h-screen flex-col justify-center items-center'>
      {user && (
        <div key={user.user.id}>
          <div className='label justify-center'>
            <span className='label-text text-lg'>
              {user.user.exp} / {user.nextLevel.expRequire}
            </span>
          </div>
          <progress
            className='progress progress-success justify-center items-center w-96 mb-5'
            value={user.user.exp}
            max={user.nextLevel.expRequire}
          ></progress>
          <div className='card bg-neutral text-neutral-content w-96'>
            <div className='card-body items-between text-center'>
              <p>Level: {user.user.levelId}</p>
              <p>Name: {user.user.name}</p>
              <p>Email:{user.user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
