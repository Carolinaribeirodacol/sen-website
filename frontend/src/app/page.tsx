import Image from "next/image";

export default async function Page() {    
    return (
    //    <main className="min-h-screen">
    //         <div className="min-h-screen text-white flex flex-col align-middle items-center content-center justify-center bg-[url('/assets/bg.jpg')] object-cover w-full">
    //             <Image src="/assets/sen-logo-latest.png" width={200} height={200} alt="sen-logo" />
    //              <h1 className="text-center font-medium text-4xl pt-6">“O meio é a mensagem”</h1>
    //             <span className="text-center text-xl">Marshall McLuhan</span>
    //         </div>
    //     </main>
    
    <main className="min-h-screen">
            <div className="min-h-screen text-white align-middle items-center content-center flex flex-col justify-center bg-gradient-to-r from-sky-700 via-rose-900 to-yellow-600 w-full">
                <Image src="/assets/sen-logo-new.png" width={200} height={200} alt="sen-logo" />
                <h1 className="text-center font-medium text-4xl pt-6">“O meio é a mensagem”</h1>
                <span className="text-center text-xl">Marshall McLuhan</span>
            </div>
    </main>
    );
}