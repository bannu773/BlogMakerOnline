import React, { useContext, useEffect, useState } from 'react';
import '../main/main.css';
import { useSelector } from 'react-redux';
import { Context } from "../../context/Context";
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import HtmlToReact from 'html-to-react';

const BlogMaker = () => {
    const {
        onSent,
        showResults,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context);

    const outline = useSelector(state => state.outline.outline);
    const [allResponses, setAllResponses] = useState([]);
    const [loadedHeadings, setLoadedHeadings] = useState({}); // New state variable
    const htmlToReactParser = new HtmlToReact.Parser();
    console.log(loadedHeadings);


    const renderJsonData = (data) => {
        const regex = /```html\s*(.*?)```/gs;
        const matches = data.match(regex);
        const cleanData = matches && matches.length > 0 ? matches[0].replace(/```html\s*|```/gs, '') : '';
        return cleanData;
    }

    useEffect(() => {
        const headingsCount = Object.keys(outline).filter(key => key.startsWith("heading")).length;
        sendHeading(outline, 1, headingsCount);
    }, []);

    const sendHeading = (outline, n, totalHeadings) => {
        const heading = outline[`heading_${n}`];

        if (heading) {
            onSent(heading, outline)
                .then((response) => {
                    setAllResponses(prevAllResponses => [...prevAllResponses, response]);
                    setLoadedHeadings(prev => ({ ...prev, [`heading_${n}`]: true })); // Mark the heading as loaded
                    const subheadings = outline[`subheadings_${n}`];
                    if (subheadings && subheadings.length > 0) {
                        sendSubheadings(outline, n, subheadings, 0, totalHeadings);
                    } else if (n + 1 <= totalHeadings) {
                        sendHeading(outline, n + 1, totalHeadings);
                    }
                });
        }
    };

    const sendSubheadings = (outline, n, subheadings, index, totalHeadings) => {
        const subheading = subheadings[index];
        onSent(subheading, outline)
            .then((response) => {
                setAllResponses(prevAllResponses => [...prevAllResponses, response]);
                setLoadedHeadings(prev => ({ ...prev, [`subheading_${n}`]: true })); // Mark the subheading as loaded 
                if (index + 1 < subheadings.length) {
                    sendSubheadings(outline, n, subheadings, index + 1, totalHeadings);
                } else if (n + 1 <= totalHeadings) {
                    sendHeading(outline, n + 1, totalHeadings);
                }
            });
    };

    return (
        <>
            <div style={{ position: "fixed", float: "right", zIndex: "10", top: 190,width : "450px" }} className='outline_card'>
                {/* Render the outline */}
                {Object.keys(outline).map((key, index) => {
                    if (key.startsWith('heading')) {
                        return (
                            <div key={index} className={loadedHeadings[key] ? 'loaded' : ''}>
                                {outline[key]}
                            </div>
                        );
                    } else if (key.startsWith('subheadings')) {
                        return outline[key].map((subheading, subIndex) => (
                            <div key={`${index}_${subIndex}`} className={loadedHeadings[key] ? 'loaded' : ''}>
                                {subheading}
                            </div>
                        ));
                    }
                })}
            </div>
            <div className='main container' style={{ paddingTop: "70px" }}>

                <div className="main-container">
                    <div className="greet">
                        <p>
                            <span>Hello, Dev</span>
                        </p>
                    </div>

                    <div className='outline_card'>
                        {
                            allResponses.map((response, index) => {
                                const reactElement = htmlToReactParser.parse(renderJsonData(response));
                                return (
                                    <Typist cursor={{ show: false }} key={index} avgTypingDelay={2}>
                                        <p>{reactElement}</p>
                                    </Typist>
                                );
                            })
                        }
                    </div>

                </div>
            </div></>
    );
}

export default BlogMaker;