import React from "react";
import { FaTrash, FaRegEdit } from "react-icons/fa";
const SingleTodo = ({
  title,
  description,
  createdAt,
  deleteNote,
  updateNote,
  updatedAt,
}) => {
  let upper = title.toUpperCase();
  const date = createdAt.slice(0, 10);
  const time = createdAt.slice(11, 20);
  const modifiedDate = updatedAt.slice(0, 10);
  const modifiedTime = updatedAt.slice(11, 20);
  return (
    <div className=" mt-4 bg-gray-300 px-6 rounded-lg sm:mx-8 flex justify-between items-center">
      <div className="p-6 font-mono">
        <div className="font-semibold sm:text-2xl text-xl text-orange-500">
          {upper}
        </div>
        <div className="sm:text-xl text-lg mb-2">{description}</div>
        <h6 className="text-gray-500 italic">
          created at: {date} | time: {time}
        </h6>
        <h6 className="text-gray-500 italic">
          last modified: {modifiedDate} | time: {modifiedTime}
        </h6>
      </div>
      <div className="flex gap-8">
        <FaRegEdit
          className="cursor-pointer sm:text-2xl text-xl hover:text-teal-400"
          onClick={updateNote}
        />
        <FaTrash
          className="cursor-pointer sm:text-2xl text-xl hover:text-red-600"
          onClick={deleteNote}
        />
      </div>
    </div>
  );
};

export default SingleTodo;
