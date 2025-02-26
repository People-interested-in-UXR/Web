import { PrivacyConsentForm } from "@/app/components/ui/Form/PrivacyConsent/PrivacyConsentForm";

export default function Page() {
  return (
    <div className="w-full h-calc-header bg-background-default flex justify-center items-center">
      <div className="flex flex-col justify-center text-center gap-10 w-[300px]">
        <h1 className="text-brown-900 h1-700-32 break-keep text-pretty">
          약관에 동의가 필요해요
        </h1>
        <PrivacyConsentForm />
      </div>
    </div>
  );
}
