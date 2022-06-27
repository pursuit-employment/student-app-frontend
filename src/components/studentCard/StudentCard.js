import React from 'react';

import './StudentCard.scss';

const StudentCard = ({student}) => {

    const {pic, firstName, lastName, email, company, skill, grades} = student;


    // functions 
    const calculateAverage = (grades) => {

        // let sum = 0;

        // grades.map(grade => {
        //     sum += Number(grade);
        // });

        // return sum / grades.length;

        const sum = grades.reduce((sum, val) => sum + Number(val), 0);
        return sum / grades.length;

    }



    return (
        <div className="studentCard">
            <div>
                <img src={pic} />
            </div>
            <div className="studentCard__name">
                {`${firstName}  ${lastName}`}
            </div>
            <div>
                Email: {email}
            </div>
            <div>
                Company: {company}
            </div>
            <div>
                Skill: {skill}
            </div>
            <div>
                Average: {calculateAverage(grades)}%
            </div>
            
        </div>
    )
}

export default StudentCard;