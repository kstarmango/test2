import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function Post({ article }) {
  const { _id, title, description,content } = article;
  
  return (
    <article className="Article">
      <h1>{title}</h1>
      <p>{description}</p>
      <br />
      <a href={`/single-post/${_id}`}>Read more &rarr;</a>
      {/* <p>{content}</p> */}
    </article>
  );
}