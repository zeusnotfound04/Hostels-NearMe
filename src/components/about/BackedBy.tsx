import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const items = [ 
    {
        id : 1,
        quote: "We are proud to support the mission of this platform and are committed to helping it succeed.",
        title: "CEO of TechCorp",
        name: "John Doe",
        image: "/icons/ArrowL1.svg", // Added an example image
    }, 
    {
        id : 2,
        quote: "This platform is changing the game for our industry and we are excited to be a part of it.",
        title: "CTO of Innovate Inc.",
        name: "Jane Smith",
        // No image for this item to demonstrate it works without images too
    },
    {
        id : 3,
        quote: "We believe in the vision of this platform and are excited to see where it goes.",
        title: "COO of FutureTech",
        name: "Bob Johnson",
        image: "/logo/logo.jpg", // Added another example image
    },
    {
        id : 4,
        quote: "This platform is a game-changer and we are proud to be associated with it.",
        title: "CFO of NextGen Solutions",
        name: "Alice Brown",
        // No image for this item
    },
]

export default function BackedBy() {
    return (
        <div className="py-8">
            <h1 className="text-center text-3xl font-bold text-primary mb-6">Backed By</h1>
            <InfiniteMovingCards items={items} pauseOnHover={true} speed="normal" direction="right"/>
        </div>
    )    
}