import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { api } from '../../utils/api';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import {AiOutlineReload } from 'react-icons/ai';

import {isValidEmail} from '../../utils/EmailValidation';

import './StudentForm.scss';

function StudentForm({student={}, setStudent, title="Update", method="PUT"}) {

    let navigate = useNavigate();

    const [firstname, setFirstname] = useState(student.firstname);
    const [lastname, setLastname] = useState(student.lastname );
    const [email, setEmail] = useState(student.email);
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [company, setCompany] = useState(student.company);
    const [city, setCity] = useState(student.city);
    const [skill, setSkill] = useState(student.skill);
    const [pic, setPic] = useState(student.pic  );
    const [anyChanges, setAnyChanges] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);


    const handleChange = (e) => {
        
        setAnyChanges(true);

        const field = e.target.name;

        switch (field){
            case 'firstname':
                setFirstname(e.target.value);
                break;
            case 'lastname':
                setLastname(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'company':
                setCompany(e.target.value);
                break;
            case 'city':
                setCity(e.target.value);
                break;
            case 'skill':
                setSkill(e.target.value);
                break;
            case 'pic':
                setPic(e.target.value);
                break;
        }

    }

    const handleSubmit = () => {
        

        if(!isValidEmail(email)){
            setEmailError(true);
            setEmailHelperText("Invalid Email.")
            return;
        } else {
            setEmailError(false);
            setEmailHelperText("")
        }

        // loading state
        setLoading(true);

        // set our target url 
        let url = api;

        if(method === 'PUT'){
            url += `/${student.id}`
        }

        // what data are we passing to our backend?
        // what http method are we using?
        const requestOptions = {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname, lastname, email, company, city, skill, pic })
        };

        // fetch
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {

                if(method==='POST') { // we are adding a new student
                    
                    // redirect to new studetn detail page
                    navigate(`/students/${data.id}`, { 
                        state: {
                            fromCreateStudent: true, 
                            studentName: `${data.firstname} ${data.lastname}`
                        }
                    });
                } else  { // updating student 
                    setStudent(data);
                    setAnyChanges(false);
                    setSuccessfulUpdate(true);
                    setShowSnackbar(true);    
                    setLoading(false);
                }

            }).catch(err => {
                setLoading(false);
                // let user know an error has occurred 
                setSuccessfulUpdate(false);
                setShowSnackbar(true);
            });
        

    }


    const action = method === 'PUT' ? 'updating student' : 'adding student';
    const errorElement =  <Alert severity="error">An error occurred while {action} — please try again later.</Alert>
    const successElement =  <Alert>Student was updated successfully!</Alert>


    return (
        <div className="studentForm">
             
             <Snackbar 
                open={showSnackbar} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={1500}
                onClose={() => setShowSnackbar(false)}>
                    {successfulUpdate ?  successElement : errorElement}
            </Snackbar>

            <div className="studentForm__title">{title} Student</div>
            <div className="studentForm__inputs">
                <TextField 
                    id="outlined-basic" 
                    label="First Name" 
                    variant="outlined" 
                    value={firstname}
                    name='firstname'
                    onChange={(e) => handleChange(e)}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Last Name" 
                    variant="outlined" 
                    value={lastname}
                    name='lastname'
                    onChange={(e) => handleChange(e)} 
                />
                 <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    variant="outlined" 
                    value={email}
                    name='email'
                    error={emailError}
                    helperText={emailHelperText}
                    onChange={(e) => handleChange(e)} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Company" 
                    variant="outlined" 
                    value={company} 
                    name="company"
                    onChange={(e) => handleChange(e)} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="City" 
                    variant="outlined" 
                    value={city}
                    name="city"
                    onChange={(e) => handleChange(e)} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Skill" 
                    variant="outlined" 
                    value={skill}
                    name="skill"
                    onChange={(e) => handleChange(e)} 
                />
                <TextField 
                    id="outlined-basic" 
                    label="Pic Url" 
                    variant="outlined" 
                    value={pic} 
                    name="pic"
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="studentForm__submit">
                <Button 
                    variant="contained" 
                    size="large" 
                    disabled={!anyChanges}
                    onClick={handleSubmit}
                    endIcon={loading && <AiOutlineReload className="studentForm__submitLoader-spinning"/>}
                >
                    {title}
                </Button>
            </div>
        </div>
    );
}

export default StudentForm;