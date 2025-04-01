import { getProfileData } from "@/actions/users/getProfileData";
import ProfilePage from "@/components/profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {

  const session = await getServerSession(authOptions);

  console.log("USER SERVER COMPONENT ::::::::::::" , session)
  console.log("USER ID::::::::" , session?.user.id)
  const profileData =  await getProfileData(session?.user.id)
  console.log("PROFILE DATA ::::::" , profileData)
  // const profileData = await getProfileData()
  
  return (
   
    <ProfilePage initialProfile={profileData}/>
  )
}