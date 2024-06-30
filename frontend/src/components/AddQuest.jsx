"use client";

import { createQuest } from "@/fetch/quest";
import { useState } from "react";

export default function AddQuest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleCreate = async () => {
    if (type === "main" && !dueDate) {
      alert("Due date is required for Main Quests.");
      return;
    }

    const questExp = type === "main" ? 10 : type === "side" ? 5 : 0;

    const questData = {
      title,
      description,
      priority: type,
      dueDate,
      exp: questExp,
    };

    try {
      const response = await createQuest(questData);
      console.log("Quest created successfully:", response);

      document.getElementById(`addQuest`).close();
      setTitle("");
      setDescription("");
      setType("");
      setDueDate("");
      window.location.reload()
    } catch (error) {
      console.error("Error creating quest:", error);
    }
  };

  return (
    <div className='justify-center flex mt-10'>
      <button
        className='btn btn-info w-1/2 mr-1'
        onClick={() => document.getElementById(`addQuest`).showModal()}
      >
        Add New Quest
      </button>
      <dialog id={`addQuest`} className='modal modal-middle sm:modal-middle'>
        <div className='modal-box flex flex-col items-center gap-2'>
          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-lg font-medium'>Title</span>
            </div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter quest title'
              className='input input-bordered input-info w-full max-w-xs'
            />
          </label>

          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-lg font-medium'>
                Description
              </span>
            </div>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Describe the quest'
              className='input input-bordered input-info w-full max-w-xs'
            />
          </label>

          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-lg font-medium'>Quest Type</span>
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className='select select-info w-full max-w-xs'
            >
              <option disabled value=''>
                Main / Side Quest
              </option>
              <option value='main'>Main Quest</option>
              <option value='side'>Side Quest</option>
            </select>
          </label>

          <label className='form-control w-full max-w-xs'>
            <div className='label'>
              <span className='label-text text-lg font-medium'>Due Date</span>
            </div>
            <input
              type='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder='Enter the quest due date'
              className='input input-bordered input-info w-full max-w-xs'
            />
          </label>

          <div className='modal-action justify-center'>
            <button className='btn btn-info' onClick={handleCreate}>
              Yes!
            </button>
            <button
              className='btn'
              onClick={() => document.getElementById(`addQuest`).close()}
            >
              No
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
