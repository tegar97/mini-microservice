import React,{useRef,useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import {useAuth} from './../contexts/AuthContexts'
import { Link, useHistory } from 'react-router-dom'

function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup,currentUser}  = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }
        
        try {
            await signup(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        } catch (error) {
            setError('Failed to create an account')
        }
        setLoading(false)

        
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="mb-4 text-center">Sign Up</h2>
                {
                    error && <Alert variant="danger">{error}</Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required/>
                    </Form.Group>
                    <Button className="w-100" type="submit" disabled={loading}>SIGN UP</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="mt-2 text-center w-100">
            Already have an account  <Link to="/login">Login</Link>

        </div>
        </>
        )
}

export default SignUp
