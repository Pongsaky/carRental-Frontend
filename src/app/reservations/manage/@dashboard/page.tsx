import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"
import getUserProfile from "@/libs/getUserProfile";
import Car from "@/db/models/Car";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

    const addCar = async (addCarFrom: FormData) => {
        "use server"
        const model = addCarFrom.get('model')
        const description = addCarFrom.get('desc')
        const picture = addCarFrom.get('picture')
        const seats = addCarFrom.get('seats')
        const doors = addCarFrom.get('doors')
        const largebags = addCarFrom.get('largebags')
        const smallbags = addCarFrom.get('smallbags')
        const automatic = true
        const dayRate = addCarFrom.get('dayRate')

        try {
            await dbConnect()
            const car = await Car.create({
                "model": model,
                "description": description,
                "picture": picture,
                "seats": seats,
                "doors": doors,
                "largebags": largebags,
                "smallbags": smallbags,
                "automatic": automatic,
                "dayRate": dayRate
            })
        } catch (error) {
            console.log(error)
        }
        revalidateTag('cars')
        redirect("/car")
    }

    const session = await getServerSession(authOptions) 
    if (!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>{profile.data.email}</td>
                    </tr>
                    <tr>
                        <td>Tel.</td>
                        <td>{profile.data.tel}</td>
                    </tr>
                    <tr>
                        <td>Member Since</td>
                        <td>{createdAt.toString()}</td>
                    </tr>
                </tbody>
            </table>
            {
                (profile.data.role === 'admin') ?
                <form action={addCar}>
                    <div className="text-xl text-blue-700">Create Car Model</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="model">Model</label>
                        <input type="text" name="model" id="model" required placeholder="Car Model" 
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="desc">Description</label>
                        <input type="text" name="desc" id="desc" required placeholder="Car Description"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Picture</label>
                        <input type="text" name="picture" id="picture" required placeholder="URL" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="seats">Seats</label>
                        <input type="number" name="seats" id="seats" required placeholder="4" min={0} max={50} className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                        <label className="w-auto block text-gray-700 pr-4 ml-5" htmlFor="doors">Doors</label>
                        <input type="number" name="doors" id="doors" placeholder="4" required min={0} max={8} 
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400"/>
                        <input type="checkbox" id="automatic" name="automatic" className="ml-5 mr-2" />
                        <span>Auto</span>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="largebags">Large Bags</label>
                        <input type="number" name="largebags" id="largebags" placeholder="2" required min={0} max={10}
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                        <label htmlFor="smallbags" className="w-auto block text-gray-700 pr-4 ml-5">Small Bags</label>
                        <input type="number" name="smallbags" id="smallbags" placeholder="2" required min={0} max={10}
                        className="bg-white border-2 border-gray-200 rounded w-auto p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label htmlFor="dayRate" className="w-auto block text-gray-700 pr-4">Rate</label>
                        <input type="text" name="dayRate" id="dayRate" placeholder="Daily Rate (including insurance)" required
                        className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Car</button>
                </form>
                        
                : null
            }
        </main>
    )
}
