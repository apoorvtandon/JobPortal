import { currentUser } from '@clerk/nextjs/server';
import Header from "../header"

async function CommonLayout({children}){
    const user = await currentUser();
    return <div className="mx-auto max-w-7xl p-6 lg:px-8">
       < Header user={JSON.parse(JSON.stringify(user))}/>
        <main>{children}</main>
    </div>
}

export default CommonLayout