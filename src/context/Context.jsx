import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");
	const [prompt, setPrompt] = useState("");
	console.log();

	// const delayPara = (index, nextWord) => {
	// 	setTimeout(function () {
	// 		setResultData((prev) => prev + nextWord);
	// 	}, 10 * index);
	// };
	const newChat = () => {
		setLoading(false);
		setShowResults(false)
	}

	const onSent = async (argu,outline) => {
		setResultData("");
		setLoading(true);
		setShowResults(true);
		console.log(argu,outline);
		let response;
		if (argu !== "" && argu !== undefined) {
			response = await runChat(`This is the Topic ${prompt} this is the outline you are going to generate ${outline} Make a HTML Page using this specific Heading ${argu} you can use the below stylings you are 
			.heading1 {
				font-size: 3.5em;
				margin-top: 0;
				line-height: 1.3em;
			  }
			  
			  .heading2 {
				font-size: 1.6em;
				margin-bottom: 0;
				line-height: 1.4em;
			  }
			  
			  
			  .para {
				margin: 0 0 1em 0;
				line-height: 1.8em;
			  }
			  
			  .container {
				max-width: 800px;
				margin: 0 auto;
				padding: 2em;
			  }
			 
			  generate a html page use the above classnames dont inlcude any css in the html file using only classname
			  start the HTML code from section
			  always wrap with the \`\`\`html ...  \`\`\`
			  make sure that your data should not be in the given outline
			  if it needs any Extra Styling you can use the inline css
			  double check the response before submitting if it follows the above format and instructions
		
			  `);
			setRecentPrompt(argu);
			return response;
		}
		else if (input !== "" && input !== undefined) {
			response = await runChat(input);
			setRecentPrompt(input);
		}
		else if (prompt !== undefined) {

			response = await runChat(`Create a Outline for the Given Topic  for posting a blog
			create atmost 1 to 2 headings
			Topic : '''${prompt}'''
			return that in the form of json 
			the json will contain 
			\`\`\`json
			{
			  heading_1 : "Heading_1 you have to give here",
			 subheadings_1 : [
			 subheading_1 you have to give , Subheading_2 you have to give , ....
			 ]
			 heading_2 : "Heading_2 you have to give ",
			 subheading_2 : [
			 "subheading_1 you have to give", ....
			 ]
			 }
			 \`\`\`
			
			
			 
			don't use any html tags 
			

			Double check the json file before submitting 
			use the above format only
		
			`);
			setRecentPrompt(prompt)
		} else {
			setPrevPrompts(prev => [...prev, input]);
			setRecentPrompt(input);
			console.log(input, "input");
			response = await runChat(input);
			console.log(response);
		}

		try {
			setResultData(response);

			// let responseArray = response.split("**");
			// let newResponse = "";
			// for (let i = 0; i < responseArray.length; i++) {
			// 	if (i === 0 || i % 2 !== 1) {
			// 		newResponse += responseArray[i];
			// 	} else {
			// 		newResponse += "<b>" + responseArray[i] + "</b>";
			// 	}
			// }
			// let newResponse2 = newResponse.split("*").join("<br/>");
			// let newResponseArray = newResponse2.split("");
			// for (let i = 0; i < newResponseArray.length; i++) {
			// 	const nextWord = newResponseArray[i];
			// 	delayPara(i, nextWord + "");
			// }
		} catch (error) {
			console.error("Error while running chat:", error);
			// Handle error appropriately
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
		prompt,
		setPrompt
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
