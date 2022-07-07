import React, {useState} from 'react';
import { Link } from "react-router-dom";

import { FaPlus, FaMinus } from 'react-icons/fa';

import './StudentCard.scss';

const StudentCard = ({student}) => {

    // props deconstructed
    const {pic, firstName, lastName, email, company, skill, grades} = student;

    // hooks
    const [showGrades, setShowGrades] = useState(false);

    // functions 
    const calculateAverage = (grades) => {

        let sum = 0;

        grades.map(grade => {
            sum += Number(grade);
        });

        return sum / grades.length;
    }

    const toggleGrades = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setShowGrades(!showGrades);
    }

    return (
        <div className="studentCard">
            <Link to={`/students/${student.id}`} state={{ student: student }}>
            <div className="studentCard__profilePic">
                <img src={pic} />
            </div>
            
            <div className="studentCard__info">
                <div className="studentCard__name">
                    {`${firstName}  ${lastName}`}
                </div>
                <div className="studentCard__infoLine">
                    Email: {email}
                </div>
                <div className="studentCard__infoLine">
                    Company: {company}
                </div>
                <div className="studentCard__infoLine">
                    Skill: {skill}
                </div>
                <div className="studentCard__infoLine">
                    Average: {calculateAverage(grades)}%
                </div>
                <div className="studentCard__gradesList" style={{"display": showGrades ? "block" : "none"}}>
                    {grades.map((grade, index) => {
                        return (
                            <div key={index}><span>Test {index+1}:</span><span>{grade}%</span></div>
                        )
                    })}
                </div>
            </div>
            <div className="studentCard__toggleIcons">

                {!showGrades && <FaPlus className="studentCard__toggleIcon" onClick={(e) => toggleGrades(e)} size="1.8em"/>}
                {showGrades && <FaMinus className="studentCard__toggleIcon" onClick={(e) => toggleGrades(e)} size="1.8em" />}
            </div>
            </Link>
        </div>
    )
}

export default StudentCard;