import React from "react";
import s from "./Loader.module.scss";

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={s.loaderOverlay}>
      <div className={s.loader}></div>
    </div>
  );
};