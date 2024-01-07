import Button from "@/components/ui/Button";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormStatus } from 'react-dom';

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
