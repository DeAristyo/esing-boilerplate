import React, { useState } from 'react';
import ESignComponent from './components/ESignComponent';
const App: React.FC = () => {
	const [signatureImage, setSignatureImage] = useState<string | null>(null);

	const handleSave = (signature: string) => {
		setSignatureImage(signature); // Set the saved signature as a base64 PNG
	};

	return (
		<div style={{ textAlign: 'center' }}>
			<h1>E-Signature Component</h1>
			<ESignComponent onSave={handleSave} />

			{signatureImage && (
				<div style={{ marginTop: 20 }}>
					<h2>Saved Signature</h2>
					<img
						src={signatureImage}
						alt='Saved Signature'
						style={{ border: '1px solid #ddd', maxWidth: '400px' }}
					/>
				</div>
			)}
		</div>
	);
};

export default App;
