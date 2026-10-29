import { AddDestinationForm } from "@/components/destinations/add-destination-form";

const AddDestinationPage = () => {
    return (
        <div className="mx-auto max-w-6xl px-6 py-10">
            <h2 className="text-3xl font-semibold text-gray-900">
                Add New Travel Package
            </h2>
            <div className="mt-8">
                <AddDestinationForm />
            </div>
        </div>
    );
};

export default AddDestinationPage;
