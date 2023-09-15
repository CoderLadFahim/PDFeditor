import {ChangeEvent, useState} from 'react'
import CanvasInput from './CanvasInput'
import {Download, Eye, Image, Trash, Type} from 'react-feather'

function CanvasControl() {
	const [val, setVal] = useState<number>(0)
	return (
		<section className="app-canvas-control bg-gray-800 px-6 pt-6 text-white relative">
			<div className="coord-inputs space-y-6 mb-10">
				<CanvasInput
					label="X"
					value={val}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						    if (/^\d+$/.test(e.target.value)) setVal(+e.target.value)
                        }
					}
				/>

				{/* <CanvasInput label="Y" value={val} /> */}
			</div>

			<div className="coord-inputs space-y-6 mb-9">
				{/* <CanvasInput label="W" value={val} /> */}

				{/* <CanvasInput label="H" value={val} /> */}
			</div>

			<div className="coord-inputs space-x-4">
				<button className="rounded p-2 bg-gray-700 bg-green-500">
					<Type size={20} />
				</button>

				<button className="rounded p-2 bg-gray-700">
					<Image size={20} />
				</button>
			</div>

			<div className="absolute flex left-0 right-0 bottom-0">
				<button className="p-3 grid place-items-center bg-slate-700 hover:bg-blue-600 flex-1">
					<Eye />
				</button>
				<button className="p-3 grid place-items-center bg-slate-900 hover:bg-green-600 flex-1">
					<Download />
				</button>
				<button className="p-3 grid place-items-center bg-slate-700 hover:bg-red-600 flex-1">
					<Trash />
				</button>
			</div>
		</section>
	)
}

export default CanvasControl
