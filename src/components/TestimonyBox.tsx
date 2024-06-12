import {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons";

interface TestimonyBox {
    content: string;
    author: string;
    year: string;
}

const TestimonyBox: FC<TestimonyBox> = ({content, author, year}) => {
    return (
        <div className="testimony-box">
            <div className="fa-icon-wrapper">
                <FontAwesomeIcon icon={faQuoteLeft}></FontAwesomeIcon>
            </div>
            <p className="testimony-paragraph">{content}
            </p>
            <span className="testimony-author">{author}, {year}</span>
        </div>
    );
};

export default TestimonyBox;