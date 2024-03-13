import { useEffect, useState } from "react";

const Popup = ({ message, confirm }) => {
	const [windowWidth,setWindowWidth] = useState('0vw')
	const [backgroundColor,setBackgroundColor] = useState('')
	const [finishedAni,setFinishedAni] = useState(false)
	useEffect(() => {
		setWindowWidth('0vw')
		setWindowWidth('20vw')
		if(message === 'Correct! Goed gedaan!'){
			setBackgroundColor('green')
		}
		else{
			setBackgroundColor('red')
		}
		setTimeout(() => {
			setFinishedAni(true)
		}, 700);
	}, [message])
	
	return (
		<div className={`dialog_box ${finishedAni ? 'finishedAnimation' : ''}`} style={{width: windowWidth, backgroundColor: backgroundColor}}>
			<h2 className={`dialog_message ${finishedAni ? 'finishedText' : ''}`} >{message}</h2>
			<button onClick={confirm} className="dialog_confirmation" style={{ backgroundColor: backgroundColor}} type="button">
				Opnieuw proberen
			</button>
		</div>
	);
};

export default Popup;
