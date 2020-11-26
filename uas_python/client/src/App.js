import logo from './logo.svg';
import React,{useEffect,useState} from 'react'
import './App.css';

import { Box, Button, ButtonGroup ,Container,Text,Grid} from "@chakra-ui/react"
import BoxComponent from './components/box.component';
import StudentCard from './components/studentCard.component';
import { backendUrl } from './api';

function App() {
  
    
    const [Student, setStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentId,setCurrentId] = useState(0)
    useEffect(function () {
      async function fetchData() {
        setIsLoading(true);
  
        try {
          const response = await fetch(backendUrl + '/student/');
  
          const resData = await response.json();
  
          if (!response.ok) {
            throw new Error(resData.message || 'Fetching the goals failed.');
          }
  
          setStudent(resData);
        } catch (err) {
          setError(
            err.message ||
              'Fetching data failed - the server responsed with an error.'
          );
        }
        setIsLoading(false);
      }
  
      fetchData();
    }, []);


    async function addStudent(data) {
      setIsLoading(true);
  
      try {
        const response = await fetch(backendUrl + '/student/', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const resData = await response.json();
  
        if (!response.ok) {
          throw new Error(resData.message || 'Adding the data failed.');
        }
  
        setStudent((prevData) => {
          const updateStudent = [
            ...prevData,
            resData
          ];
          return updateStudent;
        });
      } catch (err) {
        setError(
          err.message ||
            'Adding a goal failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    async function deleteAction(id) {
      setIsLoading(true);
      console.log(id)
  
      try {
        const response = await fetch(backendUrl + '/student/' + id + '/', {
          method: 'DELETE',
        });
  
        const resData = await response.json();
  
      
        if (!response.ok) {
          throw new Error(resData.message || 'Deleting  failed.');
        }
  
      } catch (err) {
        setError(
          err.message ||
            'Deleting  failed - the server responsed with an error.'
        );
      }
      setStudent((prevData) => {
        const updateStudent = prevData.filter((data) => data.id !== id);
        return updateStudent;
      });

      setIsLoading(false);
    }
    console.log(currentId)
  return (
    <div className="bg">
      <div style={{textAlign: 'center'}}>
        <Text fontSize="4xl" color="#fff">DATA SISWA</Text>
      </div>
      <div className="container">
        <div className="sideleft">
          <BoxComponent Student={Student} setStudent={setStudent} currentId={currentId} setCurrentId={setCurrentId} onAddGoal={addStudent} />
        </div>
        <div className="sideRight">
        {
          isLoading ? 'loading ..' : 
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {Student.map(data => (

                <StudentCard  setCurrentId={setCurrentId} data={data} deleteAction={deleteAction}/>
              
            ))}
          </Grid>

        }
        </div>
      </div>
    
    </div>
  
  );
}

export default App;
