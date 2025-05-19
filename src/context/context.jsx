import { createContext, useState } from "react";
import { callGemini } from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 100 * index);
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    async function onSent(userInput) {
        setLoading(true);
        setShowResult(true);

        const finalInput = userInput !== undefined ? userInput : input;
        setRecentPrompt(finalInput);
        setPrevPrompts(prev => [...prev, finalInput]);

        const response = await callGemini(finalInput);

        // **bold** parsing
        let responseArray = response.split('**');
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        // single star (*) parsing
        let newResponse2 = newResponse.split("*").join("</b>");

        setResultData("");
        const newResponseArray = newResponse2.split(" ");

        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + " ");
        }

        console.log(newResponse2);
        setLoading(false);
        setInput('');
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        input,
        setInput,
        callGemini,
        showResult,
        resultData,
        loading,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
