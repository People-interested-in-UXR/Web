export interface User extends ToastFn {
  email: string;
  introduce: string;
  name: string;
  position: string;
  profile: string;
  secondary_email: string;
  sns: string;
}

interface ToastFn {
  setIsClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}
