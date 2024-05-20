import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import axios from "axios";

const App = () => {


	const [languages, setLanguages] = useState([]);
	const [sourceLang, setSourceLang] = useState("en");
	const [targetLang, setTargetLang] = useState("en");
	const [inputText, setInputText] = useState("");
	const [translation, setTranslation] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/languages");
				console.log(response.data.data.languages);
				setLanguages(response.data.data.languages);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);

 

	const translateText = async () => {
		try {
			const response = await axios.post("http://localhost:3000/api/translate", {
				source: sourceLang,
				target: targetLang,
				text: inputText,
			});
			console.log(response.data.data.translatedText);
			setTranslation(response.data.data.translatedText);
		} catch (error) {
			console.error(error);
		}
	};

  const speakFunctionSource = async () => {
	var msg = new SpeechSynthesisUtterance();
	msg.text = inputText;
	window.speechSynthesis.speak(msg);
  }

  const speakFunctionTarget = async () => {
	var msg = new SpeechSynthesisUtterance();
	msg.text = translation;
	window.speechSynthesis.speak(msg);
  }	

	const handleChange = (event) => {
		setInputText(event.target.value);
		console.log(event.target.value);
	};
	return (
		<div>
			<Navbar />
      <div className="div-main">
			<div className="container">
				<div className="translator">
					<div className="language-select">
						<div className="select-group">
							<label for="source-lang">From:</label>
							<select
								id="source-lang"
								aria-label="Source language"
								value={sourceLang}
								onChange={(e) => setTargetLang(e.target.value)}>
								{languages.map((language) => (
									<option value={language.code} key={language.code}>
										{language.name}
									</option>
								))}
							</select>
              
						</div>
						<div className="select-group">
							<label for="target-lang">To:</label>
							<select
								id="target-lang"
								aria-label="Target language"
								value={targetLang}
								onChange={(e) => setTargetLang(e.target.value)}>
								{languages.map((language) => (
									<option value={language.code} key={language.code}>
										{language.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<textarea
						id="input-text"
						placeholder="Enter text or speak..."
						aria-label="Input text"
						value={inputText}
						onChange={handleChange}></textarea>
					<div className="controls">
						<button
							id="translate-text-btn"
							className="btn"
							aria-label="Translate text"
							onClick={translateText}>
							Translate Text
						</button>
						<button
							id="start-record-btn"
							className="btn"
							aria-label="Start recording"
              
              >
							Start Recording
						</button>
						<button
							id="stop-record-btn"
							className="btn"
							aria-label="Stop recording"
              // onClick={stopRecording}
              >
							Stop Recording
						</button>
            <button
							id="stop-record-btn"
							className="btn"
							aria-label="Stop recording"
              onClick={speakFunctionSource}
              >
							Speak Input
						</button>
            
					</div>
					<div className="output">
						<textarea
							id="translation"
							readonly
							placeholder="Translated text will appear here..."
							aria-label="Translated text"
							value={translation}></textarea>
					</div>
          <button
							id="stop-record-btn"
							className="btn"
							aria-label="Stop recording"
              onClick={speakFunctionTarget}
              >
							Speak Output
						</button>
				</div>
        
        </div>
			</div>
		</div>
	);
};

export default App;
