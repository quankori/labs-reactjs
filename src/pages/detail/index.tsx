import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return (
    <>
      <p>ID: {id}</p>
    </>
  );
};
