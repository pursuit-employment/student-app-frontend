import React, {useEffect, useState} from 'react';

import SingleTextInput from '../singleTextInput/SingleTextInput';
import StudentCard from '../studentCard/StudentCard';
import EmptyView from '../emptyView/EmptyView';

import './StudentList.scss';

const StudentList = () => {

    // hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // functions

    useEffect(() => {

        setLoading(true);

        const url = 'https://student-app-backend-june.herokuapp.com/students';
        // reach out to the backend
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setStudents(data);
            setLoading(false);
        })
        // get our students
        // update our students hook with the new data

    }, []); // empty array means run on mount


    // when search term is updated, this component will rerender 
    // what to do on a re-render? 
    let filteredStudents = students;

    if(searchTerm){
        filteredStudents = students.filter(student => {
            const fullName = `${student.firstName} ${student.lastName}`;
            
            const fullNameToLowerCase = fullName.toLowerCase();

            const searchTermToLowerCase = searchTerm.toLowerCase();

            return fullNameToLowerCase.includes(searchTermToLowerCase);
        });
    }


    // return or JSX
    return (
        <div className="studentList">
          <SingleTextInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
           {filteredStudents.map((student) => {
            return (
                <StudentCard student={student} key={student.id} />
            )
           })}
           
           {loading && <EmptyView center text="Loading..." />}

           {!loading && filteredStudents.length === 0 && <EmptyView center />}
        </div>
    )


}

export default StudentList;