import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    push("/dashboard?tab=ALL&_limit=10&_page=1");
  }, [push]);

  return <div></div>;
}
