import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const { status, error, sendRequest } = useHttp(addComment);
  const commentTextRef = useRef();

  const {onAddComment} = props;
  useEffect(() => {
    if (status === 'completed' && !error)
      onAddComment()
  }, [status, error, onAddComment])

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    sendRequest({
      commentData: {text:commentTextRef.current.value},
      quoteId: props.quoteId,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
