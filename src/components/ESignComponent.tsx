import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';

interface ESignComponentProps {
	onSave: (signature: string) => void;
}

const ESignComponent: React.FC<ESignComponentProps> = ({ onSave }) => {
	const sigCanvasRef = useRef<SignatureCanvas>(null);
	const [uploadedSignature, setUploadedSignature] = useState<string | null>(
		null
	);

	const clearSignature = () => {
		sigCanvasRef.current?.clear();
		setUploadedSignature(null);
	};

	const saveSignature = () => {
		if (uploadedSignature) {
			onSave(uploadedSignature);
			return;
		}

		const canvas = sigCanvasRef.current?.getCanvas();

		if (canvas) {
			// Get the canvas context with willReadFrequently set
			canvas.getContext('2d', { willReadFrequently: true });

			const signatureData = canvas.toDataURL('image/png');
			onSave(signatureData);
		} else {
			console.warn('No signature data available to save.');
		}
	};

	const handleFileDrop = (
		acceptedFiles: File[],
		_fileRejections: FileRejection[],
		_event: DropEvent
	) => {
		const file = acceptedFiles[0];
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result) {
				setUploadedSignature(reader.result as string);
			}
		};
		reader.readAsDataURL(file);
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
			<div
				style={{
					border: '1px solid #ddd',
					width: 400,
					height: 200,
					marginBottom: 20,
				}}>
				{!uploadedSignature ? (
					<SignatureCanvas
						ref={sigCanvasRef}
						penColor='black'
						canvasProps={{
							width: 400,
							height: 200,
							className: 'signatureCanvas',
						}}
					/>
				) : (
					<img
						src={uploadedSignature}
						alt='Uploaded Signature'
						style={{ width: '100%', height: '100%' }}
					/>
				)}
			</div>

			<button onClick={clearSignature} style={{ margin: '10px 0' }}>
				Clear
			</button>

			<Dropzone onDrop={handleFileDrop} accept={{ 'image/*': [] }}>
				{({ getRootProps, getInputProps }) => (
					<div
						{...getRootProps()}
						style={{
							border: '2px dashed #aaa',
							padding: '10px',
							cursor: 'pointer',
							width: '100%',
							textAlign: 'center',
						}}>
						<input {...getInputProps()} />
						<p>Drag & drop an image here, or click to select a file</p>
					</div>
				)}
			</Dropzone>

			<button onClick={saveSignature} style={{ marginTop: 20 }}>
				Save Signature
			</button>
		</div>
	);
};

export default ESignComponent;
