 
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'

export default async function MemberShipPage() {
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
        return null; // Ensure no further code is executed
      }
  return (
        <div>membership</div>
  );
}
