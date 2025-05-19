import { createContext, useState } from "react";
import { callGemini } from '../config/gemini';

export const Context = createContext();

function parseBold(text) {
    return text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
}

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
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData('');
    };

    async function onSent(userInput) {
        setLoading(true);
        setShowResult(true);

        const finalInput = userInput !== undefined ? userInput : input;
        setRecentPrompt(finalInput);
        setPrevPrompts(prev => [...prev, finalInput]);

        try {
            const response = await callGemini(finalInput);

            // Parse **bold**
            const htmlResponse = parseBold(response);

            setResultData('');


            const words = htmlResponse.split(' ');
            for (let i = 0; i < words.length; i++) {
                delayPara(i, words[i] + ' ');
            }

        } catch (error) {
            console.error('Error calling Gemini:', error);
            setResultData('Error');
        } finally {
            setLoading(false);
            setInput('');
        }
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
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
