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
    const htmlToReactParser = new HtmlToReact.Parser();

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
                if (index + 1 < subheadings.length) {
                    sendSubheadings(outline, n, subheadings, index + 1, totalHeadings);
                } else if (n + 1 <= totalHeadings) {
                    sendHeading(outline, n + 1, totalHeadings);
                }
            });
    };

    return (
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
                                <Typist key={index} avgTypingDelay={10}>
                                    <p>{reactElement}</p>
                                </Typist>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogMaker;