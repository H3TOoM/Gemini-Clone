import { createContext, useState } from "react";
import { callGemini } from '../config/gemini';

export const Context = createContext();

// دالة لتحويل Markdown بسيط إلى HTML
function formatMarkdownToHTML(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')                    // **bold**
        .replace(/_(.+?)_/g, '<i>$1</i>')                          // _italic_
        .replace(/~~(.+?)~~/g, '<s>$1</s>')                        // ~~strikethrough~~
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');  // [text](url)
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
        }, 50 * index); // أسرع شوية (اختياري)
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

            const formattedHTML = formatMarkdownToHTML(response);
            setResultData('');

            const words = formattedHTML.split(' ');
            for (let i = 0; i < words.length; i++) {
                delayPara(i, words[i] + ' ');
            }

        } catch (error) {
            console.error('Error calling Gemini:', error);
            setResultData('<b style="color:red">حدث خطأ في الاتصال بـ Gemini</b>');
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
