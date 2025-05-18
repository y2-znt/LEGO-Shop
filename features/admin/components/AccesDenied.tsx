import PageState from "@/components/shared/PageState";

type AccessDeniedProps = {
  title: string;
};

export default function AccessDenied({ title }: AccessDeniedProps) {
  return (
    <PageState
      title={title}
      imagePath="/assets/acces_denied.jpeg"
      imageWidth="w-1/5"
      showButton={true}
    />
  );
}
