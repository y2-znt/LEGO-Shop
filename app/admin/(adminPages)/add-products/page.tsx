import AddProductForm from "./AddProductForm";

export default async function AddProducts() {
  return (
    <div>
      <h1 className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Add Products
      </h1>
      <AddProductForm />
    </div>
  );
}
