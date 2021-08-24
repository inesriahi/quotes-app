import React, { useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

export default function SingleQuote(props) {
  const { status, data: quote, error, sendRequest } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const params = useParams();
  const id = params.quoteId;

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else if (error) {
    return (
      <div className="centered focused">
        <p>{error}</p>
      </div>
    );
  } else if (!quote.text) {
    return <p>No Quote Found!</p>
  }

  return (
    <div>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments quoteId = {id} />
      </Route>
    </div>
  );
}
