"use client"
import * as z from "zod"

import { Hostel } from "@prisma/client"



interface AddHostelFormProps{
    hostel : Hostel
}



const AddHostelForm = ({hostel}:AddHostelFormProps) =>{
    return <div>
        Add
    </div>
}

