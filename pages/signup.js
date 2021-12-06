import { useEffect } from "react";
import { useUser } from "../modules/user/services/user/provider";
import { useRouter } from "next/router";
import { getLayout } from "../common/layouts/NavFooterLayout";
import SignupForm from "../modules/user/components/SignupForm";

const Signup = () => {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div style={{ maxWidth: "600px", width: "100%", margin: "50px auto" }}>
      <h2 className="pb-3">Signup</h2>
      <SignupForm />
    </div>
  );
};

Signup.getLayout = getLayout;

export default Signup;
