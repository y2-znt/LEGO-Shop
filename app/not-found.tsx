import PageState from "@/components/shared/PageState";
import Title from "@/components/shared/Title";

export default function notfound() {
  return (
    <div>
      <Title text="Not Found :/" />
      <PageState
        title="Page not found :/"
        imagePath="/assets/favorite-empty.webp"
      />
    </div>
  );
}
