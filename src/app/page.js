import HomePage from "@/components/HomePage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function Home() {

  return (
    <MaxWidthWrapper className="mb-12 mt-40">
      <HomePage />
    </MaxWidthWrapper>
  );
}
