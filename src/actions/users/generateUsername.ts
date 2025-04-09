





export default function generateUsername(name: string | undefined) {
    const firstName = name?.split(" ")[0].toLowerCase();
    const randomNumber = Math.floor(10000 + Math.random() * 90000); 
    return `${firstName}${randomNumber}`;
  }
  