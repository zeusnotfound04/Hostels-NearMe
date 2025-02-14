import { HostelCard } from "@/components/home/HostelCard";
import { HostelListing } from "@/components/home/HostelListing";
import ListRequestForm from "@/components/ListHostelRequest/RequestForm";


export default function Page() {
    return (
        <div>
            <h1>Test Component</h1>
            <HostelListing/>
        {/* <ListRequestForm/> */}
        </div>
    );
}