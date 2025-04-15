import { getProfileData } from "@/actions/users/getProfileData";
import ProfilePage from "@/components/profile";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const profileData = await getProfileData(session?.user.id);
  
  
  const transformedData = profileData && 'id' in profileData ? {
    ...profileData,
    pfpUrl: profileData.pfpUrl === null ? undefined : profileData.pfpUrl
  } : profileData;
  
  return (
    <ProfilePage initialProfile={transformedData}/>
  )
}