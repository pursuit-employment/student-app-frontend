import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import { api } from '../../utils/api';

import SearchBar from '../searchBar/SearchBar';
import StudentCard from '../studentCard/StudentCard';
import EmptyView from '../emptyView/EmptyView';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import './StudentList.scss';

const StudentList = (props) => {

    let location = useLocation();
    
    // hooks
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [tagSearch, setTagSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    
    // functions
    useEffect(() => {

        setLoading(true);

        if(location?.state?.studentName){
            setShowSnackbar(true);
         }

        // reach out to the backend
        fetch(api)
        .then(response => response.json())
        .then(data => {

            for(let student of data){
                student.tagArr = [];
            }

            setStudents(data);
            setLoading(false);
        })
    }, []); // empty dependency array means run on mount

    // when search term is updated, this component will re-render 
    let filteredStudents = students;

    if(searchTerm){
        filteredStudents = students.filter(student => {
            const fullName = `${student.firstname} ${student.lastname}`;
            
            const fullNameToLowerCase = fullName.toLowerCase();

            const searchTermToLowerCase = searchTerm.toLowerCase();

            return fullNameToLowerCase.includes(searchTermToLowerCase);
        });
    }

    if(tagSearch){
        filteredStudents =  filteredStudents.filter(student => {
            for(let tag of student.tagArr){
                let partialTag = tag.toLowerCase().slice(0, tagSearch.length)

                if(partialTag === tagSearch.toLowerCase()){
                    return true;
                }
            }
        })
    }


    // return or JSX
    return (
        <div className="studentList">
            <Snackbar 
                open={showSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={1500}
                onClose={() => setShowSnackbar(false)}>
                <Alert>{location?.state?.studentName} was successfully deleted.</Alert>
            </Snackbar>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SearchBar searchTerm={tagSearch} setSearchTerm={setTagSearch} placeholder="Search by tag" />

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