import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";

import TagInputField from '../tagInputField/TagInputField';
import EmptyView from '../emptyView/EmptyView';
import DialogBox from '../dialogBox/DialogBox';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import {AiOutlineReload } from 'react-icons/ai';

import './StudentCard.scss';

const StudentCard = ({student, showDelete=false}) => {

    let navigate = useNavigate();

    // props deconstructed
    const {id, pic, firstname, lastname, email, company, skill, tagArr} = student;

    // hooks
    const [grades, setGrades] = useState([]);
    const [showGrades, setShowGrades] = useState(false);
    const [gradesLoading, setGradesLoading] = useState(false);
    const [tags, setTags] = useState(tagArr);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteUserLoading, setDeleteUserLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);

    // functions 
    const calculateAverage = (grades) => {

        let sum = 0;

        grades.map(grade => {
            sum += Number(grade.grade);
        });

        return sum / grades.length;
    }

    const hideGrades = (e) => {
        e.stopPropagation();
        e.preventDefault();

        setShowGrades(false);
    }

    const fetchAndShowGrades = (e) => {
        e.stopPropagation();
        e.preventDefault();
        

        // do we already have the grades? 
        if(grades.length > 0){
            setShowGrades(true);
        } else {

            setGradesLoading(true);

            const url = `https://student-app-backend-june.herokuapp.com/students/${id}/grades`;

            fetch(url)
            .then(response => response.json())
            .then(data => {

                setGrades(data);
                setShowGrades(true);
                setGradesLoading(false);
            })
        }

    }

    const showDeleteUserDialogue = (e) => {
        setShowDeleteDialog(true);
    }

    const deleteUser = () => {

        setDeleteUserLoading(true);
        // url to delete 
        const url = `https://student-app-backend-june.herokuapp.com/students/${id}`;

        fetch(url, { method: 'DELETE' })
            .then(response =>  response.json())
            .then(data => {
                // redirect to home page
                navigate("/", { 
                    state: {
                        studentName: `${data.firstname} ${data.lastname}`
                    }
                });

                setDeleteUserLoading(false)
            }).catch(err => {
                // show toast that delete was unsuccessful
                setDeleteUserLoading(false)
                setShowSnackbar(true);
            })

    }

    // useEffect(() => {
    //     if(grades.length)
    //         setShowGrades(!showGrades);
    // }, [grades])

    return (
        <div className="studentCard">
            <Snackbar 
                open={showSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={1500}
                onClose={() => setShowSnackbar(false)}>
                <Alert severity="error">An error occurred while deleting — try again later.</Alert>
            </Snackbar>

            <Link to={`/students/${id}`} state={{ student: student }}>
            
                <div className="studentCard__profilePic">
                    <img src={pic} />
                </div>
            
                <div className="studentCard__info">
                    <div className="studentCard__name">
                        {`${firstname}  ${lastname}`}
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

                    <div className="studentCard__gradesList" style={{"display": showGrades ? "block" : "none"}}>
                        {grades.length > 0 &&
                        <>
                            <div className="studentCard__gradeAverage">
                                Average: {grades.length && calculateAverage(grades)}%
                            </div>
                            {grades.map((grade, index) => {
                                return (
                                    <div key={index}><span>Test {index+1}:</span><span>{grade.grade}%</span></div>
                                )
                            })}
                        </>
                        }
                        {grades.length === 0  && <EmptyView text="No Grades for this Student"/>}
                    </div>
                </div>
                <div className="studentCard__actionIcons">
                    {gradesLoading && <AiOutlineReload className="studentCard__toggleIcon-spinning" size="1.8em" />}
                    {(!showGrades && !gradesLoading) && <FaPlus className="studentCard__toggleIcon" onClick={(e) => fetchAndShowGrades(e)} size="1.8em"/>}
                    {(showGrades && !gradesLoading) && <FaMinus className="studentCard__toggleIcon" onClick={(e) => hideGrades(e)} size="1.8em" />}
                </div>
    
            </Link> 
            <div className="studentCard__tagCollectionRow">
                <div className="studentCard__tagCollection">
                    <div className="studentCard__tags">
                        {tagArr.map((tag, index) => {
                            return (
                                <span className="studentCard__tag" key={tag + index}>{tag}</span>
                            )
                        })}
                    </div>
                    <div className="studentCard__tagInput">
                        <TagInputField setTags={setTags} tags={tags} id={student.id} />
                    </div>
                </div>
                {showDelete && <div>
                    {deleteUserLoading && <AiOutlineReload className="studentCard__toggleIcon-spinning" size="1.8em" />}
                    {!deleteUserLoading && <FaTrash className="studentCard__trashIcon" onClick={(e) => showDeleteUserDialogue(e)} size="1.8em"/>}
                </div> }
            </div>
            <DialogBox open={showDeleteDialog} setOpen={setShowDeleteDialog} deleteUser={deleteUser} />
        </div>
    )
}

export default StudentCard;