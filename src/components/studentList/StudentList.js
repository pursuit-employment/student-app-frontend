import React, {useEffect, useState} from 'react';

import StudentCard from '../studentCard/StudentCard';

import './StudentList.scss';

const StudentList = () => {

    // hooks
    const [students, setStudents] = useState([]);

    // functions

    useEffect(() => {

        const url = 'https://student-app-backend-june.herokuapp.com/students';
        // reach out to the backend
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setStudents(data.students);
        })
        // get our students
        // update our students hook with the new data

    }, []); // empty array means run on mount


    // return or JSX
    return (
        <div className="studentList">
           {students.map(student => {
            return (
                <StudentCard student={student} />
            )
           })}
        </div>
    )


}

export default StudentList;