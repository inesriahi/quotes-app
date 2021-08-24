import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    status,
    error,
    data: loadedComments,
    sendRequest,
  } = useHttp(getAllComments, true);

  const { quoteId } = useParams();

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId, isAddingComment]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else if (status === 'completed' && loadedComments && loadedComments.length > 0){
    comments = <CommentsList comments={loadedComments} />
  } else if (error) {
    comments =  (
      <div className="centered focused">
        <p>Error Loading Comments!</p>
      </div>
    );
  } else if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = (
      <div className="centered">
        <p>No comments yet!</p>
      </div>
    );
  }
  console.log(loadedComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const onAddCommentHandler = useCallback(() => {
    setIsAddingComment(false);
  }, [])

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddComment={onAddCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
