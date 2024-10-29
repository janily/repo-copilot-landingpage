import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import Link from "next/link";

const CTAButton = ({ locale }: { locale: any }) => {
  return (
    <Link
      href="https://github.com/weijunext/landing-page-boilerplate"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <Button
        variant="default"
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
        aria-label="Get Boilerplate"
      >
        <Chrome className="w-7 h-7 border-gray-100 border-2 rounded-full" />
        {locale.title}
      </Button>
    </Link>
  );
};

export default CTAButton;
