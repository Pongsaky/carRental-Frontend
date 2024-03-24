import Image from "next/image"
import getCar from "@/libs/getCar"
import Link from "next/link";

export default async function CarDetailPage({ params }: {params: {cid: string}}) {

    /**
     * Mock Data for Demonstration Only
     */

    // const mockCarRepo = new Map()
    // mockCarRepo.set("001", { name: "Honda Civic", img: "/img/civic.jpg" })
    // mockCarRepo.set("002", { name: "Honda Accord", img: "/img/accord.jpg" })
    // mockCarRepo.set("003", { name: "Toyota Fortuner", img: "/img/fortuner.jpg" })
    // mockCarRepo.set("004", { name: "Tesla Model 3", img: "/img/tesla.jpg" })

    const carDetail = await getCar(params.cid);

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">Car ID {carDetail.data.model}</h1>
            <div className="flex flex-row my-5">
                <Image src={ carDetail.data.picture }
                alt = "Product Picture"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%] bg-black"
                />
                <div className="text-md mx-5">{ carDetail.data.description }
                    <div>Doors: {carDetail.data.doors}</div>
                    <div>Seats: {carDetail.data.seats}</div>
                    <div>Large Bags: {carDetail.data.largebags}</div>
                    <div>Small Bags: {carDetail.data.smallbags}</div>
                    <div>Daily Rental Rate: {carDetail.data.dayRate} (insurance included)</div>

                    <Link href={`/reservations?id=${params.cid}&model=${carDetail.data.model}`}>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm">Make Reservation</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    return [{cid: '001'}, {cid: '002'}, {cid: '003'}, {cid: '004'}]
}