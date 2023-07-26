/** @format */

import React from "react";
import { TextField } from "@mui/material";

const Comment = () => {
  return (
    <>
      <div className="mt-36 min-h-[calc(100vh-192px)]">
        <div className="text-center font-bold">
          <h1>Leave a comment</h1>
        </div>
        <form
          //   onSubmit={handleSubmit}
          className="w-1/3 mx-auto space-y-5 flex-col"
        >
          <TextField
            type="text"
            name="answer"
            size="large"
            multiline={true}
            rows={5}
            // margin="normal"
            inputProps={{
              Style: { marginBottom: "100px" },
            }}
            variant="outlined"
            // onChange={handleChange}
            placeholder="comment"
            className="w-full h-[100px] textFieldQ"
          />
          <button
            // onClick={handleSubmit}
            className="border-gray-50 border-2 bg-blue-700 px-4 text-sm rounded-md mx-auto text-gray-100 mt-50"
          >
            Post your comment
          </button>
        </form>
      </div>
    </>
  );
};

export default Comment;
