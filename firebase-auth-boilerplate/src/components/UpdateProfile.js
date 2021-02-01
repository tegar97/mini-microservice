import React,{useRef,useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from './../contexts/AuthContexts'

function UpdateProfile() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {updateEmail,updatePassword,currentUser}  = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const history = useHistory()


     function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }
        const promises = []
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value ) {
            promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() =>{
            history.push('/')
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    

        
    }
    return (
        <Card>
        <Card.Body>
            <h2 className="mb-4 text-center">Log In</h2>
            {
                error && <Alert variant="danger">{error}</Alert>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required value={currentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder="leave blank to keep same" />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password Confirm</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} placeholder="leave blank to keep same"  />
                </Form.Group>
             
                <Button className="w-100" type="submit" disabled={loading}>LOGIN </Button>
            </Form>
          
        </Card.Body>
        <Link to="/">Back</Link>
    </Card>
    )
}

export default UpdateProfile
