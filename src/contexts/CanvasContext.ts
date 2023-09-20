import React from 'react'
import {
	ICanvasChild,
	ICanvasContext,
	ICanvasState,
	IDocument,
	TCanvasContextActionType,
} from '../types/Reusables'

export function canvasReducer(
	state: ICanvasState,
	action: {type: TCanvasContextActionType; payload: any}
) {
	switch (action.type) {
		case 'CHANGE_CANVAS_CHILD_COORDS':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								canvasChildren:
									documentObj.canvasChildren.map(
										(canvasChild) =>
											canvasChild.id !==
											action.payload.id
												? canvasChild
												: {
														...canvasChild,
														x: action
															.payload
															.x,
														y: action
															.payload
															.y,
												  }
									),
						  }
				),
			}
			break
		case 'EDIT_CANVAS_CHILD_VALUE':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								canvasChildren:
									documentObj.canvasChildren.map(
										(canvasChild) =>
											canvasChild.id !==
											action.payload.id
												? canvasChild
												: {
														...canvasChild,
														value: action
															.payload
															.value,
												  }
									),
						  }
				),
			}
			break
		case 'CREATE_CANVAS_CHILD':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								canvasChildren: [
									...documentObj.canvasChildren,
									{...action.payload},
								],
						  }
				),
			}
			break
		case 'DELETE_CANVAS_CHILD':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								canvasChildren:
									documentObj.canvasChildren.filter(
										(canvasChild: ICanvasChild) =>
											canvasChild.id !==
											action.payload
									),
						  }
				),
			}
			break
		case 'SET_SELECTED_COMPONENT_ID':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								selectedCanvasChild: action.payload,
						  }
				),
			}
			break
		case 'CHANGE_SELECTED_TOOL':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								selectedTool: action.payload,
						  }
				),
			}
			break
		case 'SET_CANVAS':
			return action.payload
			break
		case 'SET_DOCUMENT':
		    return {
		        ...state,
		        documents: [ ...state.documents, action.payload ]
		    }
			break
		case 'SET_ACTIVE_DOCUMENT_ID':
		    return {
		        ...state,
		        activeDocumentId: action.payload
		    }
			break
		case 'SET_PREVIEW_MODE':
			return {
				...state,
				documents: state.documents.map((documentObj: IDocument) =>
					documentObj.documentId !== state.activeDocumentId
						? {...documentObj}
						: {
								...documentObj,
								previewMode: action.payload,
						  }
				),
			}
			break
		default:
			return state
			break
	}
}

export const initialCanvasState: ICanvasState = {
	activeDocumentId: 'BLANK_CANVAS',
	documents: [
		{
			documentId: 'BLANK_CANVAS',
			selectedTool: 'zoom',
			selectedCanvasChild: null,
			previewMode: false,
			canvasChildren: [],
		},
	],
}

export const CanvasContext = React.createContext<ICanvasContext>({
	state: initialCanvasState,
	dispatch: () => {},
})
