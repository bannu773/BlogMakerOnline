import React, { useContext, useEffect, useState } from 'react';
import '../main/main.css';
import { useSelector } from 'react-redux';
import { Context } from "../../context/Context";
const BlogMaker = () => {
    const {
        onSent,
        showResults,
        loading,
        resultData,
        setInput,
        input,
    } = useContext(Context);

    const outline = useSelector(state => state.outline);
    const [responses, setResponses] = useState({
        "heading_1": "Introduction to AI Tools",
        "subheadings_1": [
            "Definition and types of AI tools",
            "Benefits of using AI tools"
        ],
        "heading_2": "Types of AI Tools",
        "subheadings_2": [
            "Natural Language Processing (NLP)",
            "Machine Learning (ML)",
            "Computer Vision",
            "Robotics"
        ],
        "heading_3": "Applications of AI Tools",
        "subheadings_3": [
            "Healthcare",
            "Finance",
            "Manufacturing",
            "Customer service"
        ],
        "heading_4": "Challenges and Future of AI Tools",
        "subheadings_4": [
            "Ethical concerns",
            "Bias in AI",
            "Job displacement",
            "Advancements in AI technology"
        ]
    });

    const [allResponses, setAllResponses] = useState([]);

    console.log(responses);

    useEffect(() => {
        const headingsCount = Object.keys(responses).filter(key => key.startsWith("heading")).length; console.log(headingsCount);
        sendHeading(responses, 1,headingsCount );
    }, []);
    
    console.log(allResponses);
    const sendHeading = (outline, n, totalHeadings) => {
        console.log(totalHeadings);
        const heading = outline[`heading_${n}`];

        if (heading) {
            onSent(heading)
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
        onSent(subheading)
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
        <div className='main' style={{ paddingTop: "70px" }}>
            <div className="main-container">
                <div className="greet">
                    <p>
                        <span>Hello, Dev</span>
                    </p>
                </div>
                <div className='outline_card'>
                    {
                        allResponses.map((response, index) => (
                            <p key={index}>{response}</p>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogMaker;


