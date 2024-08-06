export interface User extends ToastFn {
  id: number;
  created_at: string;
  updated_at: string;
  email: string;
  profile: string;
  introduce: string;
  name: string;
  position: string;
  secondary_email: string;
  sns: string;
  platform: "google" | "kakao";
  is_marketing: true;
}

interface ToastFn {
  onClick?: React.Dispatch<React.SetStateAction<"email" | "sns" | "">>;
}
