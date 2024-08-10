import { ReactNode } from "react";
import { Toast } from "../_atomics";

interface ISignUpToast {
  children: ReactNode;
}

const SignUpToast = ({ children }: ISignUpToast) => {
  return (
    <div className="w-full flex justify-center px-4">
      {/* TODO: 동적으로 어떻게 할당하지..? */}
      <Toast>{children}</Toast>
    </div>
  );
};

export default SignUpToast;
