import { H1 } from "../components/typography"
import Rayon from "../image/rayon.jpeg"
import regard from "../image/regard.jpeg"
import tunnel from "../image/tunnel.jpeg"
import nature from "../image/nature.jpeg"
import Tilt from "../components/tilt"


const MapImage = [Rayon, regard, tunnel, nature]
export const Galerie = () => {
    return (
        <>
            <H1 className="mt-32">Bientôt Disponible...</H1>
            <div className="flex justify-evenly flex-wrap my-32">
                {
                    MapImage.map((source) => <Tilt src={source} move ></Tilt>)
                }
            </div>
        </>
    )
}