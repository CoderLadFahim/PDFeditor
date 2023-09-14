import { ChangeEvent, useState } from "react"
import CanvasInput from "./CanvasInput"
import { Image, Type } from "react-feather"

function CanvasControl() {
    const [val, setVal] = useState<number>(0)
	return (
		<section className="app-canvas-control bg-gray-800 px-6 pt-6 text-white relative">
			<div className="coord-inputs space-y-6 mb-16">
			    <CanvasInput 
			        label="X"
			        value={val} 
			        onChange={(e: ChangeEvent<HTMLInputElement>) => setVal(+e.target.value)} 
			    />

			    <CanvasInput 
			        label="Y"
			        value={val} 
			    />
			</div>

            <div className="coord-inputs space-y-6 mb-14">
			    <CanvasInput 
			        label="W"
			        value={val} 
			    />

			    <CanvasInput 
			        label="H"
			        value={val} 
			    />
			</div>

            <div className="coord-inputs space-x-4">
                <button className="rounded p-2 bg-gray-700 bg-green-500">
                    <Type size={20} />
                </button>

                <button className="rounded p-2 bg-gray-700">
                    <Image size={20} />
                </button>
            </div>

       {/*      <div className="absolute bottom-0"> */}
       {/*          <ul> */}
				   {/*  <li className={`${location.pathname === '/' ? 'active-nav-link' : ''} nav-link transition`}> */}
				   {/*      <Eye /> */}
				   {/*      <p className="nav-link-text">Upload</p> */}
				   {/*  </li> */}
			    {/* </ul> */}
       {/*      </div> */}
		</section>
	)
}

export default CanvasControl
