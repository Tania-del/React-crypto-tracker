"use client";
const useCustomSearchParams = () => {
    let searchParams: Partial<URLSearchParams> = {
  };
  if (typeof window !== "undefined") {
    searchParams = new URLSearchParams(window.location.search);
  }
  return searchParams;
};

export default useCustomSearchParams;
