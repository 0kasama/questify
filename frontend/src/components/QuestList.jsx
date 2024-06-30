"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { findAllQuests, updateQuest } from "@/fetch/quest";

export default function QuestList() {
  const [quests, setQuests] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findAllQuests();
        if (data && data.quests) {
          setQuests(data.quests);
        }
      } catch (error) {
        console.error("Error fetching quests:", error);
      }
    };

    fetchData();
  }, []);

  const handleComplete = async (questId) => {
    try {
      await updateQuest(questId, { status: "completed" });
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === questId ? { ...quest, status: "completed" } : quest
        )
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating quest:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleCancel = async (questId) => {
    try {
      await updateQuest(questId, { status: "cancelled" });
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === questId ? { ...quest, status: "cancelled" } : quest
        )
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating quest:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleEditModal = (quest) => {
    setTitle(quest.title);
    setDescription(quest.description);
    setDueDate(quest.dueDate ? moment(quest.dueDate).format("YYYY-MM-DD") : "");
    setId(quest.id);
    document.getElementById(`editQuest-${quest.id}`).showModal();
  };

  const handleEdit = async () => {
    const questData = {
      title,
      description,
      dueDate,
    };

    try {
      const response = await updateQuest(id, questData);
      console.log("Quest updated successfully:", response);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === id ? { ...quest, ...questData } : quest
        )
      );
      document.getElementById(`editQuest-${id}`).close();
    } catch (error) {
      console.error("Error updating quest:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleReopenModal = (quest) => {
    setTitle(quest.title);
    setDescription(quest.description);
    setDueDate(quest.dueDate ? moment(quest.dueDate).format("YYYY-MM-DD") : "");
    setId(quest.id);
    document.getElementById(`reopen-${quest.id}`).showModal();
  };

  const handleReopen = async () => {
    const questData = {
      title,
      description,
      dueDate,
      status: "ongoing"
    };

    try {
      const response = await updateQuest(id, questData);
      console.log("Quest updated successfully:", response);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setQuests((prevQuests) =>
        prevQuests.map((quest) =>
          quest.id === id ? { ...quest, ...questData } : quest
        )
      );
      document.getElementById(`editQuest-${id}`).close();
    } catch (error) {
      console.error("Error updating quest:", error);
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div>
      {success && (
        <div className='toast toast-center'>
          <div className='alert alert-success'>
            <span>Quest Updated!</span>
          </div>
        </div>
      )}

      {error && (
        <div className='toast toast-center'>
          <div className='alert alert-error'>
            <span>Failed to Update Quest!</span>
          </div>
        </div>
      )}

      <div className='mt-10 justify-center items-center divide-y-2 divide-slate-500'>
        <div className=' flex flex-col justify-center items-center gap-5 mb-5'>
          {quests.map(
            (quest) =>
              quest.status === "ongoing" && (
                <div
                  key={quest.id}
                  className='card relative bg-neutral text-neutral-content w-2/3 shadow-xl'
                >
                  <div className='absolute left-3 top-3 badge badge-info'>
                    {quest.status === "ongoing" ? "Ongoing" : ""}
                  </div>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='size-6 absolute right-3 top-3 cursor-pointer'
                    onClick={() => handleEditModal(quest)}
                  >
                    <path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
                    <path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
                  </svg>

                  <dialog
                    id={`editQuest-${quest.id}`}
                    className='modal modal-middle sm:modal-middle'
                  >
                    <div className='modal-box flex flex-col items-center gap-2'>
                      <label className='form-control w-full max-w-xs'>
                        <div className='label'>
                          <span className='label-text text-lg font-medium'>
                            Title
                          </span>
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
                          <span className='label-text text-lg font-medium'>
                            Due Date
                          </span>
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
                        <button className='btn btn-info' onClick={handleEdit}>
                          Save Changes
                        </button>
                        <button
                          className='btn'
                          onClick={() =>
                            document
                              .getElementById(`editQuest-${quest.id}`)
                              .close()
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </dialog>

                  <div className='mt-2 card-body items-center text-center'>
                    <h2 className='card-title'>
                      {quest.priority === "main" ? "Main Quest" : "Side Quest"}:{" "}
                      {quest.title}
                    </h2>
                    <p>{quest.description}</p>
                    <p>
                      {quest.dueDate
                        ? moment(quest.dueDate).format("DD MMM YYYY")
                        : ""}
                    </p>

                    <div className='justify-center items-center flex w-full'>
                      <button
                        className='btn btn-success w-1/2 mr-1'
                        onClick={() =>
                          document
                            .getElementById(`complete-${quest.id}`)
                            .showModal()
                        }
                      >
                        Complete
                      </button>
                      <dialog
                        id={`complete-${quest.id}`}
                        className='modal modal-middle sm:modal-middle'
                      >
                        <div className='modal-box'>
                          <h3 className='font-bold text-lg'>
                            Have you already completed the quest to earn exp?
                          </h3>
                          <div className='modal-action justify-center'>
                            <button
                              className='btn btn-success w-1/2'
                              onClick={() => handleComplete(quest.id)}
                            >
                              Yes!
                            </button>
                            <button
                              className='btn w-1/2'
                              onClick={() =>
                                document
                                  .getElementById(`complete-${quest.id}`)
                                  .close()
                              }
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </dialog>

                      <button
                        className='btn btn-ghost w-1/2'
                        onClick={() =>
                          document
                            .getElementById(`cancel-${quest.id}`)
                            .showModal()
                        }
                      >
                        Cancel
                      </button>
                      <dialog
                        id={`cancel-${quest.id}`}
                        className='modal modal-middle sm:modal-middle'
                      >
                        <div className='modal-box'>
                          <h3 className='font-bold text-lg'>
                            Are you sure want to cancel the quest?
                          </h3>
                          <div className='modal-action justify-center'>
                            <button
                              className='btn btn-error w-1/2'
                              onClick={() => handleCancel(quest.id)}
                            >
                              Yes!
                            </button>
                            <button
                              className='btn w-1/2'
                              onClick={() =>
                                document
                                  .getElementById(`cancel-${quest.id}`)
                                  .close()
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        <div className=' flex flex-col justify-center items-center gap-5 mb-5 pt-5'>
          {quests.map(
            (quest) =>
              quest.status === "completed" && (
                <div
                  key={quest.id}
                  className='card relative bg-info text-info-content w-2/3 shadow-xl'
                >
                  <div className='absolute left-3 top-3 badge badge-success'>
                    {quest.status === "completed" ? "Completed" : ""}
                  </div>

                  <div className='mt-2 card-body items-center text-center'>
                    <h2 className='card-title'>
                      {quest.priority === "main" ? "Main Quest" : "Side Quest"}:{" "}
                      {quest.title}
                    </h2>
                    <p>{quest.description}</p>
                    <p>
                      {quest.updatedAt
                        ? moment(quest.updatedAt).format("DD MMM YYYY")
                        : ""}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>

        <div className=' flex flex-col justify-center items-center gap-5 pt-5 mb-5'>
          {quests.map(
            (quest) =>
              (quest.status === "expired" || quest.status === "cancelled") && (
                <div
                  key={quest.id}
                  className='card relative bg-error text-error-content w-2/3 shadow-xl'
                >
                  <div className='absolute left-3 top-3 badge badge-warning'>
                    {quest.status === "cancelled"
                      ? "Cancelled"
                      : quest.status === "expired"
                      ? "Expired"
                      : ""}
                  </div>

                  <div className='mt-2 card-body items-center text-center'>
                    <h2 className='card-title'>
                      {quest.priority === "main" ? "Main Quest" : "Side Quest"}:{" "}
                      {quest.title}
                    </h2>
                    <p>{quest.description}</p>
                    <p>
                      {quest.dueDate
                        ? moment(quest.dueDate).format("DD MMM YYYY")
                        : ""}
                    </p>

                    <div className='justify-center items-center flex w-full'>
                      <button
                        className='btn btn-info w-1/2 mr-1'
                        onClick={() => handleReopenModal(quest)}
                      >
                        Reopen
                      </button>
                      <dialog
                        id={`reopen-${quest.id}`}
                        className='modal modal-middle sm:modal-middle'
                      >
                        <div className='modal-box text-neutral-content flex flex-col items-center gap-2'>
                          <label className='form-control w-full max-w-xs'>
                            <div className='label'>
                              <span className='label-text text-lg font-medium'>
                                Title
                              </span>
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
                              <span className='label-text text-lg font-medium'>
                                Due Date
                              </span>
                            </div>
                            <input
                              type='date'
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                              placeholder='Enter the quest due date'
                              className='input input-bordered input-info w-full max-w-xs'
                            />
                          </label>

                          <div className='modal-action w-full justify-center'>
                            <button
                              className='btn btn-info w-1/2'
                              onClick={handleReopen}
                            >
                              Save Changes
                            </button>
                            <button
                              className='btn w-1/2'
                              onClick={() =>
                                document
                                  .getElementById(`reopen-${quest.id}`)
                                  .close()
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </dialog>

                      <button
                        className='btn btn-ghost w-1/2'
                        onClick={() =>
                          document
                            .getElementById(`cancelDelete-${quest.id}`)
                            .showModal()
                        }
                      >
                        Delete
                      </button>
                      <dialog
                        id={`cancelDelete-${quest.id}`}
                        className='modal modal-middle sm:modal-middle'
                      >
                        <div className='modal-box bg-warning'>
                          <h3 className='font-bold text-lg'>
                            Once you delete a quest, you cannot recover it.
                          </h3>
                          <div className='modal-action justify-center'>
                            <button
                              className='btn btn-error w-1/2'
                              onClick={() => handleDelete(quest.id)}
                            >
                              I understand, delete!
                            </button>
                            <button
                              className='btn w-1/2'
                              onClick={() =>
                                document
                                  .getElementById(`cancelDelete-${quest.id}`)
                                  .close()
                              }
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
