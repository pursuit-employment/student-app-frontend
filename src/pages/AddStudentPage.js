import React from 'react';

import StudentForm from '../components/studentForm/StudentForm';

function AddStudentPage(props) {
    return (
        <div>
           <StudentForm title="Add" method="POST" />
        </div>
    );
}

export default AddStudentPage;