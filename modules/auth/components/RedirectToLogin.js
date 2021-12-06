import { useRouter } from "next/router";
import { useEffect } from "react";
const pagesWithNoAuthentication = [login];

const RedirectToLogin = () => {

  useEffect(() => {
    return () => {
      // effect
    };
  }, [input])

  return (
    <div className="w-100 h-100 d-flex justify-content-center">
      <div class="spinner-grow text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}