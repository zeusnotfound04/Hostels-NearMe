import { AddHostelForm } from "@/components/forms/AddHostelsFrom";

function Page() {
    const hostel = {}; // Define `hostel` or import it from your data source

    return (
        <div>
            <AddHostelForm hostel={hostel} /> {/* Proper prop assignment */}
        </div>
    );
}

export default Page;