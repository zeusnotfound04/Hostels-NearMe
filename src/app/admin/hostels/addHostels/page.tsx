// import  {AddHostelForm}  from "@/components/forms/AddHostelsFrom";
import AddhostelForm from "@/components/AddhostelForm"
import { Hostel } from "@prisma/client";

function Page() {
    // const hostel : Hostel = {
    //     name: "Hostel Name",
    //     about: "About the hostel",
    //     price: 1000,
    //     city: "city",
    //     state: "state",
    //     hostelType   : "SINGLE",
    //     attachedWashroom: false,
    //     cctv: true,
    //     chair: false,
    //     cooler: true,
    //     inverterBackup: false,
    //     parking: true,
    //     biweeklycleaning: false,
    //     allDayElectricity: true,
    //     generator: false,
    //     geyser: true,
    //     indoorGames: false,
    //     pillow: true,
    //     waterByRO: false,
    //     securityGuard: true,
    //     table: false,
    //     wiFi: true,
    //     foodIncluded: false,
    //     bed: true,
    //     vegetarienMess: false,
    //     allDayWaterSupply: true,
    //     Almirah: true,
    //     gym: false,
    //     allDayWarden: true,
    //     airconditioner: false
    // };

    return (
        <div>
            <AddhostelForm  /> 
        </div>
    );
}

export default Page;