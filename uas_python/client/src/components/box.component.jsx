import React,{useEffect, useState} from 'react'
import { Box, Button, ButtonGroup,FormHelperText,FormLabel,Input,Text,FormControl} from "@chakra-ui/react"
import { backendUrl } from '../api'
import axios from 'axios'

function BoxComponent({Student,onAddGoal,currentId,setStudent}) {

    const [data, setData] = useState({id : '',firstName : '',lastName : '',Adress :'',Phone: ''});
    const [loading,setLoading] = useState(false)
    // const student = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));

    useEffect(() => {
        if(currentId !== 0) {
            async function fetchData() {
                setLoading(true);
                try {
                  const response = await fetch(backendUrl + '/student/' + currentId +  '/' );
          
                  const resData = await response.json();
          
                  if (!response.ok) {
                    throw new Error(resData.message || 'Fetching failed.');
                  }
          
                    console.log(resData)
                    setData(resData)
                } catch (err) {
                 console.log(err)
                }
                setLoading(false);
              }
          
              fetchData();
        }
      }, [currentId]);

    function onChangeHandler(e) {
        setData({...data,[e.target.name] : e.target.value});

    }
  
    function SubmitHandler(event) {
      event.preventDefault();
  
      if(currentId === 0) {
          onAddGoal(data);

      }else{
          const updateData = async() => {
              const response = await axios.patch(backendUrl + '/student/' + currentId +  '/', data);
              console.log(response.data)
               
              setStudent(() => {
                console.log(Student)
                const updateStudent = Student.map((student) => (student.id === response.data.id ? response.data : student));
                console.log(updateStudent)
                return updateStudent;
              });
          

          }
          updateData()
      }
        
      setData({firstName: '',lastName: '',Adress: '',Phone:''});
    }
    const clear = () => {
        console.log('tes    ')
        setData({firstName: '',lastName: '',Adress: '',Phone:''});

    }
    
    return (
        <Box bg="#fff" w="100%" p={5} color="white">
            <Text style={{textAlign: 'center'}} color="black">{currentId !== 0 ? 'Edit Data' : 'Buat Data Siswa'}</Text>
            <form onSubmit={SubmitHandler} style={{marginTop: '2rem'}}>
                <FormControl style={{marginTop: '1rem'}}  color="black" isRequired>
                    <Input name="firstName" placeholder="First name"  onChange={onChangeHandler} value={data.firstName}/>
                </FormControl>
                <FormControl style={{marginTop: '1rem'}}  color="black" isRequired>
                    <Input  name="lastName" placeholder="Last name"  onChange={onChangeHandler} value={data.lastName} />
                </FormControl>
                <FormControl style={{marginTop: '1rem'}}  color="black" isRequired>
                    <Input  name="Adress"  placeholder=" Adress"  onChange={onChangeHandler} value={data.Adress}  />
                </FormControl>
                <FormControl  style={{marginTop: '1rem'}} color="black" isRequired>
                    <Input  name="Phone" placeholder="Phone"  onChange={onChangeHandler} value={data.Phone} />
                </FormControl>
                <div style={{marginTop: '1rem'}}>
                <Button type="submit" w="100%" colorScheme="teal" size="md" >{currentId !== 0 ? 'Edit Data' : 'Submit'}</Button>   
                <Button onClick={clear} style={{marginTop: '1rem'}} w="100%" colorScheme="red" size="md" >Clear</Button>   
                </div>
            </form>
        

        </Box>
        
    )
}

export default BoxComponent
