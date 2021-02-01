import React,{useRef,useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from './../contexts/AuthContexts'
function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login,currentUser}  = useAuth()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const history = useHistory()
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
       
        
        try {
            await login(emailRef.current.value,passwordRef.current.value)
            history.push('/')
        } catch (error) {
            setError('Failed to Sign In')
        }
        setLoading(false)

        
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="mb-4 text-center">Log In</h2>
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
                 
                    <Button className="w-100" type="submit" disabled={loading}>LOGIN </Button>
                </Form>
                <div className="mt-3 text-center w-100">
                    <Link to="/forgot-password">Forgot Password</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="mt-2 text-center w-100">
            Need an account ? <Link to="/signup">Signup Now</Link>
        </div>
        </>
        )
}

export default Login
