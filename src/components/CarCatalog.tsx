import Link from "next/link";
import ProductCard from "./ProductCard";
import { CarItem, CarJson } from "../../interfaces";

export default async function CarCatalog( { carJson } : { carJson: CarJson }) {
    const carJsonReady = await carJson;    

    return (
        <>
            Expolre {carJsonReady.count} models in our catalog
            <div className="m-[20px] flex flex-row flex-wrap justify-around p-[10px]">
                {
                    carJsonReady.data.map((carItem: CarItem) => (
                        <Link href={`car/${carItem.id}`} 
                        className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                            <ProductCard carName={carItem.model} imgSrc={carItem.picture} />
                        </Link>
                    ))

                }
            </div>
        </>
    )
}